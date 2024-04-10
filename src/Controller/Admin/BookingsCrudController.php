<?php

namespace App\Controller\Admin;

use App\Entity\Bookings;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;

class BookingsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Bookings::class;
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
            MoneyField::new('total_price', 'Prix')
                ->setCurrency('EUR')
                ->setNumDecimals(2),
            IntegerField::new('quantity_traveller', 'Nombre de voyageur'),
            DateTimeField::new('created_at', 'Créée le'),
            AssociationField::new('location_type', 'Gites et cabanes')
                ->formatValue(function ($value, $entity) {
                    return $value ? $value->getCategoriesCottage()->getName() : '';
                })
                ->setFormTypeOption('choice_label', function ($value, $key, $index) {
                    return $value ? $value->getCategoriesCottage()->getName() : '';
                }),
            AssociationField::new('customer', 'Client')
                ->formatValue(function ($value, $entity) {
                    return $value ? $value->getFirstname() . ' ' . $value->getLastname() : '';
                })
                ->setFormTypeOption('choice_label', function ($value, $key, $index) {
                    return $value ? $value->getFirstname() . ' ' . $value->getLastname() : '';
                }),
            DateTimeField::new('start_at', 'De'),
            DateTimeField::new('end_at', "Jusqu'au"),

        ];
    }
}
