#!/usr/bin/env node

var cluster = require("cluster");

if (cluster.isMaster) {
  var numWorkers = require("os").cpus().length;

  console.log("Master cluster setting up " + numWorkers + " workers...");

  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("online", function (worker) {
    console.log("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", function (worker, code, signal) {
    console.log(
      "Worker " +
      worker.process.pid +
      " died with code: " +
      code +
      ", and signal: " +
      signal
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  /**
   * Module dependencies.
   */
  require("dotenv").config();
  var express = require("express");
  var app = require("./app");
  var debug = require("debug")("trackingnode:server");
  var http = require("http");
  var authMiddlware = require('./services/middlewares/socketAuth');
  var https = require("https");
  var fs = require('fs');
  var options = {
    key: fs.readFileSync('./ssl/ssl.key'),
    cert: fs.readFileSync('./ssl/ssl_cer.crt')
  };
  /**
   * Get port from environment and store in Express.
   */
  var server = http.createServer(app);
  // var server = https.createServer(options, app);

  /**
   * Create HTTP server.
   */

  /**
   * Listen on provided port, on all network interfaces.
   */
  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    },
  });

  var chatController = require("./controllers/chatController");
  // io.use('/chat', chatRoutes);

  io.on('connection', (socket) => {
    // chatController.getChats(socket);
    console.log('socket connected');
  });

  io.of("/chat")
    .on("connect", async (socket) => {
      try {
        // console.log('connected user');
        // const ids = await io.allSockets();
        // console.log('all connected sockets', ids);
        socket.on("list", async (req) => {
          console.log('req, on list emit', req);
          if (authMiddlware(req?.auth)) {
            // socket.socketsJoin(req.id);
            // io.of("/chat").socketsJoin(req.id);
            socket.broadcast.emit("get", await chatController.getChats({ ...req, io, socket }));
          }
        });
        socket.on("msg", async (req) => {
          console.log('req on msg emit', req);
          if (authMiddlware(req?.auth)) {
            await chatController.addChat({ ...req, io, socket });
            socket.broadcast.emit("get", await chatController.getChats({ id: req.leadId, io, socket }));
          }
        })
        // .in(req.id).socketsJoin()
        // const sockets = await io.of("/chat").fetchSockets();
        // console.log('connected user', sockets[0]?.data);
      } catch (error) {
        socket.emit("get", { statusCode: 401, error: 'Unauthenticated' });
      }
    })

  var port = normalizePort(process.env.PORT || process.env.SERVICE_PORT || "8080");
  app.set("port", port);
  console.log("Magic Happens on => ", port);

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);


  }
}
