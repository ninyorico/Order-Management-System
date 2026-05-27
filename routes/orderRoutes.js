const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const roleMiddleware =
    require('../middleware/roleMiddleware');

const {
    createOrder,
    myOrders,
    allOrders,
    convertOrderToShipment
} = require('../controllers/orderController');

router.post(
    '/',
    authMiddleware,
    roleMiddleware('customer'),
    createOrder
);

router.get(
    '/my-orders',
    authMiddleware,
    myOrders
);

router.get(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    allOrders
);

router.put(
    '/convert/:id',
    authMiddleware,
    roleMiddleware('admin'),
    convertOrderToShipment
);

module.exports = router;