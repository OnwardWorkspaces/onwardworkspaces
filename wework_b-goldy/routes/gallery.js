var express = require("express");
authMiddleware = require("../services/middlewares/auth")
galleryController = require("../controllers/galleryController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

/**
 * @swagger
 * /gallery/list:
 *   get:
 *     summary: List of gallery
 *     tags: [Admin, Enduser]
 *     responses:
 *       200:
 *         description: Saved the gallery.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                     type: array
 *                     items: 
 *                       type: object
 *                       example: { "_id": "644b4bc2991acc29e4dd75cd", "banner": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Gallery/1682656193376.png", "isActive": true, "isDeleted": false, "createdAt": "2023-04-28T04:29:54.560Z", "updatedAt": "2023-04-28T04:29:54.560Z", "__v": 0 }
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/

router.get("/list", async (req, res) => {
    try {
        let gallerys = await galleryController.getData(req);
        let code = gallerys.statusCode;
        res.status(code).send(gallerys);
    } catch (error) {
        console.log('error while getting gallerys', error);
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
//  * /gallery/delete:
//  *   post:
//  *     summary: delete gallery 
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            gallery_id:
//  *              type: string
//  *              example: 62e23feb899fb58ceca99803
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Saved the gallery.
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
        let gallerys = await galleryController.removeData(req);
        let code = gallerys.statusCode;
        // delete gallerys.statusCode;
        res.status(code).send(gallerys);
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
 * /gallery/status:
 *   put:
 *     summary: update gallery status
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            galleryStatus:
 *              type: string
 *              example: Inactive
 *            gallery_id:
 *              type: string
 *              example: 62e23feb899fb58ceca99803
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Saved the gallery.
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
        let gallerys = await galleryController.bangallery(req);
        let code = gallerys.statusCode;
        // delete gallerys.statusCode;
        res.status(code).send(gallerys);
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
        let image = await galleryController.imageUpload(req);
        let code = image.statusCode;
        // delete gallerys.statusCode;
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
        let propertys = await galleryController.removeImage(req);
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