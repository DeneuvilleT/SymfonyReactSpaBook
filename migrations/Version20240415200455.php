<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240415200455 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C35B671DE9B');
        $this->addSql('DROP INDEX IDX_7A853C35B671DE9B ON bookings');
        $this->addSql('ALTER TABLE bookings CHANGE categories_cottage_id location_type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C352B099F37 FOREIGN KEY (location_type_id) REFERENCES location_types (id)');
        $this->addSql('CREATE INDEX IDX_7A853C352B099F37 ON bookings (location_type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C352B099F37');
        $this->addSql('DROP INDEX IDX_7A853C352B099F37 ON bookings');
        $this->addSql('ALTER TABLE bookings CHANGE location_type_id categories_cottage_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C35B671DE9B FOREIGN KEY (categories_cottage_id) REFERENCES categories_cottage (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_7A853C35B671DE9B ON bookings (categories_cottage_id)');
    }
}
