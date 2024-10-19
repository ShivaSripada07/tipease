const loginModel = require('../Model/login.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {sendMail} = require('../NodeMailer/mail');
const secret = process.env.SECRET;
const checkUser = async (req, res) => {
    try {
        const { email, password , role , name} = req.body;
        const user = await loginModel.findOne({ email });
        if (user && user.password === password) {
            jwt.sign({ user }, secret, (err, token) => {
                if (!err)
                {
                    const html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                                color: white;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #1d2a35;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                            }
                            .header {
                                text-align: center;
                                background-color: #05aa6d;
                                color: white;
                                padding: 10px;
                                border-radius: 8px 8px 0 0;
                            }
                            .content {
                                margin: 20px 0;
                                color: white;
                            }
                            .content p {
                                margin: 0;
                            }
                            .footer {
                                text-align: center;
                                font-size: 12px;
                                color: #777;
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Welcome Back to TipEase!</h1>
                            </div>
                            <div class="content">
                                <p>Hello ${user.name},</p>
                                <p>We are pleased to inform you that your recent login to your TipEase account was successful.</p>
                                <p>If this login was not initiated by you, please contact our support team immediately at support@tipease.com.</p>
                                <p>We look forward to providing you with an easy and seamless tipping experience. Thank you for being a valued user!</p>
                            </div>
                            <div class="footer">
                                <p>TipEase Team<br>Contact us: support@tipease.com</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    `;                                   
                const subject = "Successful Login to TipEase: Welcome Back!";
                sendMail(email,subject,html);
                res.status(200).json({ token , role : user.role , email : user.email , name : user.name });
                }
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
