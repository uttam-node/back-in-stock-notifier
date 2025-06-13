const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const db = require('../config/db');
const mailer = require('../services/mailer');
require('dotenv').config();

const connection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

const notifyQueue = new Queue('notify', { connection });

const addToQueue = () => {
    notifyQueue.add('run-notification', {}, {
        repeat: { every: 5 * 60 * 1000 },
        removeOnComplete: true
    });
};

const worker = new Worker('notify', async () => {
    try {
        const products = await db.query('SELECT * FROM products WHERE stock > 0');
        for (const product of products.rows) {
            const subs = await db.query(
                'SELECT * FROM subscriptions WHERE product_id = $1 AND is_notified = false',
                [product.id]
            );
            for (const sub of subs.rows) {
                try {
                    const userRes = await db.query('SELECT * FROM users WHERE id = $1', [sub.user_id]);
                    const user = userRes.rows[0];
                    if (user) {
                        await mailer.send(user.email, product.name);
                        await db.query(
                            'UPDATE subscriptions SET is_notified = true, notified_at = NOW() WHERE id = $1',
                            [sub.id]
                        );
                        console.log(`Notification logged: ${user.email} was notified about ${product.name}`);
                    }
                } catch (err) {
                    console.error('Error sending email or updating subscription:', err);
                }
            }
        }
    } catch (err) {
        console.error('Notification worker error:', err);
    }
}, { connection });

module.exports = { addToQueue };
