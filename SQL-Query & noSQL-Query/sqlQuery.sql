
DROP DATABASE IF EXISTS shop_app;
CREATE DATABASE IF NOT EXISTS shop_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE shop_app;

CREATE TABLE IF NOT EXISTS users (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name            VARCHAR(50)   NOT NULL,
  email           VARCHAR(255)  NOT NULL,
  password        VARCHAR(100)  NOT NULL,                 
  role            ENUM('user','admin') NOT NULL DEFAULT 'user',
  is_confirmed    TINYINT(1)    NOT NULL DEFAULT 0,      
  confirm_otp     VARCHAR(100)  NULL,                     
  otp_expires_at  DATETIME      NULL,
  is_deleted      TINYINT(1)    NOT NULL DEFAULT 0,       
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role (role),
  KEY idx_users_is_deleted (is_deleted),
  CONSTRAINT chk_users_name_len CHECK (CHAR_LENGTH(name) >= 3)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name         VARCHAR(50)    NOT NULL,
  description  TEXT           NOT NULL,
  category     ENUM('clothes','sports','electronics') NOT NULL,
  price        DECIMAL(10,2)  NOT NULL,
  stock        INT UNSIGNED   NOT NULL DEFAULT 0,
  image        VARCHAR(500)   NULL,
  is_deleted   TINYINT(1)     NOT NULL DEFAULT 0,          
  created_at   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_name (name),
  KEY idx_products_category (category),
  KEY idx_products_price (price),
  KEY idx_products_is_deleted (is_deleted),
  FULLTEXT KEY ft_products_search (name, description),
  CONSTRAINT chk_products_price CHECK (price > 0)
) ENGINE=InnoDB;


USE shop_app;

INSERT INTO users (name, email, password, role, is_confirmed) VALUES
 ('Shop Admin',   'admin@shop.com',  '$2b$10$dLMqTRr5g90r5i0ofcyZWuAMxO0jYQ8rA6lhUf5fRMn0bCXZNgHzG', 'admin', 1),
 ('Sara Ahmed',   'sara@shop.com',   '$2b$10$75.IlxwIK0zHQXbmnkOMd.ephacZhls569a17AHql/E7H0aT0OGz2', 'user',  1),
 ('Omar Hassan',  'omar@shop.com',   '$2b$10$75.IlxwIK0zHQXbmnkOMd.ephacZhls569a17AHql/E7H0aT0OGz2', 'user',  1),
 ('Lina Farouk',  'lina@shop.com',   '$2b$10$75.IlxwIK0zHQXbmnkOMd.ephacZhls569a17AHql/E7H0aT0OGz2', 'user',  1),
 ('Pending User', 'pending@shop.com','$2b$10$75.IlxwIK0zHQXbmnkOMd.ephacZhls569a17AHql/E7H0aT0OGz2', 'user',  0);

INSERT INTO products (name, description, category, price, stock, image) VALUES
 ('Wireless Headphones',  'Over-ear Bluetooth headphones with active noise cancelling and 30h battery.', 'electronics', 129.99, 40,  NULL),
 ('Smart Watch Pro',      'Fitness tracking, heart-rate monitor, GPS and 5-day battery life.',           'electronics', 199.00, 25,  NULL),
 ('Portable Speaker',     'Waterproof Bluetooth speaker with deep bass and 12 hours of playtime.',       'electronics',  59.90, 80,  NULL),
 ('4K Action Camera',     'Ultra HD action camera with image stabilization and waterproof case.',        'electronics', 149.50, 15,  NULL),
 ('Mechanical Keyboard',  'Hot-swappable mechanical keyboard with RGB backlight and tactile switches.',   'electronics',  89.00, 55,  NULL),
 ('USB-C Fast Charger',   '65W GaN charger that powers a laptop, tablet and phone at the same time.',    'electronics',  34.99, 120, NULL),
 ('Gaming Mouse',         'Lightweight wired gaming mouse with 16000 DPI optical sensor.',               'electronics',  45.00, 70,  NULL),
 ('Running Shoes',        'Lightweight breathable running shoes with responsive cushioning.',            'sports',       79.99, 60,  NULL),
 ('Yoga Mat',             'Non-slip 6mm eco-friendly yoga mat with carrying strap.',                     'sports',       24.50, 150, NULL),
 ('Adjustable Dumbbells', 'Pair of adjustable dumbbells, 2 to 24 kg, quick-change dial system.',         'sports',      219.00, 12,  NULL),
 ('Football Size 5',      'Official size and weight match ball with durable synthetic leather.',         'sports',       29.99, 90,  NULL),
 ('Jump Rope Speed',      'Adjustable speed jump rope with ball bearings and foam handles.',             'sports',       12.00, 200, NULL),
 ('Water Bottle 1L',      'Insulated stainless steel bottle that keeps drinks cold for 24 hours.',       'sports',       19.95, 130, NULL),
 ('Classic Denim Jacket', 'Timeless medium-wash denim jacket with a relaxed everyday fit.',              'clothes',      69.00, 35,  NULL),
 ('Cotton T-Shirt',       'Soft 100% organic cotton crew-neck t-shirt available in many colours.',        'clothes',      15.99, 300, NULL),
 ('Slim Fit Jeans',       'Stretch slim fit jeans, dark wash, comfortable all-day wear.',                'clothes',      49.90, 100, NULL),
 ('Hooded Sweatshirt',    'Heavyweight fleece hoodie with kangaroo pocket and ribbed cuffs.',            'clothes',      44.00, 75,  NULL),
 ('Wool Winter Scarf',    'Warm merino wool scarf with a soft brushed finish.',                          'clothes',      22.50, 60,  NULL),
 ('Leather Belt',         'Genuine leather belt with brushed metal buckle.',                             'clothes',      27.00, 85,  NULL),
 ('Discontinued Cap',     'Old-season baseball cap kept for history (soft-deleted).',                    'clothes',       9.99, 0,   NULL);

