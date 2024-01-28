<?php

namespace App\Entity;

use App\Repository\TreeHouseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TreeHouseRepository::class)]
class TreeHouse extends Location
{
    // #[ORM\Id]
    // #[ORM\GeneratedValue]
    // #[ORM\Column]
    // private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?float $treeHeight = null;

    // public function getId(): ?int
    // {
    //     return $this->id;
    // }

    public function getTreeHeight(): ?float
    {
        return $this->treeHeight;
    }

    public function setTreeHeight(float $treeHeight): self
    {
        $this->treeHeight = $treeHeight;

        return $this;
    }
}
