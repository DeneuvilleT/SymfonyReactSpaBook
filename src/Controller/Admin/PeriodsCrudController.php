<?php

namespace App\Controller\Admin;

use App\Entity\Periods;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;

class PeriodsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Periods::class;
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
            DateTimeField::new('start_at', 'De'),
            DateTimeField::new('end_at', "Jusqu'au"),
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