UPDATE products SET is_deleted = 1 WHERE name = 'Discontinued Cap';


USE shop_app;


SELECT id, name, category, price, stock
FROM products
WHERE is_deleted = 0
ORDER BY created_at DESC, id DESC;

SELECT id, name, price
FROM products
WHERE is_deleted = 0 AND category = 'electronics' AND price BETWEEN 50 AND 150
ORDER BY price;

SELECT id, name, description
FROM products
WHERE is_deleted = 0 AND (name LIKE '%wireless%' OR description LIKE '%wireless%');

SELECT id, name, MATCH(name, description) AGAINST ('waterproof bluetooth' IN NATURAL LANGUAGE MODE) AS score
FROM products
WHERE is_deleted = 0
  AND MATCH(name, description) AGAINST ('waterproof bluetooth' IN NATURAL LANGUAGE MODE)
ORDER BY score DESC;

SELECT id, name, price FROM products WHERE is_deleted = 0 ORDER BY id LIMIT 5 OFFSET 5;

SELECT category,
       COUNT(*)              AS products,
       ROUND(AVG(price), 2)  AS avg_price,
       MIN(price)            AS cheapest,
       MAX(price)            AS most_expensive,
       SUM(stock)            AS units_in_stock,
       ROUND(SUM(price * stock), 2) AS stock_value
FROM products
WHERE is_deleted = 0
GROUP BY category
ORDER BY stock_value DESC;

SELECT name, category, price FROM products WHERE is_deleted = 0 ORDER BY price DESC LIMIT 5;

SELECT name, stock FROM products WHERE is_deleted = 0 AND stock < 20 ORDER BY stock;

INSERT INTO products (name, description, category, price, stock)
VALUES ('Sample Product', 'A sample product created from SQL.', 'sports', 10.50, 5);

UPDATE products SET price = 12.99, stock = stock + 10 WHERE name = 'Sample Product';

SELECT id, name FROM products WHERE is_deleted = 1;


SELECT id, name, email, role, is_confirmed, created_at
FROM users
WHERE is_deleted = 0
ORDER BY created_at DESC;

SELECT id, name, email, password, role, is_confirmed
FROM users
WHERE email = 'admin@shop.com' AND is_deleted = 0;

SELECT role, COUNT(*) AS total FROM users WHERE is_deleted = 0 GROUP BY role;

SELECT id, email, created_at
FROM users
WHERE is_confirmed = 0 AND created_at < NOW() - INTERVAL 1 DAY;

UPDATE users SET role = 'admin' WHERE email = 'omar@shop.com';
UPDATE users SET role = 'user'  WHERE email = 'omar@shop.com';

UPDATE users SET is_deleted = 1 WHERE email = 'lina@shop.com';
UPDATE users SET is_deleted = 0 WHERE email = 'lina@shop.com';

SELECT name, email FROM users WHERE created_at >= NOW() - INTERVAL 7 DAY;
