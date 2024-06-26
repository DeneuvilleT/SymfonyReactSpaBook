<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use App\Repository\ConfigurationRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/v1/customers')]
class CustomersController extends AbstractController
{
    #[Route('/edit_customer/{uid}', name: 'app_customers_edit', methods: ['POST'])]
    public function editCustomer(string $uid, Request $request, UserPasswordHasherInterface $userPasswordHasher, CustomerRepository $customerRepo, ValidatorInterface $validator, ConfigurationRepository $configRepo): Response
    {
        $maintenance = $configRepo->findOneBy(['name' => 'Maintenance']);

        if (!$maintenance->isValue()) {
            $user = $this->getUser();
            $customer = $customerRepo->findOneByUid($uid);

            if ($user !== null && $customer === $user) {

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
                $customer->setPassword($datas['password']);
                $customer->setEmail($datas['email']);
                $customer->setPhone((int)$datas['phone']);

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

                    $customerRepo->save($customer, true);

                    $jsonContent = $serializer->serialize(["Success"], 'json');

                    return new JsonResponse(Response::HTTP_OK);
                }
            } else {
                throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
            }
        } else {
            return $this->render('maintenance.html.twig');
        }
    }
}
