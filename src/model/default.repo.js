import pool from './db.connect.js';

export async function getProductById(productId) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    return rows[0];
}

const SORT_MAP = {
    'price-low':     'price ASC',
    'price-high':    'price DESC',
    'name-asc':      'product_name ASC',
    'name-desc':     'product_name DESC',
    'category-asc':  'category ASC',
    'category-desc': 'category DESC',
};

export async function getAllProducts(filters = {}) {
    let query = "SELECT * FROM products";
    const params = [];
    const conditions = [];

    if (filters.category) {
        conditions.push("category = ?");
        params.push(filters.category);
    }

    if (filters.maxPrice) {
        conditions.push("price <= ?");
        params.push(filters.maxPrice);
    }

    if (conditions.length) {
        query += " WHERE " + conditions.join(" AND ");
    }

    if (filters.sort && SORT_MAP[filters.sort]) {
        query += ` ORDER BY ${SORT_MAP[filters.sort]}`;
    }

    const [rows] = await pool.query(query, params);
    return rows;
}
