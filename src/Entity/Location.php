<?php

namespace App\Entity;

use App\Repository\LocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ReflectionClass;

#[ORM\InheritanceType("JOINED")]
#[ORM\DiscriminatorColumn(name: "location_type", type: "string")]
#[ORM\DiscriminatorMap(["apartment" => Apartment::class, "house" => House::class, "boat" => Boat::class, "treeHouse" => TreeHouse::class])]
#[ORM\Entity(repositoryClass: LocationRepository::class)]
class Location
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

    #[ORM\Column(length: 255)]
    protected ?string $address = null;

    #[ORM\Column(length: 255)]
    protected ?string $tel = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 6)]
    protected ?string $priceOneNight = null;

    #[ORM\Column]
    protected ?int $nbrRoom = null;

    #[ORM\OneToMany(mappedBy: 'location', targetEntity: Booking::class)]
    protected Collection $bookings;

    #[ORM\ManyToOne(inversedBy: 'location')]
    protected ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'location', targetEntity: Room::class)]
    protected Collection $room;

    #[ORM\Column(length: 255)]
    private ?string $City = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Longitude = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Latitude = null;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
        $this->room = new ArrayCollection();
    }

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): self
    {
        $this->tel = $tel;

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

    public function getNbrRoom(): ?int
    {
        return $this->nbrRoom;
    }

    public function setNbrRoom(int $nbrRoom): self
    {
        $this->nbrRoom = $nbrRoom;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Room>
     */
    public function getRoom(): Collection
    {
        return $this->room;
    }

    public function addRoom(Room $room): self
    {
        if (!$this->room->contains($room)) {
            $this->room->add($room);
            $room->setLocation($this);
        }

        return $this;
    }

    public function removeRoom(Room $room): self
    {
        if ($this->room->removeElement($room)) {
            // set the owning side to null (unless already changed)
            if ($room->getLocation() === $this) {
                $room->setLocation(null);
            }
        }

        return $this;
    }

    public function getClassName()
    {
        $class = new ReflectionClass($this);
        return $class->getShortName();
    }

    public function getCity(): ?string
    {
        return $this->City;
    }

    public function setCity(string $City): self
    {
        $this->City = $City;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->Longitude;
    }

    public function setLongitude(string $Longitude): self
    {
        $this->Longitude = $Longitude;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->Latitude;
    }

    public function setLatitude(string $Latitude): self
    {
        $this->Latitude = $Latitude;

        return $this;
    }

    public function getCapacity()
    {
        $capacity = 0;

        foreach ($this->getRoom() as $rooms) {
            foreach ($rooms->getRoomBed() as $roomBed) {
                $capacity += $roomBed->getQuantity() * $roomBed->getBed()->getCapacity();
            }
        }
        return $capacity;
    }
}
