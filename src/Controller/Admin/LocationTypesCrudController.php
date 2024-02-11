<?php

namespace App\Controller\Admin;

use App\Entity\LocationTypes;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;

class LocationTypesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return LocationTypes::class;
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
            IntegerField::new('capacity', 'Capacité'),
            BooleanField::new('has_sanitary', 'Sanitaire individuel'),
            BooleanField::new('has_garden', 'Jardin'),
            BooleanField::new('has_pool', 'Pisicne'),
            BooleanField::new('animal_accepted', 'Animaux'),
            BooleanField::new('is_available', 'Disponible'),
            MoneyField::new('tree_height', "Hauteur de l'arbre (en mètres)")
                ->setCurrency('MNT')
                ->setNumDecimals(2),
            AssociationField::new('categories_cottage', 'Gites et cabanes')
                ->formatValue(function ($value, $entity) {
                    return $value ? $value->getName() : '';
                })
                ->setFormTypeOption('choice_label', function ($value, $key, $index) {
                    return $value ? $value->getName() : '';
                }),
        ];
    }
}
