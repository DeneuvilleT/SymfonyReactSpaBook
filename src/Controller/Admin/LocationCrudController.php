<?php

namespace App\Controller\Admin;

use App\Entity\Location;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;

class LocationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Location::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setFormThemes(
                [
                    '@A2lixTranslationForm/bootstrap_5_layout.html.twig',
                    '@EasyAdmin/crud/form_theme.html.twig',
                ]
            );
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            BooleanField::new('has_sanitary', 'Sanitaire individuel'),
            BooleanField::new('has_garden', 'Jardin'),
            BooleanField::new('has_pool', 'Piscine'),
            BooleanField::new('animal_accepted', 'Animaux'),
            BooleanField::new('available', 'Disponible'),
            IntegerField::new('capacity', 'Capacité'),
        ];
    }
}
