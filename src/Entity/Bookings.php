<?php

namespace App\Entity;

use App\Repository\BookingsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookingsRepository::class)]
class Bookings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    private ?LocationTypes $location_type = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    private ?Customer $customer = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    private ?Periods $period = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    private ?int $quantity_traveller = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 6)]
    private ?string $total_price = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLocationType(): ?LocationTypes
    {
        return $this->location_type;
    }

    public function setLocationType(?LocationTypes $location_type): static
    {
        $this->location_type = $location_type;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): static
    {
        $this->customer = $customer;

        return $this;
    }

    public function getPeriod(): ?Periods
    {
        return $this->period;
    }

    public function setPeriod(?Periods $period): static
    {
        $this->period = $period;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getQuantityTraveller(): ?int
    {
        return $this->quantity_traveller;
    }

    public function setQuantityTraveller(int $quantity_traveller): static
    {
        $this->quantity_traveller = $quantity_traveller;

        return $this;
    }

    public function getTotalPrice(): ?string
    {
        return $this->total_price;
    }

    public function setTotalPrice(string $total_price): static
    {
        $this->total_price = $total_price;

        return $this;
    }
}
