const Joi = require("joi")

const { handleCreateCustomer,
    handleGetAllCustomer,
    handleGetCustomerById,
    handleCreateMultipleCustomer,
    handleGetCityAndCustomersCount,
    handleUpdateCustomer,
    handleDeleteCustomer
} = require('../services/customer')

const createCustomer = async (req, res) => {
    try {
        const validateSchema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            city: Joi.string().required(),
            company: Joi.string().required()
        });

        const validate = validateSchema.validate(req.body);

        if (validate.error) {
            return res.status(400).send({ message: 'Invalid Argument' });
        }

        const args = {
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                city: req.body.city,
                company: req.body.company
            },
            role:req.userInfo.role,
            dbClient: req.dbClient
        }
        const response = await handleCreateCustomer(args);
        // return res.status(response.status).send({message:response.message,data:response.data})
        return res.send({ status: response.status, message: response.message, data: response.data });

    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error" })
    }
}

const getAllCustomer = async (req, res) => {
    try {
        const validateSchema = Joi.object({
            search_text: Joi.string().allow(null),
            skip: Joi.number().required(),
            take: Joi.number().required()
        });

        const validate = validateSchema.validate(req.body);

        if (validate.error) {
            return res.status(400).send({ message: 'Invalid Argument' });
        }

        const args = {
            data: {
                search_text: req.body.search_text,
                skip: req.body.skip,
                take: req.body.take
            },
            role:req.userInfo.role,
            dbClient: req.dbClient
        }

        const response = await handleGetAllCustomer(args);

        return res.send({ status: response.status, message: response.message, data: response.data });

    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error" })
    }
}

const getCustomerById = async (req, res) => {
    try {
        req.body.customer_id = req.params.id;

        const validateSchema = Joi.object({
            customer_id: Joi.string().uuid().required()
        });

        const validate = validateSchema.validate(req.body);

        if (validate.error) {
            return res.status(400).send({ message: 'Invalid Argument' });
        }

        const args = {
            data: {
                customer_id: req.body.customer_id
            },
            role:req.userInfo.role,
            dbClient: req.dbClient
        }

        const response = await handleGetCustomerById(args);

        return res.send({ status: response.status, message: response.message, data: response.data });
    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error" })
    }
}

const createMultipleCustomer = async (req, res) => {
    try {

        const payloadSchema = Joi.object({
            customerArray: Joi.array().items(
                Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    city: Joi.string().required(),
                    company: Joi.string().required()
                })
            )
        });

        const validate = payloadSchema.validate(req.body);

        if (validate.error) {
            return res.status(400).send({ message: 'Invalid Argument' });
        }

        const args = {
            data: {
                customers: req.body.customerArray
            },
            role:req.userInfo.role,
            dbClient: req.dbClient
        }

        const response = await handleCreateMultipleCustomer(args);
        // return res.status(response.status).send({message:response.message,data:response.data})
        return res.send({ status: response.status, message: response.message, data: response.data });

    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error" })
    }
}


const updateCustomer = async (req, res) => {
    try {
        req.body.customer_id = req.params.id;

        const validateSchema = Joi.object({
            customer_id: Joi.string().uuid().required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            city: Joi.string().required(),
            company: Joi.string().required()
        });

        const validate = validateSchema.validate(req.body);

        if (validate.error) {
            return res.status(400).send({ message: 'Invalid Argument' });
        }

        const args = {
            data: {
                customer_id: req.body.customer_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                city: req.body.city,
                company: req.body.company
            },
            role:req.userInfo.role,
            dbClient: req.dbClient
        }
        const response = await handleUpdateCustomer(args);

        return res.send({ status: response.status, message: response.message, data: response.data });
    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error" })
    }
}

const deleteCustomer = async (req, res) => {
    try {
        req.body.customer_id = req.params.id;

        const validateSchema = Joi.object({
            customer_id: Joi.string().uuid().required()
        });

        const validate = validateSchema.validate(req.body);

        if (validate.error) {
            return res.status(400).send({ message: 'Invalid Argument' });
        }

        const args = {
            data: {
                customer_id: req.body.customer_id
            },
            role:req.userInfo.role,
            dbClient: req.dbClient
        }
        const response = await handleDeleteCustomer(args);

        return res.send({ status: response.status, message: response.message, data: response.data });
    } catch (error) {
        return res.status(400).send({ message: "Internal Server Error" })
    }
}
module.exports = {
    createCustomer,
    getAllCustomer,
    getCustomerById,
    createMultipleCustomer,
    updateCustomer,
    deleteCustomer
}