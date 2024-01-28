<?php

namespace App\Entity;

use App\Repository\ApartmentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ApartmentRepository::class)]
class Apartment extends Location
{
    // #[ORM\Id]
    // #[ORM\GeneratedValue]
    // #[ORM\Column]
    // private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $floor = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isDuplex = null;

    // public function getId(): ?int
    // {
    //     return $this->id;
    // }

    public function getFloor(): ?int
    {
        return $this->floor;
    }

    public function setFloor(int $floor): self
    {
        $this->floor = $floor;

        return $this;
    }

    public function isIsDuplex(): ?bool
    {
        return $this->isDuplex;
    }

    public function setIsDuplex(bool $isDuplex): self
    {
        $this->isDuplex = $isDuplex;

        return $this;
    }
}
