var express = require("express");
authMiddleware = require("../services/middlewares/auth");
enquiryController = require("../controllers/enquiryController");

var router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        let result = await enquiryController.getDataAdmin(req);
        let code = result.statusCode;
        res.status(code).send(result);
    } catch (error) {
        console.log('error while getting enquiries', error);
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
        let result = await enquiryController.addData(req);
        let code = result.statusCode;
        res.status(code).send(result);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
});

router.delete("/", authMiddleware, async (req, res) => {
    try {
        let result = await enquiryController.removeData(req);
        let code = result.statusCode;
        res.status(code).send(result);
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
