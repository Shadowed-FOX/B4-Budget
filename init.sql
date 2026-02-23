-- Tabela celów finansowych
CREATE TABLE IF NOT EXISTS goals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela transakcji powiązanych z celami
CREATE TABLE IF NOT EXISTS transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    goal_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO goals (name, target_amount) VALUES
('Wakacje', 2000.00),
('Nowy laptop', 1500.00),
('Oszczędności', 5000.00);

INSERT INTO transactions (goal_id, amount, description) VALUES
(1, 100.00, 'Pierwsza wpłata'),
(1, 150.00, 'Dodatkowa wpłata'),
(2, 300.00, 'Część na laptopa'),
(3, 500.00, 'Miesięczne oszczędności');
