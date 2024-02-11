<?php

namespace App\Controller\Admin;

use App\Entity\CategoriesCottage;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;

class CategoriesCottageCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return CategoriesCottage::class;
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
            TextField::new('name', 'Nom'),
            TextEditorField::new('description', 'Description'),
            MoneyField::new('price_one_night', 'Prix pour une nuit')
                ->setCurrency('EUR')
                ->setNumDecimals(2),
        ];
    }
}
