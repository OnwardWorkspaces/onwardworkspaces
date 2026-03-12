var express = require("express");
authMiddleware = require("../services/middlewares/auth")
destiController = require("../controllers/destiController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

/**
 * @swagger
 * /destination/list:
 *   get:
 *     summary: List of destination
 *     tags: [Admin, Enduser]
 *     responses:
 *       200:
 *         description: Saved the destination.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                     type: array
 *                     items: 
 *                       type: object
 *                       example:  { "_id": "6449025d0e939d3fbc9ac86f", "name": "India", "imageTitle": "cultural tour", "desc": "<p>1234567890</p>\n", "images": [ "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Destination/1682506328456.png", "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Destination/1682507393636.png" ], "isActive": true, "isDeleted": false, "tag": [ { "tagName": "About the Artist", "image": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Destination/1682506328776.png", "desc": "<p>mnbvcxz</p>\n", "_id": "644906ab0e939d3fbc9ac886" }, { "tagName": "About the Culture", "image": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Destination/1682507432951.png", "desc": "<p>mnbvcxz</p>\n", "_id": "644906ab0e939d3fbc9ac887" } ], "faq": [ { "question": "How to book?", "answer": "Call at number", "_id": "6449025d0e939d3fbc9ac871" } ], "createdAt": "2023-04-26T10:52:13.778Z", "updatedAt": "2 days ago", "__v": 0 }
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.get("/list", async (req, res) => {
    try {
        let destinations = await destiController.getData(req);
        let code = destinations.statusCode;
        res.status(code).send(destinations);
    } catch (error) {
        console.log('error while getting destinations', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

/**
 * @swagger
 * /destination/detail:
 *   get:
 *     summary: single destination details
 *     parameters:
 *         -  in: query
 *            name: destinationId
 *            required: true
 *     tags: [Enduser]
 *     responses:
 *       200:
 *         description: Saved the destination.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  destination: 
 *                     type: object
 *                     example: {"_id":"636a07005eb11a76b83c05df","profile_picture":"","address":"","postalCode":"","isEmailVerified":true,"isDeleted":false,"role":"Admin","name":"preeti sanger","email":"preetisanger0222@gmail.com","mobile":"8010160222","createdAt":"2022-11-08T07:36:32.349Z","updatedAt":"2022-11-08T07:36:32.349Z","__v":0,"companyId":"636c7ba4e4a7fb84d41735a9","company":{"_id":"636c7ba4e4a7fb84d41735a9","compId":"lv_0001","profile_picture":"","address":"Vyapar Kendra, Palam Vihar","intro":"We are a digital web agency that works round the clock to impart next gen ideas to our clients. The sound of a new brief is like music to our eyes and through a well-defined strategy.","endpoint":"rajmith","website":"https://www.rajmith.com/","isDeleted":false,"name":"Rajmith","email":"info@rajmith.com","addedBy":"636a07005eb11a76b83c05df","createdAt":"2022-11-10T04:18:44.348Z","updatedAt":"2022-12-05T08:03:56.905Z","__v":0,"theme":"#002699","cover":"","facebook":"https://www.facebook.com/rajmithindia","linkedin":"https://www.linkedin.com/company/rajmithindia/","instagram":"https://www.instagram.com/rajmithwebagency/","expectedLead":100},"project":[{"_id":"638d7ec7767bfb61d086de2a","assignType":"auto","profile_picture":"","address":"Shamli","intro":"Need to create a new mobile App regarding Car Washing.","attachment":"","isDeleted":false,"dealers":["638d7ebf767bfb61d086de23","638db96414ed476234dff7d6"],"name":"Develop an app","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:16:55.662Z","updatedAt":"2022-12-05T05:16:55.662Z","__v":0,"lastAssign":"638d7ebf767bfb61d086de23"}],"moderator":[{"_id":"638d8376767bfb61d086de4b","profile_picture":"","address":"Gurugram","postalCode":"","isEmailVerified":false,"isDeleted":false,"role":"Moderator","priority":0,"otp":6233,"name":"Akash Mehta","email":"akash@gmail.com","mobile":"7500063621","password":"$argon2i$v=19$m=4096,t=3,p=1$yiEunlUzM++p1sLmrtG/Dw$SlsriB1opZotTc2DvKW88j6juR42+pYr/w9lDIANIGM","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:36:54.993Z","updatedAt":"2022-12-05T05:36:54.993Z","__v":0}],"dealer":[{"_id":"638d7ebf767bfb61d086de23","profile_picture":"","address":"Arthala Road, Shrinashan Pg","postalCode":"","isEmailVerified":true,"isDeleted":false,"role":"Dealer","priority":0,"otp":8988,"name":"Abhisek Goldy","email":"abhisekgoldy14@gmail.com","mobile":"7500063621","password":"$argon2i$v=19$m=4096,t=3,p=1$OwmyuUmPqQKnWRrtIDmQNg$9HacdJkhILbwh2nu89hwlWWB8wHIKUwLr2xWlobKbjk","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:16:47.275Z","updatedAt":"2022-12-05T05:16:55.716Z","__v":0,"projectId":"638d7ec7767bfb61d086de2a"}]}
 *                  error:
 *                     type: string
 *                     example: null
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.get("/detail", async (req, res) => {
    try {
        let destination = await destiController.getDetailById(req);
        let code = destination.statusCode;
        // delete destination.statusCode;
        res.status(code).send(destination);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})

/**
 * @swagger
 * /destination/add:
 *   post:
 *     summary: add destination
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            banner:
 *              type: string
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Saved the destination.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  destination: 
 *                     type: object
 *                     example: {"name":"string","destinationStatus":"string","assignManager":"string","currency":"string","isSalesManager":true,"description":"string","isTokenVerified":true,"attributionMethod":"string","emailAttributionMethod":"string","isVariableExposed":true,"internalNote":"string","isAddressEnabled":true,"address_line_1":"string","address_line_2":"string","city":"string","postalCode":"string","destination":"string","billingFrequency":"string","isPaymentMethod":true,"paymentMethod":"string","taxID":"string","isAutoInvoice":true,"invoiceDate":"string","invoiceGenDelayMethod":"string","invoiceGenDelay":"string","autoInvoiceCreationThre":"string","isDefaultPaymentMethod":true,"defaultPaymentTerms":"string","isInvoiceHideFromAff":true,"platformDetails":"string","platformUrl":"string","platformdestinationname":"string","timezone":"string","accountingEmail":"string","offerIdParam":"string","affiliateId":"string","role":"string","email":"string","mobile":"string","workMobile":"string","language":"string","activationEmail":true,"isPasswordManual":true,"password":"string"}
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.post("/add", authMiddleware, async (req, res) => {
    try {
        let destinations = await destiController.addData(req);
        let code = destinations.statusCode;
        // delete destinations.statusCode;
        res.status(code).send(destinations);
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
//  * /destination/update:
//  *   put:
//  *     summary: update destination
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
//  *     tags: [Enddestination]
//  *     responses:
//  *       200:
//  *         description: Saved the destination.
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

router.put("/update", authMiddleware, async (req, res) => {
    try {
        let destinations = await destiController.updateData(req);
        let code = destinations.statusCode;
        res.status(code).send(destinations);
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
//  * /destination/delete:
//  *   post:
//  *     summary: delete destination 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            destination_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the destination.
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

router.post("/delete", authMiddleware, async (req, res) => {
    try {
        let destinations = await destiController.removeData(req);
        let code = destinations.statusCode;
        // delete destinations.statusCode;
        res.status(code).send(destinations);
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
//  * /destination/status:
//  *   put:
//  *     summary: update destination status
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            destinationStatus:
//  *              type: string
//  *              example: Inactive
//  *            destination_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the destination.
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
//         let destinations = await destiController.bandestination(req);
//         let code = destinations.statusCode;
//         // delete destinations.statusCode;
//         res.status(code).send(destinations);
//     } catch (error) {
//         res.status(500).send({
//             message: "FAILED",
//             data: null,
//             error: error,
//             status: 500
//         });
//     }
// })

router.post("/image_upload", async (req, res) => {
    try {
        let image = await destiController.imageUpload(req);
        let code = image.statusCode;
        // delete destinations.statusCode;
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


module.exports = router;