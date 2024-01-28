<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240128092050 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE apartment (id INT NOT NULL, floor INT DEFAULT NULL, is_duplex TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bed (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, capacity INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE boat (id INT NOT NULL, roof_height DOUBLE PRECISION DEFAULT NULL, motor TINYINT(1) DEFAULT NULL, is_moving TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE booking (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, location_id INT DEFAULT NULL, start_date_at DATETIME NOT NULL, end_at DATETIME NOT NULL, created_at DATETIME NOT NULL, quantity_traveller INT NOT NULL, total_price NUMERIC(20, 6) NOT NULL, INDEX IDX_E00CEDDEA76ED395 (user_id), INDEX IDX_E00CEDDE64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE house (id INT NOT NULL, has_garage TINYINT(1) DEFAULT NULL, has_garden TINYINT(1) DEFAULT NULL, has_pool TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE location (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, address VARCHAR(255) NOT NULL, tel VARCHAR(255) NOT NULL, price_one_night NUMERIC(20, 6) NOT NULL, nbr_room INT NOT NULL, city VARCHAR(255) NOT NULL, longitude VARCHAR(255) DEFAULT NULL, latitude VARCHAR(255) DEFAULT NULL, location_type VARCHAR(255) NOT NULL, INDEX IDX_5E9E89CBA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE room (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, has_bath TINYINT(1) NOT NULL, has_balcony TINYINT(1) NOT NULL, INDEX IDX_729F519B64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE room_bed (id INT AUTO_INCREMENT NOT NULL, room_id INT DEFAULT NULL, bed_id INT DEFAULT NULL, quantity INT NOT NULL, INDEX IDX_E4C141E254177093 (room_id), INDEX IDX_E4C141E288688BB9 (bed_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tree_house (id INT NOT NULL, tree_height DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, created_at DATETIME DEFAULT NULL, udapted_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE apartment ADD CONSTRAINT FK_4D7E6854BF396750 FOREIGN KEY (id) REFERENCES location (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE boat ADD CONSTRAINT FK_D86E834ABF396750 FOREIGN KEY (id) REFERENCES location (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE house ADD CONSTRAINT FK_67D5399DBF396750 FOREIGN KEY (id) REFERENCES location (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE room ADD CONSTRAINT FK_729F519B64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE room_bed ADD CONSTRAINT FK_E4C141E254177093 FOREIGN KEY (room_id) REFERENCES room (id)');
        $this->addSql('ALTER TABLE room_bed ADD CONSTRAINT FK_E4C141E288688BB9 FOREIGN KEY (bed_id) REFERENCES bed (id)');
        $this->addSql('ALTER TABLE tree_house ADD CONSTRAINT FK_DFD71FF8BF396750 FOREIGN KEY (id) REFERENCES location (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE apartment DROP FOREIGN KEY FK_4D7E6854BF396750');
        $this->addSql('ALTER TABLE boat DROP FOREIGN KEY FK_D86E834ABF396750');
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDEA76ED395');
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDE64D218E');
        $this->addSql('ALTER TABLE house DROP FOREIGN KEY FK_67D5399DBF396750');
        $this->addSql('ALTER TABLE location DROP FOREIGN KEY FK_5E9E89CBA76ED395');
        $this->addSql('ALTER TABLE room DROP FOREIGN KEY FK_729F519B64D218E');
        $this->addSql('ALTER TABLE room_bed DROP FOREIGN KEY FK_E4C141E254177093');
        $this->addSql('ALTER TABLE room_bed DROP FOREIGN KEY FK_E4C141E288688BB9');
        $this->addSql('ALTER TABLE tree_house DROP FOREIGN KEY FK_DFD71FF8BF396750');
        $this->addSql('DROP TABLE apartment');
        $this->addSql('DROP TABLE bed');
        $this->addSql('DROP TABLE boat');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE house');
        $this->addSql('DROP TABLE location');
        $this->addSql('DROP TABLE room');
        $this->addSql('DROP TABLE room_bed');
        $this->addSql('DROP TABLE tree_house');
        $this->addSql('DROP TABLE user');
    }
}
