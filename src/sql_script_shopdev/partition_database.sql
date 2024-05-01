CREATE TABLE orders (
	order_id INT, -- key hoa don
    order_date DATE NOT NULL, -- ngay tao hoa don
    total_amount DECIMAL(10,2), -- tien tra
    PRIMARY KEY (order_id, order_date)
)

PARTITION BY RANGE COLUMNS (order_date) (
	PARTITION p0 VALUES LESS THAN ('2022-01-01'),
    PARTITION P2023 VALUES LESS THAN ('2023-01-01'),
    PARTITION P2024 VALUES LESS THAN ('2024-01-01'),
    PARTITION pmax VALUES LESS THAN (MAXVALUE)
)

-- select data
EXPLAIN SELECT * FROM orders;

-- insert data
INSERT INTO orders(order_id, order_date, total_amount) VALUES (1, '2021-10-10', 100.99);
INSERT INTO orders(order_id, order_date, total_amount) VALUES (2, '2022-10-10', 100.99);
INSERT INTO orders(order_id, order_date, total_amount) VALUES (3, '2023-10-10', 100.99);
INSERT INTO orders(order_id, order_date, total_amount) VALUES (4, '2024-10-10', 100.99);
 
-- select data by range
explain select * from orders partition (p2023)

-- 
explain select * from orders where order_date >= '2022-01-01' AND order_date < '2025-01-01'







