<?php

namespace App\Entity;

use App\Repository\PeriodsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PeriodsRepository::class)]
class Periods
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $start_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $end_at = null;

    #[ORM\ManyToOne(inversedBy: 'periods')]
    private ?CategoriesCottage $categories_cottage = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->start_at;
    }

    public function setStartAt(\DateTimeInterface $start_at): static
    {
        $this->start_at = $start_at;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->end_at;
    }

    public function setEndAt(\DateTimeInterface $end_at): static
    {
        $this->end_at = $end_at;

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
