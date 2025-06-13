const db = require('../config/db');

exports.createUser = async (name, email) => {
    return db.query('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email]);
};

exports.getUserById = async (id) => {
    return db.query('SELECT * FROM users WHERE id = $1', [id]);
};