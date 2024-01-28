<?php

namespace App\Entity;

use App\Repository\HouseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HouseRepository::class)]
class House extends Location
{
    // #[ORM\Id]
    // #[ORM\GeneratedValue]
    // #[ORM\Column]
    // private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?bool $hasGarage = null;

    #[ORM\Column(nullable: true)]
    private ?bool $hasGarden = null;

    #[ORM\Column(nullable: true)]
    private ?bool $hasPool = null;

    // public function getId(): ?int
    // {
    //     return $this->id;
    // }

    public function isHasGarage(): ?bool
    {
        return $this->hasGarage;
    }

    public function setHasGarage(bool $hasGarage): self
    {
        $this->hasGarage = $hasGarage;

        return $this;
    }

    public function isHasGarden(): ?bool
    {
        return $this->hasGarden;
    }

    public function setHasGarden(bool $hasGarden): self
    {
        $this->hasGarden = $hasGarden;

        return $this;
    }

    public function isHasPool(): ?bool
    {
        return $this->hasPool;
    }

    public function setHasPool(bool $hasPool): self
    {
        $this->hasPool = $hasPool;

        return $this;
    }
}
