const db = require('../config/db');

const createOrder = (data, callback) => {

    const sql = `
        INSERT INTO orders
        (userId, productName, quantity, totalPrice, deliveryAddress)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.userId,
        data.productName,
        data.quantity,
        data.totalPrice,
        data.deliveryAddress
    ], callback);
};

const getOrdersByUser = (userId, callback) => {

    db.query(
        `SELECT * FROM orders WHERE userId = ?`,
        [userId],
        callback
    );
};

const getAllOrders = (callback) => {

    db.query(
        `SELECT * FROM orders`,
        callback
    );
};

const getOrderById = (id, callback) => {

    const sql =
        `SELECT * FROM orders WHERE id = ?`;

    db.query(sql, [id], callback);
};

module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    getOrderById
};  