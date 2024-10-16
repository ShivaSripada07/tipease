const adminModel = require('../Model/admin.model');
const loginModel = require('../Model/login.model');
const getAdmin = async(req,res)=>
{
    try
    {
        const allRec = await adminModel.find({});
        if(allRec)
        {
            res.status(200).json(allRec);
        }
        else
        {
            res.status(404).json({msg:'unable to fetch'});
        }
    }
    catch(err)
    {
        res.status(500).json({msg:'error'});
    }
};
const saveAdmin = async(req,res)=>
{
      try
      { 
        const details = req.body;
        const adminDetails = await adminModel.create({
            email:details.email,
            password : details.password,
            role:"admin"
        });
        await loginModel.create({
            email:details.email,
            password : details.password,
            role : "admin"
        });
        if(adminDetails)
        {
            res.status(201).json({msg:'success'});
        }
        else
        {
            res.status(404).json({msg:'error'});
        }
      } 
      catch(err)
      {
        res.status(500).json({msg:'error'});
      } 
};
const deleteAdmin = async(req,res)=>
{
    const adminEmail = req.body.email;
    const delRec = await adminModel.findOneAndDelete({email:adminEmail});
    if(delRec)
    {
        res.status(200).json(delRec);
    }
    else
    {
        res.status(404).json({msg:'not found'});
    }             
};
const updateAdmin = async(req,res)=>
{
      try
      {
        const adminEmail = req.body.email;
        const updatedRec = req.body;
        const updatedAdmin = await adminModel.findOneAndUpdate({email:adminEmail},updatedRec);
        if(updatedAdmin)
        {
            res.status(200).json({msg:'successfully update'});
        }
        else
        {
            res.status(404).json({msg:'error'});
        }
      } 
      catch(err)
      {
        res.status(500).json({msg:'error'});
      }         
};
module.exports = {getAdmin,saveAdmin,deleteAdmin,updateAdmin};