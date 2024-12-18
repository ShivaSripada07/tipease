const userModel = require('../Model/user.model');
const loginModel = require('../Model/login.model');
const { response } = require('express');
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
const saveUsers = async(req, res) => {
    try {
        const user = await userModel.create({
            email: req.body.email,
            password: req.body.password,
            mobileNumber: req.body.mobileNumber,
            imageUrl: req.body.imageUrl,
            role: req.body.role,
            username: req.body.username
        });
        await loginModel.create({
            email: user.email,
            password: user.password,
            role: "user",
            name: user.username
        });
        return res.status(201).json({ msg: 'User and login created successfully' });
    } catch (err) {
        return res.status(500).json({ msg: 'Error creating user or login', error: err.message });
    }
};
const deleteUsers = async(req,res)=>
{
    try
    {
        const name = req.body.username;
        const delUser = await userModel.findOneAndDelete({"username":name});
        //console.log(delUser);
        if(delUser)
        {
            res.status(200).json(delUser);
        }
        else
        {
            res.status(404).json({msg:'not found'});
        }
    }
    catch(err)
    {
        res.status(500).json({msg:'error'});
    }
        
};
const updateUsers = async(req,res)=>
{
    try
    {
        const newDetails = req.body;
        const updatedDetail = await userModel.findOneAndUpdate({"username": newDetails.username}, newDetails, { new: true });
        if(updatedDetail)
        {
            res.status(200).json(updatedDetail);
        }
        else
        {
            res.status(404).json({msg:'not found'});
        }

    }
    catch(err)
    {
        res.status(500).json({msg:'error'});
    }
            
};
const getBySearch = async(req,res)=>
{
    try
    {
        const name = req.body.username;
        const matchres = await userModel.find({ username: { $regex: '^' + name + '.*', $options: 'i' } });
        if(matchres)
        {
            res.status(200).json(matchres);
        }
        else
        {
            res.status(404).json({msg:'no match found'});
        }
    }
    catch(err)
    {
        res.status(500).json({msg:'error'});
    }
};
const getByName = async (req, res) => {
    try {
        const name = req.headers.name; 
        
        userModel.find({ username: name })
            .then(response => { 
                res.status(200).json(response);
            })
            .catch(err => {
                res.status(404).json({ 'msg': 'not found' });
            });
    } catch (err) {
        res.status(500).json({ msg: 'error' });
    }
};

module.exports = {getUsers,saveUsers,deleteUsers,updateUsers,getBySearch,getByName};