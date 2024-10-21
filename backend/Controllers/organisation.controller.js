const organisationModel = require('../Model/organisation.model');
const loginModel = require('../Model/login.model');
/*
    email:
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
    role :
    {
        type : String , 
        required : true
    },
    organisationId :
    {
        type : Number,
        required : true,
        unique : true
    },
    organisationName : 
    {
        type : String , 
        required : true,
        unique : true
    },
    location :
    {
        type : String,
        required : true
    },
    mobileNumber :
    {
        type : Number,
        required : true
    },
    imageUrl : 
    {
        type : String,
        required : true
    }
*/
const getOrganisation = async(req,res)=>
{
    try
    {
        const allRec = await organisationModel.find({});

        if(allRec)
        {
            res.status(200).json(allRec);
        }
        else
        {
            res.status(404).json({msg:'not found'});
        }

    }
    catch(err)
    {
        res.status(500).json({msg:'unable to get'});
    }
    
};
const saveOrganisation = async(req,res)=>
{
        try
        {
            const {email,password,role,organisationId,organisationName,location,mobileNumber,imageUrl} = req.body;

            const newRecord = organisationModel.create({
                email:email,
                password:password,
                role:role,
                organisationId:organisationId,
                organisationName:organisationName,
                location:location,
                mobileNumber:mobileNumber,
                imageUrl:imageUrl
            });
            await loginModel.create({
                email:email,
                password : password,
                role : "organisation",
                name:organisationName,
                id:organisationId
            });
            newRecord.then((response)=>
            {
                res.status(201).json({msg:'success'});
            });
            newRecord.catch((err)=>
            {
                res.status(404).json({msg:'unable to create'});
            });
        }
        catch(err)
        {
            res.status(500).json({msg:'error'});
        }
};
const deleteOrganisation = async(req,res)=>
{
      try
      {
        const orgName = req.body.organisationName;

        const delRec = await organisationModel.findOneAndDelete({organisationName:orgName});

        if(delRec)
        {
            res.status(200).json(delRec);
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
const updateOrganisation = async(req,res)=>
{
    try
    {
        const updatedDetails = req.body;
        const details = await organisationModel.findOneAndUpdate({organisationId:updatedDetails.organisationId},updatedDetails);
        if(details)
        {
            res.status(200).json({msg:'successfully updates'});
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
const getBySearch = async(req,res)=>
{
    try
    {
        const name = req.body.username;
        const matchres = await organisationModel.find({ username: { $regex: '^' + name + '.*', $options: 'i' } });
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
const getOrgId = async (req, res) => {
    try {
      const organisationId = req.body.id; 
      const response = await organisationModel.find({ organisationId : organisationId });  
      if (response.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ msg: 'Organisation not found' });
      }
    } catch (err) {
      res.status(500).json({ msg: 'Error occurred during fetching', error: err.message });
    }
  };
  
module.exports = {getOrganisation,saveOrganisation,deleteOrganisation,updateOrganisation,getBySearch,getOrgId};