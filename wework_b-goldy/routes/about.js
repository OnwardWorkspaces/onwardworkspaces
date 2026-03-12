var express = require("express");
authMiddleware = require("../services/middlewares/auth")
aboutController = require("../controllers/aboutController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */


router.get("/admin", authMiddleware, async (req, res) => {
    try {
        let abouts = await aboutController.getDataByAdmin(req);
        let code = abouts.statusCode;
        res.status(code).send(abouts);
    } catch (error) {
        console.log('error while getting abouts', error);
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
        let abouts = await aboutController.getData(req);
        let code = abouts.statusCode;
        res.status(code).send(abouts);
    } catch (error) {
        console.log('error while getting abouts', error);
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
        let abouts = await aboutController.addData(req);
        let code = abouts.statusCode;
        // delete abouts.statusCode;
        res.status(code).send(abouts);
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
        let image = await aboutController.imageUpload(req);
        let code = image.statusCode;
        // delete abouts.statusCode;
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