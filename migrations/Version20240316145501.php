<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240316145501 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE addresses (id INT AUTO_INCREMENT NOT NULL, customer_id INT DEFAULT NULL, alias VARCHAR(100) NOT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(100) NOT NULL, zip_code VARCHAR(25) NOT NULL, phone INT NOT NULL, type TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_6FCA75169395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bookings (id INT AUTO_INCREMENT NOT NULL, location_type_id INT DEFAULT NULL, customer_id INT DEFAULT NULL, period_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', quantity_traveller INT NOT NULL, total_price NUMERIC(20, 6) NOT NULL, INDEX IDX_7A853C352B099F37 (location_type_id), INDEX IDX_7A853C359395C3F3 (customer_id), INDEX IDX_7A853C35EC8B7ADE (period_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories_cottage (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, description LONGTEXT DEFAULT NULL, price_one_night NUMERIC(20, 6) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comments (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, customer_id INT NOT NULL, title VARCHAR(100) NOT NULL, author VARCHAR(50) NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_5F9E962A4584665A (product_id), INDEX IDX_5F9E962A9395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE covers (id INT AUTO_INCREMENT NOT NULL, categories_cottage_id INT DEFAULT NULL, path VARCHAR(255) NOT NULL, priority INT NOT NULL, INDEX IDX_F08DF1B2B671DE9B (categories_cottage_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, uid VARCHAR(255) NOT NULL, email VARCHAR(50) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, is_verified INT NOT NULL, UNIQUE INDEX UNIQ_81398E09539B0606 (uid), UNIQUE INDEX UNIQ_81398E09E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE line_orders (id INT AUTO_INCREMENT NOT NULL, product_id INT DEFAULT NULL, order_id INT DEFAULT NULL, amount NUMERIC(20, 6) NOT NULL, quantity INT NOT NULL, INDEX IDX_9161AB534584665A (product_id), INDEX IDX_9161AB538D9F6D38 (order_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE location_types (id INT AUTO_INCREMENT NOT NULL, categories_cottage_id INT DEFAULT NULL, type TINYINT(1) NOT NULL, capacity INT NOT NULL, has_sanitary TINYINT(1) DEFAULT NULL, has_garden TINYINT(1) DEFAULT NULL, has_pool TINYINT(1) DEFAULT NULL, animal_accepted TINYINT(1) DEFAULT NULL, is_available TINYINT(1) NOT NULL, tree_height NUMERIC(20, 6) DEFAULT NULL, UNIQUE INDEX UNIQ_2F6CCC15B671DE9B (categories_cottage_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE orders (id INT AUTO_INCREMENT NOT NULL, customer_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, amount NUMERIC(20, 6) NOT NULL, created_at DATETIME NOT NULL, status JSON NOT NULL, INDEX IDX_E52FFDEE9395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE periods (id INT AUTO_INCREMENT NOT NULL, categories_cottage_id INT DEFAULT NULL, start_at DATETIME NOT NULL, end_at DATETIME NOT NULL, INDEX IDX_671798A2B671DE9B (categories_cottage_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE products (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(1000) NOT NULL, cover VARCHAR(1000) NOT NULL, stock INT NOT NULL, price_unit NUMERIC(20, 6) NOT NULL, brand VARCHAR(50) NOT NULL, sku VARCHAR(10) NOT NULL, description_short VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_B3BA5A5AF9038C4 (sku), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE addresses ADD CONSTRAINT FK_6FCA75169395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C352B099F37 FOREIGN KEY (location_type_id) REFERENCES location_types (id)');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C359395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C35EC8B7ADE FOREIGN KEY (period_id) REFERENCES periods (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A4584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE covers ADD CONSTRAINT FK_F08DF1B2B671DE9B FOREIGN KEY (categories_cottage_id) REFERENCES categories_cottage (id)');
        $this->addSql('ALTER TABLE line_orders ADD CONSTRAINT FK_9161AB534584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('ALTER TABLE line_orders ADD CONSTRAINT FK_9161AB538D9F6D38 FOREIGN KEY (order_id) REFERENCES orders (id)');
        $this->addSql('ALTER TABLE location_types ADD CONSTRAINT FK_2F6CCC15B671DE9B FOREIGN KEY (categories_cottage_id) REFERENCES categories_cottage (id)');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E52FFDEE9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE periods ADD CONSTRAINT FK_671798A2B671DE9B FOREIGN KEY (categories_cottage_id) REFERENCES categories_cottage (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE addresses DROP FOREIGN KEY FK_6FCA75169395C3F3');
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C352B099F37');
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C359395C3F3');
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C35EC8B7ADE');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A4584665A');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A9395C3F3');
        $this->addSql('ALTER TABLE covers DROP FOREIGN KEY FK_F08DF1B2B671DE9B');
        $this->addSql('ALTER TABLE line_orders DROP FOREIGN KEY FK_9161AB534584665A');
        $this->addSql('ALTER TABLE line_orders DROP FOREIGN KEY FK_9161AB538D9F6D38');
        $this->addSql('ALTER TABLE location_types DROP FOREIGN KEY FK_2F6CCC15B671DE9B');
        $this->addSql('ALTER TABLE orders DROP FOREIGN KEY FK_E52FFDEE9395C3F3');
        $this->addSql('ALTER TABLE periods DROP FOREIGN KEY FK_671798A2B671DE9B');
        $this->addSql('DROP TABLE addresses');
        $this->addSql('DROP TABLE bookings');
        $this->addSql('DROP TABLE categories_cottage');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE covers');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE line_orders');
        $this->addSql('DROP TABLE location_types');
        $this->addSql('DROP TABLE orders');
        $this->addSql('DROP TABLE periods');
        $this->addSql('DROP TABLE products');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
