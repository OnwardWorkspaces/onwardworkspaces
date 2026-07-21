var express = require("express"),
    authMiddleware = require("../services/middlewares/auth"),
    imageGalleryController = require("../controllers/imageGalleryController");

var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Image Gallery
 *   description: Image Gallery APIs
 */

/**
 * Upload Image
 */
router.post("/image_upload", async (req, res) => {
    try {
        let image = await imageGalleryController.imageUpload(req);
        let code = image.statusCode;
        res.status(code).send(image);
    } catch (error) {
        console.log("Error while uploading gallery image", error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            statusCode: 500
        });
    }
});

/**
 * Admin Gallery List
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        let gallery = await imageGalleryController.getDataAdmin(req);
        let code = gallery.statusCode;
        res.status(code).send(gallery);
    } catch (error) {
        console.log("Error while getting gallery list", error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            statusCode: 500
        });
    }
});

/**
 * Public Gallery List
 */
router.get("/list", async (req, res) => {
    try {
        let gallery = await imageGalleryController.getData(req);
        let code = gallery.statusCode;
        res.status(code).send(gallery);
    } catch (error) {
        console.log("Error while getting gallery list", error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            statusCode: 500
        });
    }
});

/**
 * Add Gallery
 */
router.post("/", authMiddleware, async (req, res) => {
    try {
        let gallery = await imageGalleryController.addData(req);
        let code = gallery.statusCode;
        res.status(code).send(gallery);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            statusCode: 500
        });
    }
});

/**
 * Update Gallery
 */
router.put("/", authMiddleware, async (req, res) => {
    try {
        let gallery = await imageGalleryController.updateData(req);
        let code = gallery.statusCode;
        res.status(code).send(gallery);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            statusCode: 500
        });
    }
});

/**
 * Delete Gallery
 */
router.delete("/", authMiddleware, async (req, res) => {
    try {
        let gallery = await imageGalleryController.removeData(req);
        let code = gallery.statusCode;
        res.status(code).send(gallery);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            statusCode: 500
        });
    }
});

module.exports = router;