const userModel = require('../models/userModel');

exports.addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
        const result = await userModel.createUser(name, email);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error creating user' });
    }
};