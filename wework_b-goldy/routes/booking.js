var express = require("express");
authMiddleware = require("../services/middlewares/auth")
bookingController = require("../controllers/bookingController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

// /**
//  * @swagger
//  * /booking/list:
//  *   get:
//  *     summary: List of experience
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the experience.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  data:
//  *                     type: array
//  *                     items: 
//  *                       type: object
//  *                       example: { "_id": "644b4f4cce392c2bd8b6acca", "banner": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/booking/1682657097531.JPEG", "desc": "<p>zxcvbnm</p>\n", "isActive": true, "isDeleted": false, "name": "India 2", "createdAt": "2023-04-28T04:45:00.085Z", "updatedAt": "21 days ago", "__v": 0 }
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

router.get("/list", async (req, res) => {
    try {
        let experiences = await bookingController.getData(req);
        let code = experiences.statusCode;
        res.status(code).send(experiences);
    } catch (error) {
        console.log('error while getting experiences', error);
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
//  * /booking/detail:
//  *   get:
//  *     summary: single experience details
//  *     parameters:
//  *         -  in: query
//  *            name: bookingId
//  *            required: true
//  *     tags: [Enduser]
//  *     responses:
//  *       200:
//  *         description: Saved the experience.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  experience: 
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

router.get("/detail", async (req, res) => {
    try {
        let experience = await bookingController.getDataById(req);
        let code = experience.statusCode;
        // delete experience.statusCode;
        res.status(code).send(experience);
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
 * /booking/add:
 *   post:
 *     summary: add booking
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            phone:
 *              type: string
 *            hPhone:
 *              type: string
 *            email:
 *              type: string
 *            address:
 *              type: string
 *            dob:
 *              type: string
 *            dietary:
 *              type: string
 *            covid:
 *              type: boolean
 *            isCorrEmail:
 *              type: boolean
 *            isCorrTele:
 *              type: boolean
 *            isCorrPost:
 *              type: boolean
 *            tourId:
 *              type: string
 *            eName:
 *              type: string
 *            eRelation:
 *              type: string
 *            ePhone:
 *              type: string
 *            eHPhone:
 *              type: string
 *            eEmail:
 *              type: string
 *            eAddress:
 *              type: string
 *            insurancePolicyNo:
 *              type: string
 *            eContactNo:
 *              type: string
 *            isSingleRoom:
 *              type: boolean
 *            isFlight:
 *              type: boolean
 *            medication:
 *              type: string
 *     tags: [Enduser]
 *     responses:
 *       200:
 *         description: Saved the experience.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  experience: 
 *                     type: object
 *                     example: {"name":"string","experienceStatus":"string","assignManager":"string","currency":"string","isSalesManager":true,"description":"string","isTokenVerified":true,"attributionMethod":"string","emailAttributionMethod":"string","isVariableExposed":true,"internalNote":"string","isAddressEnabled":true,"address_line_1":"string","address_line_2":"string","city":"string","postalCode":"string","experience":"string","billingFrequency":"string","isPaymentMethod":true,"paymentMethod":"string","taxID":"string","isAutoInvoice":true,"invoiceDate":"string","invoiceGenDelayMethod":"string","invoiceGenDelay":"string","autoInvoiceCreationThre":"string","isDefaultPaymentMethod":true,"defaultPaymentTerms":"string","isInvoiceHideFromAff":true,"platformDetails":"string","platformUrl":"string","platformexperiencename":"string","timezone":"string","accountingEmail":"string","offerIdParam":"string","affiliateId":"string","role":"string","email":"string","mobile":"string","workMobile":"string","language":"string","activationEmail":true,"isPasswordManual":true,"password":"string"}
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.post("/add", async (req, res) => {
    try {
        let experiences = await bookingController.addData(req);
        let code = experiences.statusCode;
        // delete experiences.statusCode;
        res.status(code).send(experiences);
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
//  * /experience/update:
//  *   put:
//  *     summary: update experience
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
//  *     tags: [Endexperience]
//  *     responses:
//  *       200:
//  *         description: Saved the experience.
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
        let experiences = await bookingController.updateData(req);
        let code = experiences.statusCode;
        res.status(code).send(experiences);
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
//  * /experience/delete:
//  *   post:
//  *     summary: delete experience 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            experience_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the experience.
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
        let experiences = await bookingController.removeData(req);
        let code = experiences.statusCode;
        // delete experiences.statusCode;
        res.status(code).send(experiences);
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
//  * /experience/status:
//  *   put:
//  *     summary: update experience status
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            experienceStatus:
//  *              type: string
//  *              example: Inactive
//  *            experience_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the experience.
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
//         let experiences = await bookingController.banexperience(req);
//         let code = experiences.statusCode;
//         // delete experiences.statusCode;
//         res.status(code).send(experiences);
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
        let image = await bookingController.imageUpload(req);
        let code = image.statusCode;
        // delete experiences.statusCode;
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