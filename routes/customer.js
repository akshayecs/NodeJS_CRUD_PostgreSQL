const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require("../middleware/authorization");
const customerController = require("../controller/customer");



// Apply the verifyTokenAndRole middleware to restrict access to these routes
router.use(verifyTokenAndRole);

router.route("/")
    .post(customerController.createCustomer)
    .get(customerController.getAllCustomer);

router.route("/:id")
    .get(customerController.getCustomerById)
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

router.route("/create-multiple").post(customerController.createMultipleCustomer);

module.exports = router;