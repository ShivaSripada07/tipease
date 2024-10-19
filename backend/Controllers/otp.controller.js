const { sendMail } = require('../NodeMailer/mail'); 

const generateOTP = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = Math.floor(1000 + Math.random() * 9000); 
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
                }
                .content p, .content div {
                    color: white !important; /* Ensure white color for all text in content */
                }
                .otp-code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #05aa6d !important; /* Force OTP to green */
                    text-align: center;
                    margin: 20px 0;
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
                    <h1>Your TipEase OTP</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) for accessing your TipEase account is:</p>
                    <div class="otp-code">${otp}</div> <!-- OTP is placed here with enforced green color -->
                    <p>Please enter this OTP to complete your authentication. The OTP is valid for a limited time.</p>
                    <p>If you did not request this OTP, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>TipEase Team<br>Contact us: support@tipease.com</p>
                </div>
            </div>
        </body>
        </html>
        `;                          
        const subject = "Your TipEase OTP Code";
        await sendMail(email, subject, html);
        res.status(200).json({otp:otp});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send OTP.' });
    }
};

module.exports = { generateOTP };
