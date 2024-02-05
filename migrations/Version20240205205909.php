<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240205205909 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE location DROP FOREIGN KEY FK_5E9E89CB9395C3F3');
        $this->addSql('DROP INDEX IDX_5E9E89CB9395C3F3 ON location');
        $this->addSql('ALTER TABLE location ADD animal_accepted TINYINT(1) DEFAULT NULL, DROP customer_id, DROP city, DROP longitude, DROP latitude');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE location ADD customer_id INT DEFAULT NULL, ADD city VARCHAR(255) NOT NULL, ADD longitude VARCHAR(255) DEFAULT NULL, ADD latitude VARCHAR(255) DEFAULT NULL, DROP animal_accepted');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CB9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_5E9E89CB9395C3F3 ON location (customer_id)');
    }
}
