const jwt=require('jsonwebtoken');
require('dotenv').config();
const secret=process.env.SECRET;
const verifyToken= async (req,res,next)=>
{
    try
    {
        const token=req.headers.authorization.split(" ")[1]
        jwt.verify(token,secret,(err,data)=>
            {
                if(!err)
                {
                    req.user=data.user;
                    next();
                }
                else
                    res.status(300).json({"message" : "Not athorized"});
            }
        );
    }
    catch(error)
    {
        res.status(404).json({"message" : "unable to verify"});
    }
};
const isAdmin=(req,res,next)=>{
    const role=req.user.role;
    if(role.toLowerCase()=="admin")
        next();
    else
        res.status(300).json({"message" : "Not an admin"});
};
module.exports = {verifyToken,isAdmin};