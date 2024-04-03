const { response, query } = require('express');
const { Pool } = require('pg')
const pool = new Pool({
    user: '***',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: 5432,
    max:20,
    idleTimeoutMillis:30000,
});

const handleCreateCustomer = async(args) => {
    const {dbClient} = args;
    try {
        const {first_name,last_name,city,company} = args.data;

        const {rows:customerData} = await dbClient.query(
            `INSERT INTO customer(first_name,last_name,city,company) VALUES($1,$2,$3,$4) RETURNING *`,
            [first_name,last_name,city,company]
        );

        console.log(">>>>>>>>>>customerData",customerData);
            let responseData = {
                status:200,
                message:"customer added successfully",
                data:customerData[0],
            }
        return responseData
    } catch (error) {
        return {status:400,mesage:"internal Server Error",data:null}
    } finally {
        await dbClient.release();
    }
}

const handleGetAllCustomer = async(args) => {
    const {dbClient} = args;
    try {
        const {search_text,skip,take} = args.data;

        let params = [skip,take]
        let searchQuery = '';
        if(search_text){
            params.push(`%${search_text}%`);
            searchQuery +=` WHERE first_name ILIKE $3
                                     OR last_name ILIKE $3
                                     OR city ILIKE $3`

        }

        const query = `SELECT * FROM customer${searchQuery} OFFSET $1 LIMIT $2`;    
        
        const {rows:customerData} = await dbClient.query(query,params);

        if(!customerData.length){
            return {status:404,message:"No Data Found",data:null}
        }

        return {status:200,message:"success",data:customerData}
    } catch (error) {
        return {status:400,mesage:"internal Server Error",data:null}
    } finally {
        await dbClient.release();
    }
}

const handleGetCustomerById = async(args) => {
    const {dbClient} = args;
    try {
        const {customer_id} = args.data;

        const {rows:customerData} = await dbClient.query(
                `select * from customer where customer_id = $1`,[customer_id]
        );

        if(!customerData.length){
            return {status:404,message:"No Data Found",data:null}
        }

        return {status:200,message:"success",data:customerData[0]}
    } catch (error) {
        return {status:400,mesage:"internal Server Error",data:null}
    } finally {
        await dbClient.release();
    }
}
const handleCreateMultipleCustomer = async(args) => {
    const {dbClient} = args;
    try {
        const {customers} = args.data;

        let insertedCustomers = [];

        await dbClient.query('BEGIN');

        for (const customer of customers) {
            const { rows } = await dbClient.query(
                `INSERT INTO customer (first_name, last_name, city, company) VALUES ($1, $2, $3, $4) RETURNING *`,
                [customer.first_name, customer.last_name, customer.city, customer.company]
            );
            insertedCustomers.push(...rows);
        }

        await dbClient.query('COMMIT');

        return {status:200,message:"success",data:insertedCustomers}
    } catch (error) {
        return {status:400,mesage:"internal Server Error",data:null}
    } finally {
        await dbClient.release();
    }
}

const handleUpdateCustomer = async(args) => {
    const {dbClient} = args;
    try {
        const {customer_id,first_name,last_name,city,company} = args.data;

        const {rows:checkIfCustomerExist} = await dbClient.query(
            `SELECT * FROM customer WHERE customer_id= $1`,
            [customer_id]
        );

        if(!checkIfCustomerExist.length){
            return {status:404,message:"Customer Not Found against this Customer ID",data:null}
        }

        const {rows:updateCustomerData} = await dbClient.query(
            `UPDATE customer SET first_name=$1, last_name=$2, city=$3, company=$4 WHERE customer_id=$5 RETURNING *`,
            [first_name, last_name, city, company, customer_id]
        );

        if(!updateCustomerData.length){
            return {status:404,message:"Something Went Wrong!",data:null}
        }

        return {status:200,message:"success",data:updateCustomerData[0]}
    } catch (error) {
        return {status:400,mesage:"internal Server Error",data:null}
    } finally {
        await dbClient.release();
    }
}
const handleDeleteCustomer = async (args) => {
    const {dbClient} = args;
    try {
        const { customer_id,is_authorized } = args.data;

        if(!is_authorized){
            return { status: 401, message: "You are Unauthorized to act this!", data: null };
        }

        const { rowCount } = await dbClient.query(
            `DELETE FROM customer WHERE customer_id = $1`,
            [customer_id]
        );

        if (rowCount === 0) {
            return { status: 404, message: "Customer Not Found against this Customer ID", data: null };
        }

        return { status: 200, message: "Customer deleted successfully", data: null };
    } catch (error) {
        return { status: 500, message: "Internal Server Error", data: null };
    } finally {
        await dbClient.release();
    }
}

module.exports = {
    handleCreateCustomer,
    handleGetAllCustomer,
    handleGetCustomerById,
    handleCreateMultipleCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer
}