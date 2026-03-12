var express = require("express");
authMiddleware = require("./../services/middlewares/auth")
standardController = require("./../controllers/standardController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

// /**
//  * @swagger
//  * /user/list:
//  *   get:
//  *     summary: List of users
//  *     parameters:
//  *         -  in: query
//  *            name: page
//  *            required: false
//  *            description: for pagination
//  *         -  in: query
//  *            name: size
//  *            required: false
//  *            description: for items in a page
//  *         -  in: query
//  *            name: sort
//  *            required: false
//  *            description: for sorting by any column name
//  *         -  in: query
//  *            name: role
//  *            required: false
//  *            description: for list by role
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the user.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  data:
//  *                     type: array
//  *                     items: 
//  *                       type: object
//  *                       example: {"email":"string0.6114518847485462","name":"string","profile_picture":"","mobile":"string","workMobile":"string","isAdmin":false,"currency":"string","description":"string","internalNote":"string","isAddressEnabled":"true","address_line_1":"string","address_line_2":"string","city":"string","postalCode":"string","country":"string","billingFrequency":"string","attributionMethod":"string","emailAttributionMethod":"string","paymentMethod":"string","taxID":"string","isAutoInvoice":true,"invoiceDate":"string","invoiceGenDelay":"string","invoiceGenDelayMethod":"string","autoInvoiceCreationThre":"string","defaultPaymentTerms":"string","platformDetails":"string","platformUrl":"string","platformUsername":"string","timezone":"string","accountingEmail":"string","offerIdParam":"string","affiliateId":"string","language":"string","isInvoiceHideFromAff":true,"isTokenVerified":true,"isVariableExposed":true,"isSalesManager":true,"isPaymentMethod":true,"isDefaultPaymentMethod":true,"userStatus":"string","isEmailVerified":false,"role":"string","isDeleted":false,"_id":"62e25685d2e44d0c8045e7cc","assignManager":"62e134a9b8522d91401c1dc8","createdAt":"2022-07-28T09:27:33.247Z","updatedAt":"2022-07-28T09:27:33.247Z","__v":0}
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

router.post("/image_upload", async (req, res) => {
    try {
        let image = await standardController.imageUpload(req);
        let code = image.statusCode;
        // delete users.statusCode;
        res.status(code).send(image);
    } catch (error) {
        console.log('error while uploading image main', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
})

router.get("/", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.getDataAdmin(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        console.log('error while getting users', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.get("/list", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.getData(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        console.log('error while getting users', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

// router.post("/user", authMiddleware, async (req, res) => {
//     try {
//         let user = await standardController.getUserById(req);
//         let code = user.statusCode;
//         // delete user.statusCode;
//         res.status(code).send(user);
//     } catch (error) {
//         res.status(500).send({
//             message: "FAILED",
//             data: null,
//             error: error,
//             status: 0
//         });
//     }
// })

router.post("/", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.addData(req);
        let code = users.statusCode;
        // delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.updateData(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
})

router.delete("/", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.removeData(req);
        let code = users.statusCode;
        // delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.post("/category", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.addCatData(req);
        let code = users.statusCode;
        // delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.get("/category", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.getCatDataAdmin(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        console.log('error while getting users', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.get("/category/list", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.getCatData(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        console.log('error while getting users', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.put("/category", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.updateCatData(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        console.log('error while getting users', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.delete("/category", authMiddleware, async (req, res) => {
    try {
        let users = await standardController.removeCatData(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        console.log('error while getting users', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

module.exports = router;