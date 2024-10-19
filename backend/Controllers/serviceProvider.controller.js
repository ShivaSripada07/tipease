const serviceProviderModel = require('../Model/serviceProvider.model');
const loginModel = require('../Model/login.model');
/*
    name :{
        type : String,
        required : true,
    },
    email :
    {
        type : String,
        required : true,
        unique : true
    },
    password :
    {
        type : String,
        required : true
    },
    mobileNumber :
    {
        type : Number,
        required : true,
        unique : true
    },
    serviceId :
    {
        type : Number,
        required : true,
        unique : true
    },
    imageUrl : 
    {
        type : String,
        required : true
    },
    bankDetails :
    {
        type : String,
        required : true,
        unique : true
    },
    role :
    {
        type : String , 
        required : true
    }

*/
const getServiceProvider = async(req,res)=>
{
    try
    {
        const allServiceProviders = await serviceProviderModel.find({});
        if(allServiceProviders)
        {
            res.status(200).json(allServiceProviders);
        }
        else
        {
            res.status(404).json({msg:'error in fetching'});
        }
    }
    catch(err)
    {
        res,status(500).json({msg:'unable to fetch'});
    }
};
const getByOrgId = async (req, res) => {
    try {
        const allServiceProviders = await serviceProviderModel.find({ organisationId: req.body.organisationId });
        if (allServiceProviders.length > 0) {
            res.status(200).json(allServiceProviders);
        } else {
            res.status(404).json({ msg: 'No service providers found for this organization.' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Unable to fetch service providers.' });
    }
};

const saveServiceProvider = async(req,res)=>
{
    try
    {
        const newServiceProvider = req.body;
        if(newServiceProvider)
        {
            const {name,email,password,mobileNumber,serviceId,imageUrl,bankDetails,role} = newServiceProvider;

            const newSP = serviceProviderModel.create({
                name:name,
                email:email,
                password:password,
                mobileNumber:mobileNumber,
                serviceId : serviceId,
                imageUrl : imageUrl,
                bankDetails : bankDetails,
                role : role
            });
            await loginModel.create({
                email:email,
                password : password,
                role : "service provider",
                name:name
            });
            newSP.then((ob)=>
            {
                res.status(201).json(ob);
            });
            newSP.catch((err)=>
            {
                res.status(500).json({error:`${err}`});
            });
        }
        else
        {
            res.status(404).json({msg:'all details required'});
        }
    }
    catch(err)
    {
        res.status(500).json({msg:'error occured'});
    }
        
};
const deleteServiceProvider = async(req,res)=>
{
       try
       {
            const {name} = req.body;
            const delObj = await serviceProviderModel.findOneAndDelete({name});

            if(delObj)
            {
                res.status(200).json({msg:'success'});
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
const updateServiceProvider = async(req,res)=>
{

    try
    {
        const updatedServiceProviderDetails = req.body;
        //console.log(updatedServiceProviderDetails);
        const updatedDetails = await serviceProviderModel.findOneAndUpdate({name:updatedServiceProviderDetails.name},updatedServiceProviderDetails);
        if(updatedDetails)
        {
            res.status(200).json({msg:'success'});
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
        const matchres = await serviceProviderModel.find({ username: { $regex: '^' + name + '.*', $options: 'i' } });
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
module.exports = {getServiceProvider,saveServiceProvider,updateServiceProvider,deleteServiceProvider,getBySearch , getByOrgId};