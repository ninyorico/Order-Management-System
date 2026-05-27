const axios = require('axios');

const createShipment = async (shipmentData) => {

    try {

        const response = await axios.post(
            `${process.env.LEGACY_API}/api/shipments`,
            shipmentData
        );

        return response.data;

    } catch (err) {

        console.log(err.message);

        throw new Error(
            'Legacy shipment system unavailable'
        );
    }
};

module.exports = {
    createShipment
};