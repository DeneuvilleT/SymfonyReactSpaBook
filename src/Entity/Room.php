<?php

namespace App\Entity;

use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
class Room
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $hasBath = null;

    #[ORM\Column]
    private ?bool $hasBalcony = null;

    #[ORM\ManyToOne(inversedBy: 'room')]
    private ?Location $location = null;

    #[ORM\OneToMany(mappedBy: 'room', targetEntity: RoomBed::class, orphanRemoval:true, cascade:['persist'])]
    private Collection $roomBed;

    public function __construct()
    {
        $this->roomBed = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isHasBath(): ?bool
    {
        return $this->hasBath;
    }

    public function setHasBath(bool $hasBath): self
    {
        $this->hasBath = $hasBath;

        return $this;
    }

    public function isHasBalcony(): ?bool
    {
        return $this->hasBalcony;
    }

    public function setHasBalcony(bool $hasBalcony): self
    {
        $this->hasBalcony = $hasBalcony;

        return $this;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(?Location $location): self
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection<int, RoomBed>
     */
    public function getRoomBed(): Collection
    {
        return $this->roomBed;
    }

    public function addRoomBed(RoomBed $roomBed): self
    {
        if (!$this->roomBed->contains($roomBed)) {
            $this->roomBed->add($roomBed);
            $roomBed->setRoom($this);
        }

        return $this;
    }

    public function removeRoomBed(RoomBed $roomBed): self
    {
        if ($this->roomBed->removeElement($roomBed)) {
            // set the owning side to null (unless already changed)
            if ($roomBed->getRoom() === $this) {
                $roomBed->setRoom(null);
            }
        }

        return $this;
    }
}
