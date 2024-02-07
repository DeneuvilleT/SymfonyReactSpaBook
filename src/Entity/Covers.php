<?php

namespace App\Entity;

use App\Repository\CoversRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CoversRepository::class)]
class Covers
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $path = null;

    #[ORM\Column]
    private ?int $priority = null;

    #[ORM\ManyToOne(inversedBy: 'covers')]
    private ?CategoriesCottage $categories_cottage = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): static
    {
        $this->path = $path;

        return $this;
    }

    public function getPriority(): ?int
    {
        return $this->priority;
    }

    public function setPriority(int $priority): static
    {
        $this->priority = $priority;

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
