import pool from './db.connect.js';

export async function getProductById(productId) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    return rows[0];
}

export async function getAllProducts(filters = {}) {
    let query = "SELECT * FROM products";
    const params = [];

    if (filters.category) {
        query += " WHERE category = ?";
        params.push(filters.category);
    }

    if (filters.maxPrice) {
        query += filters.category ? " AND price <= ?" : " WHERE price <= ?";
        params.push(filters.maxPrice);
    }

    const [rows] = await pool.query(query, params);
    return rows;
}
