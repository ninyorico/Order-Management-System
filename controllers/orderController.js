const Order = require('../models/orderModel');
const legacyShipmentService =
    require('../services/legacyShipmentService');

const createOrder = (req, res) => {

    const data = {
        ...req.body,
        userId: req.user.id
    };

    Order.createOrder(data, (err, result) => {

        if(err){
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: 'Order created'
        });

    });
};

const myOrders = (req, res) => {

    Order.getOrdersByUser(req.user.id, (err, result) => {

        if(err){
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(result);

    });
};

const allOrders = (req, res) => {

    Order.getAllOrders((err, result) => {

        if(err){
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(result);

    });
};



const convertOrderToShipment = async (req, res) => {

    const { id } = req.params;

    Order.getOrderById(id, async (err, result) => {

        if(err){
            return res.status(500).json({
                error: err.message
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        const order = result[0];

        try{

            const trackingNumber =
                `TRK-${Date.now()}`;

            const shipmentData = {

                trackingNum: trackingNumber,

                senderName: 'OMS Warehouse',

                recepientName:
                    order.productName,

                pickupAddress:
                    'Main Warehouse',

                deliveryAddress:
                    order.deliveryAddress,

                packageWeight:
                    order.quantity,

                shipmentStatus:
                    'Pending'
            };

            const shipment =
                await legacyShipmentService
                    .createShipment(shipmentData);

            res.status(200).json({
                message:
                    'Order converted to shipment',
                shipment
            });

        }catch(err){

            res.status(500).json({
                error: err.message
            });

        }

    });
};

module.exports = {
    createOrder,
    myOrders,
    allOrders,
    convertOrderToShipment
};