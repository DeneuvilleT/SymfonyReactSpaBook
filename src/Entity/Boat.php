<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\BoatRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BoatRepository::class)]
class Boat extends Location
{
    // #[ORM\Id]
    // #[ORM\GeneratedValue]
    // #[ORM\Column]
    // private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?float $roofHeight = null;

    #[Assert\AtLeastOneOf([
        new Assert\Expression(
            "value==0 && !this.isIsMoving()",
            message: 'Merci de laisser vide le champ moteur si le bateau ne peut se déplacer.',
        ),
        new Assert\Expression(
            "value>0 && this.isIsMoving()",
            message: 'Un bateau doit avoir un moteur pour se déplacer.'
        )
    ])]
    #[ORM\Column(nullable: true)]
    private ?bool $motor = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isMoving = null;

    // public function getId(): ?int
    // {
    //     return $this->id;
    // }

    public function getRoofHeight(): ?float
    {
        return $this->roofHeight;
    }

    public function setRoofHeight(float $roofHeight): self
    {
        $this->roofHeight = $roofHeight;

        return $this;
    }

    public function isMotor(): ?bool
    {
        return $this->motor;
    }

    public function setMotor(bool $motor): self
    {
        $this->motor = $motor;

        return $this;
    }

    public function isIsMoving(): ?bool
    {
        return $this->isMoving;
    }

    public function setIsMoving(bool $isMoving): self
    {
        $this->isMoving = $isMoving;

        return $this;
    }
}
