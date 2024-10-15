const userModel = require('../Model/user.model');
const getUsers = async(req,res)=>
{
    try
    {
        const users = await userModel.find({});
        if(users)
        {
            res.status(200).json(users);
        }
        else
        {
            res.status(404).json({msg:'users not found'});
        }
    }
    catch(err)
    {
        res.send("error occured while fetching data...");
    }
};
const saveUsers = async(req,res)=>
{
    try
    {
       // console.log(req.body);
        const user = await userModel.create({
            email : req.body.email,
            password : req.body.password,
            mobileNumber : req.body.mobileNumber,
            imageUrl : req.body.imageUrl,
            role : req.body.role,
            username : req.body.username
        });
        console.log(user);
        return res.status(201).json({msg:'success'});
    }
    catch(err)
    {
        res.status(500).send("error");
    }
};
const deleteUsers = async(req,res)=>
{
        
};
const updateUsers = async(req,res)=>
{
            
};

module.exports = {getUsers,saveUsers,deleteUsers,updateUsers};