<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240207224653 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bookings (id INT AUTO_INCREMENT NOT NULL, location_type_id INT DEFAULT NULL, customer_id INT DEFAULT NULL, period_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', quantity_traveller INT NOT NULL, total_price NUMERIC(20, 6) NOT NULL, INDEX IDX_7A853C352B099F37 (location_type_id), INDEX IDX_7A853C359395C3F3 (customer_id), INDEX IDX_7A853C35EC8B7ADE (period_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C352B099F37 FOREIGN KEY (location_type_id) REFERENCES location_types (id)');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C359395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C35EC8B7ADE FOREIGN KEY (period_id) REFERENCES periods (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C352B099F37');
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C359395C3F3');
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C35EC8B7ADE');
        $this->addSql('DROP TABLE bookings');
    }
}
