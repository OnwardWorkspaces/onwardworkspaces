var express = require("express");
authMiddleware = require("../services/middlewares/auth")
homeController = require("../controllers/homeController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

// /**
//  * @swagger
//  * /home:
//  *   get:
//  *     summary: get home meta data
//  *     tags: [Admin, Enduser]
//  *     responses:
//  *       200:
//  *         description: Saved the home.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  data:
//  *                     type: object
//  *                     example: { "_id": "644761ff6de0536144c8e583", "subTitle": "Creative Cultural Tours", "image": "https://aahilyaholidays.com/images/about-India/banner_8.jpg", "color": "#ffffff", "isDeleted": false, "title": "Aahilya Holidays", "createdAt": "2023-04-25T05:15:43.959Z", "updatedAt": "2023-04-28T06:39:40.124Z", "__v": 0}
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

router.get("/header", async (req, res) => {
    try {
        let homes = await homeController.headerData(req);
        let code = homes.statusCode;
        res.status(code).send(homes);
    } catch (error) {
        console.log('error while getting homes', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.get("/admin", authMiddleware, async (req, res) => {
    try {
        let homes = await homeController.getHomeByAdmin(req);
        let code = homes.statusCode;
        res.status(code).send(homes);
    } catch (error) {
        console.log('error while getting homes', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.get("/", async (req, res) => {
    try {
        let homes = await homeController.homeData(req);
        if (homes?.data?.home?.form?.[0]?.field) {
            homes.data.home.form[0].field = homes.data.home.form[0].field.filter(
                (field) => field.title !== 'Message' && field.title !== 'Email'
            );
        }
        let code = homes.statusCode;
        res.status(code).send(homes);
    } catch (error) {
        console.log('error while getting homes', error);
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
//  * /home/home:
//  *   post:
//  *     summary: single home details
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            home_id:
//  *              type: string
//  *     tags: [Endhome]
//  *     responses:
//  *       200:
//  *         description: Saved the home.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  home: 
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

// router.post("/home", authMiddleware, async (req, res) => {
//     try {
//         let home = await homeController.gethomeById(req);
//         let code = home.statusCode;
//         // delete home.statusCode;
//         res.status(code).send(home);
//     } catch (error) {
//         res.status(500).send({
//             message: "FAILED",
//             data: null,
//             error: error,
//             status: 0
//         });
//     }
// })

/**
 * @swagger
 * /home/add:
 *   post:
 *     summary: add home
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            subTitle:
 *              type: string
 *            image:
 *              type: string
 *              example: 62e134a9b8522d91401c1dc8
 *            color:
 *              type: string
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Saved the home.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  home: 
 *                     type: object
 *                     example: {"name":"string","homeStatus":"string","assignManager":"string","currency":"string","isSalesManager":true,"description":"string","isTokenVerified":true,"attributionMethod":"string","emailAttributionMethod":"string","isVariableExposed":true,"internalNote":"string","isAddressEnabled":true,"address_line_1":"string","address_line_2":"string","city":"string","postalCode":"string","country":"string","billingFrequency":"string","isPaymentMethod":true,"paymentMethod":"string","taxID":"string","isAutoInvoice":true,"invoiceDate":"string","invoiceGenDelayMethod":"string","invoiceGenDelay":"string","autoInvoiceCreationThre":"string","isDefaultPaymentMethod":true,"defaultPaymentTerms":"string","isInvoiceHideFromAff":true,"platformDetails":"string","platformUrl":"string","platformhomename":"string","timezone":"string","accountingEmail":"string","offerIdParam":"string","affiliateId":"string","role":"string","email":"string","mobile":"string","workMobile":"string","language":"string","activationEmail":true,"isPasswordManual":true,"password":"string"}
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.post("/add", authMiddleware, async (req, res) => {
    try {
        let homes = await homeController.addData(req);
        let code = homes.statusCode;
        // delete homes.statusCode;
        res.status(code).send(homes);
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
//  * /home/update:
//  *   put:
//  *     summary: update home
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
//  *     tags: [Endhome]
//  *     responses:
//  *       200:
//  *         description: Saved the home.
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
        let homes = await homeController.updateData(req);
        let code = homes.statusCode;
        res.status(code).send(homes);
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
//  * /home/delete:
//  *   post:
//  *     summary: delete home 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            home_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the home.
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

// router.post("/delete", authMiddleware, async (req, res) => {
//     try {
//         let homes = await homeController.removehome(req);
//         let code = homes.statusCode;
//         // delete homes.statusCode;
//         res.status(code).send(homes);
//     } catch (error) {
//         res.status(500).send({
//             message: "FAILED",
//             data: null,
//             error: error,
//             status: 500
//         });
//     }
// });

// /**
//  * @swagger
//  * /home/status:
//  *   put:
//  *     summary: update home status
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            homeStatus:
//  *              type: string
//  *              example: Inactive
//  *            home_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the home.
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
//         let homes = await homeController.banhome(req);
//         let code = homes.statusCode;
//         // delete homes.statusCode;
//         res.status(code).send(homes);
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
        let image = await homeController.imageUpload(req);
        let code = image.statusCode;
        // delete homes.statusCode;
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