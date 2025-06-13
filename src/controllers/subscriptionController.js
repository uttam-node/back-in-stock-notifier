const subscriptionModel = require('../models/subscriptionModel');

exports.subscribeUser = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        if (!user_id || !product_id) return res.status(400).json({ error: 'User ID and Product ID required' });
        const result = await subscriptionModel.createSubscription(user_id, product_id);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error subscribing user' });
    }
};