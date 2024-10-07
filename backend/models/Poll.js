// backend/models/Poll.js
const db = require('../config/db');

class Poll {
    static create({ question, options, user_id }, callback) {
        const optionsJson = JSON.stringify(options);
        db.query(
            'INSERT INTO polls (question, options, user_id) VALUES (?, ?, ?)',
            [question, optionsJson, user_id],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    }

    static getAll(callback) {
        db.query('SELECT * FROM polls', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM polls WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
}

module.exports = Poll;
