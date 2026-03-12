var express = require("express");
authMiddleware = require("../services/middlewares/auth")
enterpriseController = require("../controllers/enterpriseController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */


router.get("/admin", authMiddleware, async (req, res) => {
    try {
        let data = await enterpriseController.getDataByAdmin(req);
        let code = data.statusCode;
        res.status(code).send(data);
    } catch (error) {
        console.log('error while getting enterprises', error);
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
        let data = await enterpriseController.getData(req);
        let code = data.statusCode;
        res.status(code).send(data);
    } catch (error) {
        console.log('error while getting enterprises', error);
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
        let data = await enterpriseController.addData(req);
        let code = data.statusCode;
        // delete data.statusCode;
        res.status(code).send(data);
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
        let image = await enterpriseController.imageUpload(req);
        let code = image.statusCode;
        // delete enterprises.statusCode;
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


module.exports = router;