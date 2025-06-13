const db = require('../config/db');

exports.createSubscription = async (userId, productId) => {
    return db.query('INSERT INTO subscriptions(user_id, product_id) VALUES($1, $2) RETURNING *', [userId, productId]);
};

exports.getUnnotifiedSubscriptionsByProductId = async (productId) => {
    return db.query('SELECT * FROM subscriptions WHERE product_id = $1 AND is_notified = false', [productId]);
};

exports.markAsNotified = async (subscriptionId) => {
    return db.query('UPDATE subscriptions SET is_notified = true, notified_at = NOW() WHERE id = $1', [subscriptionId]);
};