var express = require("express");
authMiddleware = require("./../services/middlewares/auth")
amenityController = require("./../controllers/amenityController");

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

router.get("/", authMiddleware, async (req, res) => {
    try {
        let users = await amenityController.getDataAdmin(req);
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
        let users = await amenityController.getData(req);
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

// /**
//  * @swagger
//  * /user/user:
//  *   post:
//  *     summary: single user details
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            user_id:
//  *              type: string
//  *     tags: [Enduser]
//  *     responses:
//  *       200:
//  *         description: Saved the user.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  user: 
//  *                     type: object
//  *                     example: {"_id":"636a07005eb11a76b83c05df","profile_picture":"","address":"","postalCode":"","isEmailVerified":true,"isDeleted":false,"role":"Admin","name":"preeti sanger","email":"preetisanger0222@gmail.com","mobile":"8010160222","createdAt":"2022-11-08T07:36:32.349Z","updatedAt":"2022-11-08T07:36:32.349Z","__v":0,"companyId":"636c7ba4e4a7fb84d41735a9","company":{"_id":"636c7ba4e4a7fb84d41735a9","compId":"lv_0001","profile_picture":"","address":"Vyapar Kendra, Palam Vihar","intro":"We are a digital web agency that works round the clock to impart next gen ideas to our clients. The sound of a new brief is like music to our eyes and through a well-defined strategy.","endpoint":"rajmith","website":"https://www.rajmith.com/","isDeleted":false,"name":"Rajmith","email":"info@rajmith.com","addedBy":"636a07005eb11a76b83c05df","createdAt":"2022-11-10T04:18:44.348Z","updatedAt":"2022-12-05T08:03:56.905Z","__v":0,"theme":"#002699","cover":"","facebook":"https://www.facebook.com/rajmithindia","linkedin":"https://www.linkedin.com/company/rajmithindia/","instagram":"https://www.instagram.com/rajmithwebagency/","expectedLead":100},"project":[{"_id":"638d7ec7767bfb61d086de2a","assignType":"auto","profile_picture":"","address":"Shamli","intro":"Need to create a new mobile App regarding Car Washing.","attachment":"","isDeleted":false,"dealers":["638d7ebf767bfb61d086de23","638db96414ed476234dff7d6"],"name":"Develop an app","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:16:55.662Z","updatedAt":"2022-12-05T05:16:55.662Z","__v":0,"lastAssign":"638d7ebf767bfb61d086de23"}],"moderator":[{"_id":"638d8376767bfb61d086de4b","profile_picture":"","address":"Gurugram","postalCode":"","isEmailVerified":false,"isDeleted":false,"role":"Moderator","priority":0,"otp":6233,"name":"Akash Mehta","email":"akash@gmail.com","mobile":"7500063621","password":"$argon2i$v=19$m=4096,t=3,p=1$yiEunlUzM++p1sLmrtG/Dw$SlsriB1opZotTc2DvKW88j6juR42+pYr/w9lDIANIGM","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:36:54.993Z","updatedAt":"2022-12-05T05:36:54.993Z","__v":0}],"dealer":[{"_id":"638d7ebf767bfb61d086de23","profile_picture":"","address":"Arthala Road, Shrinashan Pg","postalCode":"","isEmailVerified":true,"isDeleted":false,"role":"Dealer","priority":0,"otp":8988,"name":"Abhisek Goldy","email":"abhisekgoldy14@gmail.com","mobile":"7500063621","password":"$argon2i$v=19$m=4096,t=3,p=1$OwmyuUmPqQKnWRrtIDmQNg$9HacdJkhILbwh2nu89hwlWWB8wHIKUwLr2xWlobKbjk","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:16:47.275Z","updatedAt":"2022-12-05T05:16:55.716Z","__v":0,"projectId":"638d7ec7767bfb61d086de2a"}]}
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

// router.post("/user", authMiddleware, async (req, res) => {
//     try {
//         let user = await amenityController.getUserById(req);
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

// /**
//  * @swagger
//  * /user/add:
//  *   post:
//  *     summary: add user
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            name:
//  *              type: string
//  *            userStatus:
//  *              type: string
//  *            assignManager:
//  *              type: string
//  *              example: 62e134a9b8522d91401c1dc8
//  *            currency:
//  *              type: string
//  *            isSalesManager:
//  *              type: boolean
//  *            description:
//  *              type: string
//  *            isTokenVerified:
//  *              type: boolean
//  *            attributionMethod:
//  *              type: string
//  *            emailAttributionMethod:
//  *              type: string
//  *            isVariableExposed:
//  *              type: boolean
//  *            internalNote:
//  *              type: string
//  *            isAddressEnabled:
//  *              type: boolean
//  *            address_line_1:
//  *              type: string
//  *            address_line_2:
//  *              type: string
//  *            city:
//  *              type: string
//  *            postalCode:
//  *              type: string
//  *            country:
//  *              type: string
//  *            billingFrequency:
//  *              type: string
//  *            isPaymentMethod:
//  *              type: boolean
//  *            paymentMethod:
//  *              type: string
//  *            taxID:
//  *              type: string
//  *            isAutoInvoice:
//  *              type: boolean
//  *            invoiceDate:
//  *              type: string
//  *            invoiceGenDelayMethod:
//  *              type: string
//  *            invoiceGenDelay:
//  *              type: string
//  *            autoInvoiceCreationThre:
//  *              type: string
//  *            isDefaultPaymentMethod:
//  *              type: boolean
//  *            defaultPaymentTerms:
//  *              type: string
//  *            isInvoiceHideFromAff:
//  *              type: boolean
//  *            platformDetails:
//  *              type: string
//  *            platformUrl:
//  *              type: string
//  *            platformUsername:
//  *              type: string
//  *            timezone:
//  *              type: string
//  *            accountingEmail:
//  *              type: string
//  *            offerIdParam:
//  *              type: string
//  *            affiliateId:
//  *              type: string
//  *            role:
//  *              type: string
//  *            email:
//  *              type: string
//  *            mobile:
//  *              type: string
//  *            workMobile:
//  *              type: string
//  *            language:
//  *              type: string
//  *            activationEmail:
//  *              type: boolean
//  *            isPasswordManual:
//  *              type: boolean
//  *            password:
//  *              type: string
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the user.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  user: 
//  *                     type: object
//  *                     example: {"name":"string","userStatus":"string","assignManager":"string","currency":"string","isSalesManager":true,"description":"string","isTokenVerified":true,"attributionMethod":"string","emailAttributionMethod":"string","isVariableExposed":true,"internalNote":"string","isAddressEnabled":true,"address_line_1":"string","address_line_2":"string","city":"string","postalCode":"string","country":"string","billingFrequency":"string","isPaymentMethod":true,"paymentMethod":"string","taxID":"string","isAutoInvoice":true,"invoiceDate":"string","invoiceGenDelayMethod":"string","invoiceGenDelay":"string","autoInvoiceCreationThre":"string","isDefaultPaymentMethod":true,"defaultPaymentTerms":"string","isInvoiceHideFromAff":true,"platformDetails":"string","platformUrl":"string","platformUsername":"string","timezone":"string","accountingEmail":"string","offerIdParam":"string","affiliateId":"string","role":"string","email":"string","mobile":"string","workMobile":"string","language":"string","activationEmail":true,"isPasswordManual":true,"password":"string"}
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

router.post("/", authMiddleware, async (req, res) => {
    try {
        let users = await amenityController.addData(req);
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

// /**
//  * @swagger
//  * /user/update:
//  *   put:
//  *     summary: update user
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            name:
//  *              type: string
//  *            profile_picture:
//  *              type: string
//  *            mobile:
//  *              type: string
//  *            email:
//  *              type: string
//  *            lang:
//  *              type: string
//  *     tags: [Enduser]
//  *     responses:
//  *       200:
//  *         description: Saved the user.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  data: 
//  *                     type: object
//  *                     example: { "n": 1, "electionId": "7fffffff00000000000000ee", "opTime": { "ts": "7173572218796900353", "t": 238 }, "nModified": 1, "ok": 1, "$clusterTime": { "clusterTime": "7173572218796900353", "signature": { "hash": "fHXLWw/xzykyDWfPAFpyWophNIM=", "keyId": "7112512455456063494" }}, "operationTime": "7173572218796900353" }
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

router.put("/", authMiddleware, async (req, res) => {
    try {
        let users = await amenityController.updateData(req);
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

// /**
//  * @swagger
//  * /user/delete:
//  *   post:
//  *     summary: delete user 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            user_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the user.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

router.delete("/", authMiddleware, async (req, res) => {
    try {
        let users = await amenityController.removeData(req);
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

// /**
//  * @swagger
//  * /user/status:
//  *   put:
//  *     summary: update user status
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            userStatus:
//  *              type: string
//  *              example: Inactive
//  *            user_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the user.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

// router.put("/status", authMiddleware, async(req, res)=>{
//     try {
//         let users = await amenityController.banUser(req);
//         let code = users.statusCode;
//         // delete users.statusCode;
//         res.status(code).send(users);
//     } catch (error) {
//         res.status(500).send({
//             message: "FAILED",
//             data: null,
//             error: error,
//             status: 500
//         });
//     }
// })

router.post("/image_upload", async(req, res)=>{
    try{
        let image = await amenityController.imageUpload(req);
        let code = image.statusCode;
        // delete users.statusCode;
        res.status(code).send(image);
    }catch (error) {
        console.log('error while uploading image main', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
})


module.exports = router;