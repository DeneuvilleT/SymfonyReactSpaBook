<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240410200139 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C35EC8B7ADE');
        $this->addSql('DROP INDEX IDX_7A853C35EC8B7ADE ON bookings');
        $this->addSql('ALTER TABLE bookings ADD start_at DATETIME NOT NULL, ADD end_at DATETIME NOT NULL, DROP period_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bookings ADD period_id INT DEFAULT NULL, DROP start_at, DROP end_at');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C35EC8B7ADE FOREIGN KEY (period_id) REFERENCES periods (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_7A853C35EC8B7ADE ON bookings (period_id)');
    }
}
