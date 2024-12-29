-- SQLite

-- SQLite
INSERT INTO master_menus (menu_id, menu_name, banner_name, banner_image, banner_desc, created_by)
VALUES (1, 'Menu5', 'Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 'System' );


-- SQLite
INSERT INTO master_modules (module_id, module_name, module_category, created_by)
VALUES (2, 'Banner', 'Menu', 'System');


-- SQLite
INSERT INTO master_service (service_id, service_name, service_code, service_icon, service_tariff, created_by)
VALUES (2, 'Pulsa', 'PULSA', '', 40000, 'System' );


-- SQLite
UPDATE master_service
set service_code = 'PLN'
where service_name = 'Listrik'