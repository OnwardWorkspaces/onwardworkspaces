var express = require("express");
authMiddleware = require("../services/middlewares/auth")
partnerController = require("../controllers/partnerController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */


router.get("/admin", authMiddleware, async (req, res) => {
    try {
        let partners = await partnerController.getDataByAdmin(req);
        let code = partners.statusCode;
        res.status(code).send(partners);
    } catch (error) {
        console.log('error while getting partners', error);
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
        let partners = await partnerController.getData(req);
        let code = partners.statusCode;
        res.status(code).send(partners);
    } catch (error) {
        console.log('error while getting partners', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        let partners = await partnerController.addData(req);
        let code = partners.statusCode;
        // delete partners.statusCode;
        res.status(code).send(partners);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.post("/image_upload", async (req, res) => {
    try {
        let image = await partnerController.imageUpload(req);
        let code = image.statusCode;
        // delete partners.statusCode;
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
});

router.post("/form", async (req, res) => {
    try {
        let partners = await partnerController.addFormData(req);
        let code = partners.statusCode;
        // delete partners.statusCode;
        res.status(code).send(partners);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.get("/form", authMiddleware, async (req, res) => {
    try {
        let partners = await partnerController.getFormData(req);
        let code = partners.statusCode;
        // delete partners.statusCode;
        res.status(code).send(partners);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.delete("/form", authMiddleware, async (req, res) => {
    try {
        let partners = await partnerController.deleteFormData(req);
        let code = partners.statusCode;
        // delete partners.statusCode;
        res.status(code).send(partners);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})


module.exports = router;