-- Drop tables if they exist
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS supplier;
DROP TABLE IF EXISTS device;
DROP TABLE IF EXISTS price;
DROP TABLE IF EXISTS currency;
DROP TABLE IF EXISTS cat;

-- Create 'cat' table
CREATE TABLE cat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

-- Insert data into 'cat' table
INSERT INTO cat (title) VALUES
  ('bulbs'),
  ('Television (TV)'),
  ('Television Box (TV Box)'),
  ('Refrigerator (Fridge)'),
  ('Microwave Oven'),
  ('Blender'),
  ('Washing Machine'),
  ('Air Conditioner'),
  ('Vacuum Cleaner'),
  ('Dishwasher'),
  ('Electric Iron'),
  ('Toaster'),
  ('Coffee Maker'),
  ('Hair Dryer'),
  ('Electric Fan'),
  ('Electric Heater'),
  ('Food Processor'),
  ('Rice Cooker'),
  ('Electric Kettle'),
  ('Electric Shaver'),
  ('Curling Iron'),
  ('Clothes Dryer'),
  ('Bread Maker'),
  ('Air Purifier'),
  ('Water Heater'),
  ('Electric Grill');

-- Create 'currency' table
CREATE TABLE currency (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(255) NOT NULL
);

-- Insert data into 'currency' table
INSERT INTO currency (code) VALUES
  ('fr'),
  ('USD'),
  ('CAD'),
  ('GBP'),
  ('SEK'),
  ('DKK'),
  ('NOK'),
  ('CHF'),
  ('PLN'),
  ('CZK'),
  ('HUF'),
  ('RON'),
  ('BGN'),
  ('HRK'),
  ('JPY'),
  ('AUD'),
  ('NZD'),
  ('EUR');

-- Create 'device' table
CREATE TABLE device (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  watt INT,
  ean VARCHAR(255),
  category_name VARCHAR(255),
  supplier VARCHAR(255),
  price DECIMAL(10, 2),
  price_id INT
);

-- Insert data into 'device' table
INSERT INTO device (title, brand, watt, ean, category_name, supplier, price) VALUES
  ('bulb 1', 'samsung', 120, '547895645875', 'bulbs', NULL, NULL),
  ('tv', 'samsung', 400, '457895748', 'Refrigerator (Fridge)', NULL, NULL),
  ('TVBOX', 'sfr', 650, '578974587', 'Microwave Oven', NULL, NULL),
  ('hthht', 'trhh', 120, '455666', 'Television (TV)', 'test8', 0.05),
  ('(èi(eèi', 'kttkyd', 120, '54466646', 'Television (TV)', 'direct energie', 0.02),
  ('jyjzjy', 'thrh', 120, '4545445', 'Television (TV)', 'direct energie', 0.01);

-- Create 'supplier' table
CREATE TABLE supplier (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  year DATE
);

-- Insert data into 'supplier' table
INSERT INTO supplier (title, country, year) VALUES
  ('direct energie', 'fr', '2023-06-24'),
  ('test8', 'fr', '2022-02-12'),
  ('test9', 'fr', '2022-03-21'),
  ('test14', 'fr', '2022-02-02'),
  ('test17', 'fr', '2022-02-02'),
  ('edf', 'france', '2014-05-23'),
  ('rthhhtr', 'hthth', '2023-10-05');

-- Create 'user' table
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  hashedpassword VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  mydevice VARCHAR(255),
  result VARCHAR(255)
);

-- Insert data into 'user' table
INSERT INTO user (pseudo, email, hashedpassword, country, mydevice, result) VALUES
  ('lovely', 'test@gmail.com', 'test1', 'france', NULL, NULL),
  ('john_doe', 'johndoe@example.com', 'your_hashed_password_here', 'United States', '1', '0'),
  ('nils', 'test1@gmail.com', '1234', 'fr', NULL, NULL),
  ('nils', 'test@gmail.com', '1234', 'fr', NULL, NULL),
  ('nils2', 'test47@gmail.com', '1234', 'fr', NULL, NULL),
  ('nils5', 'test@gmail.com', '1234', 'uk', NULL, NULL),
  ('nils70', 'test70@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$UQ/P1bEf9yz8ZV5z2QEH0g$dTCz5S5UOSw4tz1zcpiepi0chqyH/grxiRBJmxM1KfU', 'fr', NULL, NULL),
  ('nils65', 'test98@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$xQcAtXhPxlAD1FIb8rt9Pw$WxNnEkUudBMoiT4oKryX4X8hhxby9jrc+kyiKkVbcuY', 'fr', NULL, NULL),
  ('nils110', 'nils.mehlhorn.ie@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$I/gx3OoWxg/c5Wf5SU1A/Q$pL5Rq1xxjfrxeuvle3YP4/Ah4pTxWXnTEgGXwfPPStI', 'fr', NULL, NULL),
  ('axel', 'axel@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$01QU5okEmMJuFLTQ0/qfqQ$8Gjsvb7CoN5Vxwsf1w+F0x5X6tU7CI4BjLiXabq1nJs', 'fr', NULL, NULL),
  ('axel1', 'axel1@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$x9GivFNPAgJXvvxW06wSPA$TTSsM8cMQJ1Y7Wo/VYrh/EdcRNdzcbOChBeB5QpTtPQ', 'fr', NULL, NULL),
  ('axel2', 'axel2@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$v4zIi5FVCVYUGevNHb6/ww$3CqI4zefgAkBjzwd9qOSTQeOABv5C7JZB3LngRDd+Og', 'fr', NULL, NULL),
  ('mina1', 'mina@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$SCAtjsODbpADoBa8ADKrsQ$Lkx21HR2l5/QSyYKci/APJym1eQdLMI7GcV7fDqOZIQ', 'fr', NULL, NULL);
