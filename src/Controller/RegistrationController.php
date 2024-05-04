<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Mailer\MailerInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{

    private EmailVerifier $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    #[Route('/v1/register', name: 'app_register', methods: ['POST', 'GET'])]
    public function register(Request $request,  UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, ValidatorInterface $validator,  MailerInterface $mailer,): JsonResponse
    {
        $customer = new Customer;

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $datas = json_decode($request->getContent(), true);

        $password = $datas['password'];

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

        $customer->setFirstname($datas['firstname']);
        $customer->setLastName($datas['lastname']);
        $customer->setEmail($datas['email']);
        $customer->setPhone((int)$datas['phone']);
        $customer->setRoles(['ROLE_CUSTOMER']);
        $customer->setIsVerified(0);
        $customer->setUid(uniqid());

        $errors = $validator->validate($customer);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            $response = [
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $errorMessages,
            ];

            $jsonContent = $serializer->serialize($response, 'json');

            return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
        } else {

            $hashedPassword = $userPasswordHasher->hashPassword($customer, $datas['password']);
            $customer->setPassword($hashedPassword);

            $entityManager->persist($customer);
            $entityManager->flush();

            $email = (new TemplatedEmail())
                ->from('Cabane et gite au naturel <contact@cabaneetgiteaunaturel.com>')
                ->to($customer->getEmail())
                ->subject("Création de votre compte utilisateur")
                ->htmlTemplate('/mail/confirmation_register.html.twig')
                ->context([
                    'customer' => $customer,
                ]);

            $mailer->send($email);

            $jsonContent = $serializer->serialize(["Success"], 'json');

            return new JsonResponse($jsonContent, Response::HTTP_OK);
        }
    }


    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request, TranslatorInterface $translator): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        try {
            $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $translator->trans($exception->getReason(), [], 'VerifyEmailBundle'));

            return $this->redirectToRoute('app_home');
        }

        $this->addFlash('success', 'Your email address has been verified.');

        return $this->redirectToRoute('app_home');
    }
}
