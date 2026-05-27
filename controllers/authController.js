const axios = require("axios");

const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    // Register to Authentication System
    const authResult = await authService.register(req.body);

    // Sync to hosted users API
    await axios.post("https://users-api-we0n.onrender.com/api/users", {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });
    res.status(201).json(authResult);
  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
};

module.exports = {
  register,
  login,
};
