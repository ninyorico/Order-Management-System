const axios = require('axios');

const orderInventory = async (
    itemId,
    quantity,
    token
) => {

    const response = await axios.post(

        `${process.env.INVENTORY_API}/inventory/order/${itemId}`,

        {
            quantity
        },

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;
};

module.exports = {
    orderInventory
};