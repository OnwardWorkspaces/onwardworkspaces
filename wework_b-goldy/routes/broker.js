var express = require("express");
authMiddleware = require("./../services/middlewares/auth")
brokerController = require("./../controllers/brokerController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */

router.post("/image_upload", async (req, res) => {
    try {
        let image = await brokerController.imageUpload(req);
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

router.get("/", authMiddleware, async (req, res) => {
    try {
        let users = await brokerController.getDataAdmin(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        console.log('error while getting users', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.post("/", async (req, res) => {
    try {
        let users = await brokerController.addData(req);
        let code = users.statusCode;
        // delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        let users = await brokerController.updateData(req);
        let code = users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
})

router.delete("/", authMiddleware, async (req, res) => {
    try {
        let users = await brokerController.removeData(req);
        let code = users.statusCode;
        // delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
});

router.post("/form_image", authMiddleware, async (req, res) => {
    try {
        let users = await brokerController.updateFormImage(req);
        let code = users.statusCode;
        // delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.get("/form_image", async (req, res) => {
    try {
        let users = await brokerController.getBrokerImage(req);
        let code = users.statusCode;
        // delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

module.exports = router;