var express = require("express");
authMiddleware = require("../services/middlewares/auth")
solutionController = require("../controllers/solutionController");

var router = express.Router();

/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: The Admin Role API's
  */


router.get("/admin", authMiddleware, async (req, res) => {
    try {
        let solutions = await solutionController.getDataByAdmin(req);
        let code = solutions.statusCode;
        res.status(code).send(solutions);
    } catch (error) {
        console.log('error while getting solutions', error);
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
        let solutions = await solutionController.getData(req);
        let code = solutions.statusCode;
        res.status(code).send(solutions);
    } catch (error) {
        console.log('error while getting solutions', error);
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
        let solutions = await solutionController.addData(req);
        let code = solutions.statusCode;
        // delete solutions.statusCode;
        res.status(code).send(solutions);
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
        let image = await solutionController.imageUpload(req);
        let code = image.statusCode;
        // delete solutions.statusCode;
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