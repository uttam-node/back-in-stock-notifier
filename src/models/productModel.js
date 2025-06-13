const db = require('../config/db');

exports.createProduct = async (name, stock) => {
    return db.query('INSERT INTO products(name, stock) VALUES($1, $2) RETURNING *', [name, stock]);
};

exports.updateProductStock = async (id, stock) => {
    return db.query('UPDATE products SET stock = $1 WHERE id = $2 RETURNING *', [stock, id]);
};

exports.getFilteredProducts = async (name, limit, offset) => {
    const filter = name ? `WHERE name ILIKE '%${name}%'` : '';
    return db.query(`SELECT * FROM products ${filter} ORDER BY id DESC LIMIT $1 OFFSET $2`, [limit, offset]);
};

exports.getInStockProducts = async () => {
    return db.query('SELECT * FROM products WHERE stock > 0');
};
