var express = require("express");
authMiddleware = require("../services/middlewares/auth")
expController = require("../controllers/expController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

/**
 * @swagger
 * /experience/list:
 *   get:
 *     summary: List of experience
 *     tags: [Admin, Enduser]
 *     responses:
 *       200:
 *         description: Saved the experience.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                     type: array
 *                     items: 
 *                       type: object
 *                       example:  { "_id": "644773f5550ad256642e28de", "banner": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Experience/1682404432063.JPEG", "desc": "", "isActive": true, "isDeleted": false, "name": "Nature", "createdAt": "2023-04-25T06:32:21.593Z", "updatedAt": "3 days ago", "__v": 0 }
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.get("/list", async (req, res) => {
    try {
        let experiences = await expController.getData(req);
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

router.get("/list/admin", async (req, res) => {
    try {
        let experiences = await expController.getDataByAdmin(req);
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

/**
 * @swagger
 * /experience/detail:
 *   get:
 *     summary: Single experience details
 *     parameters:
 *         -  in: query
 *            name: experienceId
 *            required: true
 *     tags: [Enduser]
 *     responses:
 *       200:
 *         description: Saved the experience.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data: 
 *                     type: object
 *                     example: { "_id": "644773f5550ad256642e28de", "banner": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Experience/1682404432063.JPEG", "desc": "", "isActive": true, "isDeleted": false, "name": "Nature", "createdAt": "2023-04-25T06:32:21.593Z", "updatedAt": "2023-04-25T06:33:53.431Z", "__v": 0 }
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
        let experience = await expController.getExperienceById(req);
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
 * /experience/add:
 *   post:
 *     summary: add experience
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

router.post("/add", authMiddleware, async (req, res) => {
    try {
        let experiences = await expController.addData(req);
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
        let experiences = await expController.updateData(req);
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
        let experiences = await expController.removeData(req);
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
//         let experiences = await expController.banexperience(req);
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
        let image = await expController.imageUpload(req);
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