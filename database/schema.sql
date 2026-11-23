CREATE DATABASE IF NOT EXISTS shopnest;
USE shopnest;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100) DEFAULT 'General',
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status ENUM('Pending','Processing','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  payment_method VARCHAR(40) DEFAULT 'Cash on Delivery',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(180) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, description, price, image_url, category, stock)
SELECT * FROM (
  SELECT 'Wireless Headphones','Comfortable over-ear headphones with rich sound.',1499.00,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80','Electronics',25
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Wireless Headphones');

INSERT INTO products (name, description, price, image_url, category, stock)
SELECT 'Minimal Backpack','Everyday backpack with a clean, practical design.',899.00,'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80','Accessories',18
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Minimal Backpack');

INSERT INTO products (name, description, price, image_url, category, stock)
SELECT 'Classic Sneakers','Versatile sneakers for everyday comfort.',1999.00,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80','Fashion',12
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Classic Sneakers');

INSERT INTO products (name, description, price, image_url, category, stock)
SELECT 'Ceramic Coffee Mug','A simple ceramic mug for your daily coffee.',349.00,'https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=900&q=80','Home',40
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Ceramic Coffee Mug');

INSERT INTO products (name, description, price, image_url, category, stock)
SELECT 'Smart Watch','Track your activity and stay connected.',2499.00,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80','Electronics',15
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Smart Watch');

INSERT INTO products (name, description, price, image_url, category, stock)
SELECT 'Desk Lamp','Modern adjustable lamp for your workspace.',799.00,'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80','Home',20
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Desk Lamp');
