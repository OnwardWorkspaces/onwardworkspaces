var express = require("express");
authMiddleware = require("../services/middlewares/auth")
userController = require("../controllers/userController");

var router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.status(200).redirect('./api-docs');
    } catch (error) {
        console.log('error', error);
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 500
        });
    }
})

module.exports = router;