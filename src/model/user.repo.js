import pool from './db.connect.js';

export async function createUser(email, passwordHash) {
    const [result] = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES (?, ?)',
        [email, passwordHash]
    );
    return result.insertId;
}

export async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}