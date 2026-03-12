var express = require("express");
authMiddleware = require("../services/middlewares/auth")
affiliController = require("../controllers/affiliController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

// /**
//  * @swagger
//  * /affili/list:
//  *   get:
//  *     summary: List of affili
//  *     tags: [Admin, Enduser]
//  *     responses:
//  *       200:
//  *         description: Saved the affili.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  data:
//  *                     type: array
//  *                     items: 
//  *                       type: object
//  *                       example: { "_id": "644788665466301ac091f79e", "image": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Affili/1682409573877.png", "isActive": true, "isDeleted": false, "createdAt": "2023-04-25T07:59:34.398Z", "updatedAt": "2023-04-25T07:59:34.398Z", "__v": 0 }
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */

router.get("/list", async (req, res) => {
    try {
        let affilis = await affiliController.getData(req);
        let code = affilis.statusCode;
        res.status(code).send(affilis);
    } catch (error) {
        console.log('error while getting affilis', error);
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
//  * /affili/delete:
//  *   post:
//  *     summary: delete affili 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            affili_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the affili.
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
        let affilis = await affiliController.removeData(req);
        let code = affilis.statusCode;
        // delete affilis.statusCode;
        res.status(code).send(affilis);
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
//  * /affili/status:
//  *   put:
//  *     summary: update affili status
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            affiliStatus:
//  *              type: string
//  *              example: Inactive
//  *            affili_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the affili.
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

router.put("/status", authMiddleware, async(req, res)=>{
    try {
        let affilis = await affiliController.banaffili(req);
        let code = affilis.statusCode;
        // delete affilis.statusCode;
        res.status(code).send(affilis);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
})

router.post("/image_upload", async(req, res)=>{
    try{
        let image = await affiliController.imageUpload(req);
        let code = image.statusCode;
        // delete affilis.statusCode;
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
});

router.post("/remove_banner", authMiddleware, async (req, res) => {
    try {
        let propertys = await affiliController.removeImage(req);
        let code = propertys.statusCode;
        // delete propertys.statusCode;
        res.status(code).send(propertys);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});


module.exports = router;