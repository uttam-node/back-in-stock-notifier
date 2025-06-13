const productModel = require('../models/productModel');

exports.addProduct = async (req, res) => {
    try {
        const { name, stock } = req.body;
        if (!name || stock == null) return res.status(400).json({ error: 'Name and stock required' });
        const result = await productModel.createProduct(name, stock);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error creating product' });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { stock } = req.body;
        const { id } = req.params;
        if (stock == null) return res.status(400).json({ error: 'Stock required' });
        const result = await productModel.updateProductStock(id, stock);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error updating stock' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, name } = req.query;
        const offset = (page - 1) * limit;
        const result = await productModel.getFilteredProducts(name, limit, offset);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error fetching products' });
    }
};