var express = require("express");
authMiddleware = require("../services/middlewares/auth")
chatController = require("../controllers/chatController");

function chatRoutes(io) {
    console.log('io on chat route', io);
    var router = express.Router();
    router.get("/list", authMiddleware, async (req, res) => {
        try {
            let users = await chatController.getChats(req);
            let code = users.statusCode;
            res.status(code).send(users);
            io.emit('list', users);
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
    router.get("/", authMiddleware, async (req, res) => {
        try {
            res.status(200).send({users:[]});
            // io.emit('list', {users:[]});
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
    return router;
}

module.exports = chatRoutes;