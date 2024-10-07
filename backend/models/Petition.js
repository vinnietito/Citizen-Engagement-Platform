// backend/models/Petition.js
const db = require('../config/db');

class Petition {
    static create({ title, description, user_id }, callback) {
        db.query(
            'INSERT INTO petitions (title, description, user_id) VALUES (?, ?, ?)',
            [title, description, user_id],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    }

    static getAll(callback) {
        db.query('SELECT * FROM petitions', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM petitions WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
}

module.exports = Petition;
