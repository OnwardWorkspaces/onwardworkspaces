var express = require("express");
authMiddleware = require("../services/middlewares/auth")
tourController = require("../controllers/tourController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

/**
 * @swagger
 * /tour/list:
 *   get:
 *     summary: List of tour
 *     tags: [Admin, Enduser]
 *     responses:
 *       200:
 *         description: Saved the tour.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                     type: array
 *                     items: 
 *                       type: object
 *                       example: {"email":"string0.6114518847485462","name":"string","profile_picture":"","mobile":"string","workMobile":"string","isAdmin":false,"currency":"string","description":"string","internalNote":"string","isAddressEnabled":"true","address_line_1":"string","address_line_2":"string","city":"string","postalCode":"string","tour":"string","billingFrequency":"string","attributionMethod":"string","emailAttributionMethod":"string","paymentMethod":"string","taxID":"string","isAutoInvoice":true,"invoiceDate":"string","invoiceGenDelay":"string","invoiceGenDelayMethod":"string","autoInvoiceCreationThre":"string","defaultPaymentTerms":"string","platformDetails":"string","platformUrl":"string","platformtourname":"string","timezone":"string","accountingEmail":"string","offerIdParam":"string","affiliateId":"string","language":"string","isInvoiceHideFromAff":true,"isTokenVerified":true,"isVariableExposed":true,"isSalesManager":true,"isPaymentMethod":true,"isDefaultPaymentMethod":true,"tourStatus":"string","isEmailVerified":false,"role":"string","isDeleted":false,"_id":"62e25685d2e44d0c8045e7cc","assignManager":"62e134a9b8522d91401c1dc8","createdAt":"2022-07-28T09:27:33.247Z","updatedAt":"2022-07-28T09:27:33.247Z","__v":0}
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.get("/list", async (req, res) => {
    try {
        let tours = await tourController.getData(req);
        let code = tours.statusCode;
        res.status(code).send(tours);
    } catch (error) {
        console.log('error while getting tours', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.post("/group/list", async (req, res) => {
    try {
        let tours = await tourController.getGroupData(req);
        let code = tours.statusCode;
        res.status(code).send(tours);
    } catch (error) {
        console.log('error while getting tours', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.get("/list/admin", async (req, res) => {
    try {
        let tours = await tourController.getDataByAdmin(req);
        let code = tours.statusCode;
        res.status(code).send(tours);
    } catch (error) {
        console.log('error while getting tours', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.get("/list/all", async (req, res) => {
    try {
        let tours = await tourController.getTourNames(req);
        let code = tours.statusCode;
        res.status(code).send(tours);
    } catch (error) {
        console.log('error while getting tours', error);
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
 * /tour/detail:
 *   get:
 *     summary: single tour details
 *     parameters:
 *         -  in: query
 *            name: tourId
 *            required: true
 *     tags: [Enduser]
 *     responses:
 *       200:
 *         description: Saved the tour.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data: 
 *                     type: object
 *                     example: { "_id": "644a06cc47075a34209eaee0", "name": "Tour 1", "imageTitle": "cultural tour", "desc": "<p>asdfghjkl</p>\n", "images": [ "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Tour/1682572998539.png" ], "artistImage": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Tour/1682587454624.png", "artistDesc": "<p>zxcvbnm</p>\n", "isActive": true, "isDeleted": false, "itin": [ { "title": "Day - 1 Taj Mahal", "desc": "<p>1234567890poiuytrewqasdfghjklkmnbvcxz</p>\n", "_id": "644a62d6fd71ed32e4190dcb" } ], "createdAt": "2023-04-27T05:23:24.738Z", "updatedAt": "2023-04-27T11:56:06.027Z", "__v": 0, "artistName": "Maria Maidment", "experienceId": "644773f5550ad256642e28de", "tourPoint": [ { "about": "Based on stay in a twin share Room", "condition": "GBP 2250 per person", "_id": "644a3cdeb4b3d83f54d31ff6" }], "travelDate": [ "15 May - 30 May", "16 Jan - 31 Jan" ], "youtubeUrl": "https://www.youtube.com/watch?v=B8S2jhWwTDg", "highlightDesc": "<p style=\"text-align:justify;\"><span style=\"color: rgb(103,103,103);background-color: rgb(253,253,253);font-size: 16px;font-family: swis721 bt;\">• Visit to Craft Museum</span></p>", "amount": "2950",  "totalDay": 1, "totalReviews": 0 }
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
        let tour = await tourController.getDataById(req);
        let code = tour.statusCode;
        // delete tour.statusCode;
        res.status(code).send(tour);
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
 * /tour/add:
 *   post:
 *     summary: add tour
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
 *         description: Saved the tour.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  tour: 
 *                     type: object
 *                     example: {"name":"string","tourStatus":"string","assignManager":"string","currency":"string","isSalesManager":true,"description":"string","isTokenVerified":true,"attributionMethod":"string","emailAttributionMethod":"string","isVariableExposed":true,"internalNote":"string","isAddressEnabled":true,"address_line_1":"string","address_line_2":"string","city":"string","postalCode":"string","tour":"string","billingFrequency":"string","isPaymentMethod":true,"paymentMethod":"string","taxID":"string","isAutoInvoice":true,"invoiceDate":"string","invoiceGenDelayMethod":"string","invoiceGenDelay":"string","autoInvoiceCreationThre":"string","isDefaultPaymentMethod":true,"defaultPaymentTerms":"string","isInvoiceHideFromAff":true,"platformDetails":"string","platformUrl":"string","platformtourname":"string","timezone":"string","accountingEmail":"string","offerIdParam":"string","affiliateId":"string","role":"string","email":"string","mobile":"string","workMobile":"string","language":"string","activationEmail":true,"isPasswordManual":true,"password":"string"}
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.post("/add", authMiddleware, async (req, res) => {
    try {
        let tours = await tourController.addData(req);
        let code = tours.statusCode;
        // delete tours.statusCode;
        res.status(code).send(tours);
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
//  * /tour/update:
//  *   put:
//  *     summary: update tour
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
//  *     tags: [Endtour]
//  *     responses:
//  *       200:
//  *         description: Saved the tour.
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
        let tours = await tourController.updateData(req);
        let code = tours.statusCode;
        res.status(code).send(tours);
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
//  * /tour/delete:
//  *   post:
//  *     summary: delete tour 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            tour_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the tour.
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
        let tours = await tourController.removeData(req);
        let code = tours.statusCode;
        // delete tours.statusCode;
        res.status(code).send(tours);
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
//  * /tour/status:
//  *   put:
//  *     summary: update tour status
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            tourStatus:
//  *              type: string
//  *              example: Inactive
//  *            tour_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the tour.
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
//         let tours = await tourController.bantour(req);
//         let code = tours.statusCode;
//         // delete tours.statusCode;
//         res.status(code).send(tours);
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
        let image = await tourController.imageUpload(req);
        let code = image.statusCode;
        // delete tours.statusCode;
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

router.post("/pdf_download", async(req, res)=>{
    try{
        let image = await tourController.pdfDownload(req);
        let code = image.statusCode;
        // delete tours.statusCode;
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