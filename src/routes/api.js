// === src/routes/api.js ===
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const subscriptionController = require('../controllers/subscriptionController');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post('/users', userController.addUser);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product added successfully
 */
router.post('/products', productController.addProduct);

/**
 * @swagger
 * /api/products/{id}/stock:
 *   put:
 *     summary: Update stock for a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stock
 *             properties:
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stock updated successfully
 */
router.put('/products/:id/stock', productController.updateStock);

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Subscribe a user to a product
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - product_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Subscription created successfully
 */
router.post('/subscribe', subscriptionController.subscribeUser);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with optional filtering
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by product name
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', productController.getProducts);

module.exports = router;