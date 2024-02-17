<?php

namespace App\Entity;

use App\Repository\CategoriesCottageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoriesCottageRepository::class)]
class CategoriesCottage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 6)]
    private ?string $price_one_night = null;

    
    #[ORM\OneToMany(mappedBy: 'categories_cottage', targetEntity: Covers::class)]
    private Collection $covers;

    #[ORM\OneToMany(mappedBy: 'categories_cottage', targetEntity: Periods::class)]
    private Collection $periods;

    public function __construct()
    {
        $this->covers = new ArrayCollection();
        $this->periods = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPriceOneNight(): ?string
    {
        return $this->price_one_night;
    }

    public function setPriceOneNight(string $price_one_night): static
    {
        $this->price_one_night = $price_one_night;

        return $this;
    }

    /**
     * @return Collection<int, Covers>
     */
    public function getCovers(): Collection
    {
        return $this->covers;
    }

    public function addCover(Covers $cover): static
    {
        if (!$this->covers->contains($cover)) {
            $this->covers->add($cover);
            $cover->setCategoriesCottage($this);
        }

        return $this;
    }

    public function removeCover(Covers $cover): static
    {
        if ($this->covers->removeElement($cover)) {
            // set the owning side to null (unless already changed)
            if ($cover->getCategoriesCottage() === $this) {
                $cover->setCategoriesCottage(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Periods>
     */
    public function getPeriods(): Collection
    {
        return $this->periods;
    }

    public function addPeriod(Periods $period): static
    {
        if (!$this->periods->contains($period)) {
            $this->periods->add($period);
            $period->setCategoriesCottage($this);
        }

        return $this;
    }

    public function removePeriod(Periods $period): static
    {
        if ($this->periods->removeElement($period)) {
            // set the owning side to null (unless already changed)
            if ($period->getCategoriesCottage() === $this) {
                $period->setCategoriesCottage(null);
            }
        }

        return $this;
    }
}
