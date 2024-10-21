const serviceProviderModel = require('../Model/serviceProvider.model');
const loginModel = require('../Model/login.model');
const QRCode = require('qrcode');

const generateQRCode = async (serviceId) => {
    try {
        const url = `http://localhost:3000/paytip/${serviceId}`;
        const qrCode = await QRCode.toDataURL(url);
        return qrCode;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
};
const getServiceProvider = async (req, res) => {
    try {
        const allServiceProviders = await serviceProviderModel.find({});
        if (allServiceProviders) {
            res.status(200).json(allServiceProviders);
        } else {
            res.status(404).json({ msg: 'error in fetching' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'unable to fetch' });
    }
};

const getByOrgId = async (req, res) => {
    try {
        const organisationId = req.body.organisationId;
        const allServiceProviders = await serviceProviderModel.find({ organisationId });

        if (allServiceProviders.length > 0) {
            res.status(200).json(allServiceProviders);
        } else {
            res.status(404).json({ msg: 'No service providers found for this organization.' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Unable to fetch service providers.', error: err.message });
    }
};

const saveServiceProvider = async (req, res) => {
    try {
        const newServiceProvider = req.body;
        if (newServiceProvider) {
            const { name, email, password, mobileNumber, serviceId, imageUrl, bankDetails, role, organisationId } = newServiceProvider;

            const qrCode = await generateQRCode(serviceId);

            const newSP = serviceProviderModel.create({
                name,
                email,
                password,
                mobileNumber,
                serviceId,
                imageUrl,
                bankDetails,
                role,
                organisationId,
                qrCode
            });
            const id = serviceId;
            try {
                const newLogin = await loginModel.create({
                    id ,
                    email,
                    password,
                    role: "serviceProvider",
                    name,
                });
            } catch (error) {
            }
            newSP.then((ob) => {
                res.status(201).json(ob);
            }).catch((err) => {
                res.status(500).json({ error: `${err}` });
            });
        } else {
            res.status(404).json({ msg: 'all details required' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'error occurred', error: err.message });
    }
};

const deleteServiceProvider = async (req, res) => {
    try {
        const { name } = req.body;
        const delObj = await serviceProviderModel.findOneAndDelete({ name });

        if (delObj) {
            res.status(200).json({ msg: 'success' });
        } else {
            res.status(404).json({ msg: 'error' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'error' });
    }
};

const updateServiceProvider = async (req, res) => {
    try {
        const updatedServiceProviderDetails = req.body;
        const updatedDetails = await serviceProviderModel.findOneAndUpdate(
            { serviceId: updatedServiceProviderDetails.serviceId },
            updatedServiceProviderDetails,
            { new: true }
        );

        if (updatedDetails) {
            res.status(200).json({ msg: 'success', updatedDetails });
        } else {
            res.status(404).json({ msg: 'not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'error', error: err.message });
    }
};

const getBySearch = async (req, res) => {
    try {
        const name = req.body.username;
        const matchres = await serviceProviderModel.find({ username: { $regex: '^' + name + '.*', $options: 'i' } });
        if (matchres) {
            res.status(200).json(matchres);
        } else {
            res.status(404).json({ msg: 'no match found' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'error' });
    }
};

const getSPById = async (req, res) => {
    try {
        const Id = req.body.id;
        const allServiceProviders = await serviceProviderModel.find({ serviceId: Id });
        if (allServiceProviders.length > 0) {
            res.status(200).json(allServiceProviders);
        } else {
            res.status(404).json({ msg: 'No service providers found for this organization.' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Unable to fetch service providers.', error: err.message });
    }
};
const getSPByName = async (req, res) => {
    try {
        const Id = req.body.name;
        const allServiceProviders = await serviceProviderModel.find({ name: Id });
        if (allServiceProviders.length > 0) {
            res.status(200).json(allServiceProviders);
        } else {
            res.status(404).json({ msg: 'No service providers found for this organization.' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Unable to fetch service providers.', error: err.message });
    }
};

module.exports = { getSPByName,getSPById, getServiceProvider, saveServiceProvider, updateServiceProvider, deleteServiceProvider, getBySearch, getByOrgId };