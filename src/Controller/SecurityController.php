<?php

namespace App\Controller;

use App\Controller\Admin\BookingsCrudController;

use App\Repository\CustomerRepository;
use App\Repository\ConfigurationRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Attribute\IsGranted;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class SecurityController extends AbstractController
{

   public function __construct(
      private TokenStorageInterface $tokenStorage,
      private JWTTokenManagerInterface $jwtManager,
      private JWTTokenManagerInterface $jwtTokenManager
   ) {
      $this->jwtTokenManager = $jwtTokenManager;
      $this->tokenStorage = $tokenStorage;
      $this->jwtManager = $jwtManager;
   }

   #[Route('/api/v1/log-access-admin', name: 'app_login_access_admin')]
   public function loginAdmin(
      Request $request,
      CustomerRepository $customerRepo,
      AdminUrlGenerator $adminUrlGenerator
   ): Response {
      if ($request->isMethod('POST')) {
         $email = $request->request->get('email');
         $password = $request->request->get('password');

         $customer = $customerRepo->findOneBy(['email' => $email]);

         if (
            !$customer ||
            !$this->isPasswordValid($password, $customer->getPassword()) ||
            $customer->getRoles()[0] !== "ROLE_SUPER_ADMIN"
         ) {
            return $this->render('log-access-admin.html.twig', ['error' => 'Mauvais identifiants']);
         }

         $token = $this->jwtManager->create($customer);
         $url = $adminUrlGenerator->setController(BookingsCrudController::class)
            ->set('rules', base64_encode($customer->getRoles()[0]))
            ->set('token', base64_encode($token))
            ->generateUrl();

         $response = new RedirectResponse($url);
         $expirationTime = new \DateTime('+1 hour');
         $cookie = new Cookie('jaat', $token, $expirationTime, '/', null, true, true);
         $response->headers->setCookie($cookie);

         return $response;
      }

      return $this->render('log-access-admin.html.twig', ['error' => false]);
   }

   private function isPasswordValid(string $plainTextPassword, string $hashedPassword): bool
   {
      return password_verify($plainTextPassword, $hashedPassword);
   }

   #[IsGranted('ROLE_SUPER_ADMIN')]
   #[Route('/api/v1/access_admin', name: 'app_access', methods: ['GET'])]
   public function accessBackOffice(
      Request $request,
      CustomerRepository $customerRepo,
      AdminUrlGenerator $adminUrlGenerator,
      ConfigurationRepository $configRepo
   ): JsonResponse {
      $maintenance = $configRepo->findOneBy(['name' => 'Maintenance']);

      if (!$maintenance->isValue()) {
         $user = $this->getUser();
         $tokenBearer = $request->headers->get('Authorization');

         if (!$tokenBearer && $user !== null) {
            throw new AccessDeniedException("Vous n'avez pas les droits nécesssaires");
         } else {

            $tokenInterface = $this->tokenStorage->getToken();

            try {
               $tokenData = $this->jwtManager->decode($tokenInterface);

               $customer = $customerRepo->findOneBy(["email" => $tokenData["email"]]);
               $role = $customer->getRoles()[0];

               if ($role === "ROLE_SUPER_ADMIN") {

                  $token = $this->jwtManager->create($user);
                  $url = $adminUrlGenerator->setController(BookingsCrudController::class)
                     ->set('rules', base64_encode($role))
                     ->set('token', base64_encode($token))
                     ->generateUrl();

                  $data = [
                     'url' => $url,
                  ];

                  $expirationTime = new \DateTime('+1 hour');
                  $response = new JsonResponse($data, Response::HTTP_OK);
                  $response->headers->setCookie(new Cookie('jaat', $token, $expirationTime, '/', null, true, true));
                  return $response;
               } else {
                  return $this->redirectToRoute('app_home', [], Response::HTTP_UNAUTHORIZED);
               }
            } catch (\Exception $e) {
               throw new AccessDeniedException('Token invalide');
            }
         }
      } else {
         return $this->render('maintenance.html.twig');
      }
   }

   #[Route('/api/v1/logout', name: 'app_logout', methods: ['GET'])]
   public function logout(ConfigurationRepository $configRepo)
   {
      $maintenance = $configRepo->findOneBy(['name' => 'Maintenance']);

      if (!$maintenance->isValue()) {
         $response = $this->redirectToRoute('app_home', [], Response::HTTP_SEE_OTHER);
         $response->headers->setCookie(new Cookie('jaat', '', 1, '/', null, false, true));
         return $response;
      } else {
         return $this->render('maintenance.html.twig');
      }
   }

   #[Route('/api/v1/check_token', name: 'app_token', methods: ['GET'])]
   public function checkToken(Request $request, CustomerRepository $customerRepo, ConfigurationRepository $configRepo): JsonResponse
   {
      $maintenance = $configRepo->findOneBy(['name' => 'Maintenance']);

      if (!$maintenance->isValue()) {
         $tokenBearer = $request->headers->get('Authorization');

         if (!$tokenBearer) {
            throw new AccessDeniedException("Vous n'avez pas les droits nécesssaires");
         } else {

            $tokenInterface = $this->tokenStorage->getToken();

            try {
               $tokenData = $this->jwtManager->decode($tokenInterface);

               $customer = $customerRepo->findOneBy(["email" => $tokenData["email"]]);

               $token = substr($tokenBearer, 7);

               if ($customer !== null) {
                  $data = [
                     'token' => $token,
                     "user" => [
                        'email' => $customer->getEmail(),
                        'password' => $customer->getPassword(),
                        'firstname' => $customer->getFirstname(),
                        'lastname' => $customer->getLastName(),
                        'phone' => $customer->getPhone(),
                        'roles' => $customer->getRoles(),
                        'uid' => $customer->getUid(),
                     ]
                  ];

                  return new JsonResponse($data, Response::HTTP_OK);
               } else {
                  throw new AccessDeniedException("Adresse mail invalide");
               }
            } catch (\Exception $e) {
               throw new AccessDeniedException('Token invalide');
            }
         }
      } else {
         return $this->render('maintenance.html.twig');
      }
   }

   #[Route('/password/reset-request', name: 'app_password_reset_request')]
   public function resetPasswordRequest(Request $request, MailerInterface $mailer, CustomerRepository $custoRepo): JsonResponse
   {
      if ($request->isMethod('POST')) {

         $datas = json_decode($request->getContent(), true);
         $customer = $custoRepo->findOneBy(['email' => $datas['email']]);

         if (!$customer  || $customer !== null) {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);

            // Générer un token unique et l'enregistrer dans la base de données
            $token = md5(uniqid());
            $customer->setResetToken($token);
            $custoRepo->save($customer, true);

            // Envoyer un e-mail avec le lien de réinitialisation
            $email = (new TemplatedEmail())
               ->from('Cabane et gite au naturel <contact@cabaneetgiteaunaturel.com>')
               ->to($customer->getEmail())
               ->subject("Réinitialisation du mot de passe")
               ->htmlTemplate('/mail/reset_password.html.twig')
               ->context([
                  'firstname' => $customer->getFirstname(),
                  'token' => $token
               ]);

            $mailer->send($email);

            $message = "L'email pour la procédure de réinitialisation vous a été envoyé.";
            $jsonContent = $serializer->serialize(["status" => "error", "message" => $message], 'json');
            return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
         }
      }
   }

   #[Route('/password/reset/{token}', name: 'app_password_reset')]
   public function resetPassword(Request $request, string $token, UserPasswordHasherInterface $userPasswordHasher, CustomerRepository $custoRepo): Response
   {
      $customer = $custoRepo->findOneBy(['resetToken' => $token]);

      if (!$customer || $customer === null) {
         return $this->render('base.html.twig', [
            'back' => false
         ]);
         
      } else {
         if ($request->isMethod('POST')) {

            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);

            $datas = json_decode($request->getContent(), true);

            $password = $datas['password'];
            $confirmPassword =  $datas['confirm_password'];

            if ($password === $confirmPassword) {

               if (preg_match_all("/[0-9]/", $password) < 2) {
                  $errorMessage = "Le mot de passe doit contenir au moins deux chiffres.";

                  $jsonContent = $serializer->serialize(["status" => "error", "message" => $errorMessage], 'json');
                  return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
               }

               if (!preg_match("/[!@#$%^&*€()-]/", $password)) {
                  $errorMessage = "Le mot de passe doit contenir au moins un caractère spécial parmi ! @ # $ % ^ & * € ( ) - .";

                  $jsonContent = $serializer->serialize(["status" => "error", "message" => $errorMessage], 'json');
                  return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
               }

               if (!preg_match("/[A-Z]/", $password)) {
                  $errorMessage = "Le mot de passe doit contenir au moins une majuscule.";

                  $jsonContent = $serializer->serialize(["status" => "error", "message" => $errorMessage], 'json');
                  return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
               }

               if (strlen($password) < 8) {
                  $errorMessage = "Le mot de passe doit avoir au moins 8 caractères.";

                  $jsonContent = $serializer->serialize(["status" => "error", "message" => $errorMessage], 'json');
                  return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
               }

               $hashedPassword = $userPasswordHasher->hashPassword($customer, $datas['password']);
               $customer->setPassword($hashedPassword);
               $customer->setResetToken(null);

               $custoRepo->save($customer, true);

               // Redirection vers une page de confirmation
               return $this->render('base.html.twig', [
                  'back' => 'reset_pass'
               ]);
            } else {
               $errorMessage = "Le deuxième mot de passe doit être identique au premier.";

               $jsonContent = $serializer->serialize(["status" => "error", "message" => $errorMessage], 'json');
               return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
            }
         } else {
            // Redirection vers la page de renseignement du nouveau mot de passe
            return $this->render('base.html.twig', [
               'back' => 'init_pass'
            ]);
         }
      }
   }
}
