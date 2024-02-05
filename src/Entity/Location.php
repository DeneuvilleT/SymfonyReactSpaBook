<?php

namespace App\Entity;

use App\Repository\LocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ReflectionClass;


#[ORM\Entity(repositoryClass: LocationRepository::class)]
class Location
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    protected ?int $id = null;

    #[ORM\Column]
    protected ?int $capacity = null;

    #[ORM\OneToMany(mappedBy: 'location', targetEntity: Booking::class)]
    protected Collection $bookings;

    #[ORM\Column(nullable: true)]
    private ?bool $hasSanitary = null;

    #[ORM\Column(nullable: true)]
    private ?bool $hasGarden = null;

    #[ORM\Column(nullable: true)]
    private ?bool $hasPool = null;

    #[ORM\Column(nullable: true)]
    private ?bool $animalAccepted = null;

    #[ORM\Column(nullable: true)]
    private ?bool $available = null;

    #[ORM\Column(nullable: true)]
    private ?float $treeHeight = null;

    #[ORM\OneToMany(mappedBy: 'location', targetEntity: DatesTable::class)]
    private Collection $datesTables;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
        $this->datesTables = new ArrayCollection();
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function hasSanitary(): ?bool
    {
        return $this->hasSanitary;
    }

    public function setHasSanitary(bool $hasSanitary): self
    {
        $this->hasSanitary = $hasSanitary;

        return $this;
    }

    public function hasGarden(): ?bool
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

    public function isAnimalAccepted(): ?bool
    {
        return $this->animalAccepted;
    }

    public function setAnimalAccepted(bool $animalAccepted): self
    {
        $this->animalAccepted = $animalAccepted;

        return $this;
    }

    public function isAvailable(): ?bool
    {
        return $this->available;
    }

    public function setAvailable(bool $available): self
    {
        $this->available = $available;

        return $this;
    }

    public function getTreeHeight(): ?float
    {
        return $this->treeHeight;
    }

    public function setTreeHeight(float $treeHeight): self
    {
        $this->treeHeight = $treeHeight;

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setLocation($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getLocation() === $this) {
                $booking->setLocation(null);
            }
        }

        return $this;
    }

    public function getClassName()
    {
        $class = new ReflectionClass($this);
        return $class->getShortName();
    }

    /**
     * @return Collection<int, DatesTable>
     */
    public function getDatesTables(): Collection
    {
        return $this->datesTables;
    }

    public function addDatesTable(DatesTable $datesTable): static
    {
        if (!$this->datesTables->contains($datesTable)) {
            $this->datesTables->add($datesTable);
            $datesTable->setLocation($this);
        }

        return $this;
    }

    public function removeDatesTable(DatesTable $datesTable): static
    {
        if ($this->datesTables->removeElement($datesTable)) {
            // set the owning side to null (unless already changed)
            if ($datesTable->getLocation() === $this) {
                $datesTable->setLocation(null);
            }
        }

        return $this;
    }
}
