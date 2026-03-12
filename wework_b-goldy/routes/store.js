var express = require("express");
authMiddleware = require("../services/middlewares/auth")
storeController = require("../controllers/storeController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

/**
 * @swagger
 * /store/list:
 *   get:
 *     summary: List of store
 *     tags: [Admin, Enduser]
 *     responses:
 *       200:
 *         description: Saved the store.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                     type: array
 *                     items: 
 *                       type: object
 *                       example: { "_id": "644b4bc2991acc29e4dd75cd", "banner": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/store/1682656193376.png", "isActive": true, "isDeleted": false, "createdAt": "2023-04-28T04:29:54.560Z", "updatedAt": "2023-04-28T04:29:54.560Z", "__v": 0 }
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.get("/list", async (req, res) => {
    try {
        let stores = await storeController.getData(req);
        let code = stores.statusCode;
        res.status(code).send(stores);
    } catch (error) {
        console.log('error while getting stores', error);
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
//  * /store/delete:
//  *   post:
//  *     summary: delete store 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            store_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the store.
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
        let stores = await storeController.removeData(req);
        let code = stores.statusCode;
        // delete stores.statusCode;
        res.status(code).send(stores);
    } catch (error) {
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
 * /store/status:
 *   put:
 *     summary: update store status
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            storeStatus:
 *              type: string
 *              example: Inactive
 *            store_id:
 *              type: string
 *              example: 62e23feb899fb58ceca99803
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Saved the store.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  error:
 *                     type: string
 *                     example: null
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.put("/status", authMiddleware, async(req, res)=>{
    try {
        let stores = await storeController.banstore(req);
        let code = stores.statusCode;
        // delete stores.statusCode;
        res.status(code).send(stores);
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
        let image = await storeController.imageUpload(req);
        let code = image.statusCode;
        // delete stores.statusCode;
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
        let propertys = await storeController.removeImage(req);
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