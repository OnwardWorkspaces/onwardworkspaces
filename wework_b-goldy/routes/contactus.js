var express = require("express");
authMiddleware = require("../services/middlewares/auth")
contactController = require("../controllers/contactController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */


router.get("/admin", authMiddleware, async (req, res) => {
    try {
        let contacts = await contactController.getDataByAdmin(req);
        let code = contacts.statusCode;
        res.status(code).send(contacts);
    } catch (error) {
        console.log('error while getting contacts', error);
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
        let contacts = await contactController.getData(req);
        let code = contacts.statusCode;
        res.status(code).send(contacts);
    } catch (error) {
        console.log('error while getting contacts', error);
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
        let contacts = await contactController.addData(req);
        let code = contacts.statusCode;
        // delete contacts.statusCode;
        res.status(code).send(contacts);
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
        let image = await contactController.imageUpload(req);
        let code = image.statusCode;
        // delete contacts.statusCode;
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
        let contacts = await contactController.addFormData(req);
        let code = contacts.statusCode;
        // delete contacts.statusCode;
        res.status(code).send(contacts);
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
        let contacts = await contactController.getFormData(req);
        let code = contacts.statusCode;
        // delete contacts.statusCode;
        res.status(code).send(contacts);
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
        let contacts = await contactController.deleteFormData(req);
        let code = contacts.statusCode;
        // delete contacts.statusCode;
        res.status(code).send(contacts);
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