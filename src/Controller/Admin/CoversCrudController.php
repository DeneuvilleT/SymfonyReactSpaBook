<?php

namespace App\Controller\Admin;

use App\Entity\Covers;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;

class CoversCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Covers::class;
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
            ImageField::new('path', 'Image')
                ->setRequired(false)
                ->setBasePath('uploads/images/')
                ->setUploadDir('public/uploads/images/'),
            IntegerField::new('priority', 'Position'),
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
