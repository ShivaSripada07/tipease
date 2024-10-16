const loginModel = require('../Model/login.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const checkUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginModel.findOne({ email });
        if (user && user.password === password) {
            jwt.sign({ user }, secret, (err, token) => {
                if (!err)
                    res.status(200).json({ token });
                else
                    res.status(404).send(false);
            });
        } 
        else 
        {
            res.status(404).send(false);
        }
    } catch (error) {
        res.status(404).send(false);
    }
};
module.exports = {checkUser};
