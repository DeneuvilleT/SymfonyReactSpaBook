<?php

namespace App\Entity;

use App\Repository\LocationTypesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LocationTypesRepository::class)]
class LocationTypes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $capacity = null;

    #[ORM\Column(nullable: true)]
    private ?bool $has_sanitary = null;

    #[ORM\Column(nullable: true)]
    private ?bool $has_garden = null;

    #[ORM\Column(nullable: true)]
    private ?bool $has_pool = null;

    #[ORM\Column(nullable: true)]
    private ?bool $animal_accepted = null;

    #[ORM\Column]
    private ?bool $is_available = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 6, nullable: true)]
    private ?string $tree_height = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?CategoriesCottage $categories_cottage = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function isHasSanitary(): ?bool
    {
        return $this->has_sanitary;
    }

    public function setHasSanitary(?bool $has_sanitary): static
    {
        $this->has_sanitary = $has_sanitary;

        return $this;
    }

    public function isHasGarden(): ?bool
    {
        return $this->has_garden;
    }

    public function setHasGarden(?bool $has_garden): static
    {
        $this->has_garden = $has_garden;

        return $this;
    }

    public function isHasPool(): ?bool
    {
        return $this->has_pool;
    }

    public function setHasPool(?bool $has_pool): static
    {
        $this->has_pool = $has_pool;

        return $this;
    }

    public function isAnimalAccepted(): ?bool
    {
        return $this->animal_accepted;
    }

    public function setAnimalAccepted(?bool $animal_accepted): static
    {
        $this->animal_accepted = $animal_accepted;

        return $this;
    }

    public function isIsAvailable(): ?bool
    {
        return $this->is_available;
    }

    public function setIsAvailable(bool $is_available): static
    {
        $this->is_available = $is_available;

        return $this;
    }

    public function getTreeHeight(): ?string
    {
        return $this->tree_height;
    }

    public function setTreeHeight(?string $tree_height): static
    {
        $this->tree_height = $tree_height;

        return $this;
    }

    public function getCategoriesCottage(): ?CategoriesCottage
    {
        return $this->categories_cottage;
    }

    public function setCategoriesCottage(?CategoriesCottage $categories_cottage): static
    {
        $this->categories_cottage = $categories_cottage;

        return $this;
    }
}
