<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\HutRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;

#[ORM\Entity(repositoryClass: HutRepository::class)]
class Hut 
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    protected ?int $id = null;

    #[Assert\Length(
        min: 4,
        max: 100,
        minMessage: 'Le nom de votre établissement doit comporter au moins 4 caractéres.',
        maxMessage: 'Le nom de votre établissement doit comporter au maximum 100 caractéres.',
    )]
    #[ORM\Column(length: 255)]
    protected ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    protected ?string $description = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 6)]
    protected ?string $priceOneNight = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPriceOneNight(): ?string
    {
        return $this->priceOneNight;
    }

    public function setPriceOneNight(string $priceOneNight): self
    {
        $this->priceOneNight = $priceOneNight;

        return $this;
    }
}
