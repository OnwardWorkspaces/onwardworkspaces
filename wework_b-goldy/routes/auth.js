var express = require("express"),
  authController = require("./../controllers/authController"),
  authMiddleware = require("./../services/middlewares/auth");
var router = express.Router();
var ms = require("ms");
var TIME_OUT_TIME = "30m";

// SNIPPET TO INCREASE REQUEST TIME OUT
function setConnectionTimeout(time) {
  var delay = typeof time === "string" ? ms(time) : Number(time || 5000);
  return function (req, res, next) {
    res.connection.setTimeout(delay);
    next();
  };
}

/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - name
 *         - socialId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user full name
 *         email:
 *           type: string
 *           description: Email of user
 *         mobile:
 *           type: string
 *           description: Contact number of user
 *         lang:
 *           type: string
 *           description: Language of user ( Default is 'EN')
 *         role:
 *           type: string
 *           description: User type ei. (Admin, User)
 *         createdAt:
 *           type: date
 *           description: date when user saved in database
 *         updatedAt:
 *           type: date
 *           description: date when user last updated in database
 *         isDeleted:
 *           type: boolean
 *           description: User status for delete
 *       example:
 *          _id:62d7a96ecff8ac1770318059
 *          email:"tarun@gmail.com"
 *          password:"$argon2i$v=19$m=4096,t=3,p=1$8CXdq/ZsWn2AasgIER09iw$vegHFR33BJrmTgltVJ…"
 *          name:"tarun"
 *          mobile:"123456789"
 *          isAdmin:false
 *          isDeleted:false
 *          isEmailVerified:false
 *          role:"Admin"
 *          createdAt:2022-07-20T07:06:22.994+00:00
 *          updatedAt:2022-07-20T07:06:22.994+00:00
 *          __v:0
 */

/**
  * @swagger
  * tags:
  *   name: Auth
  *   description: The Auth API's
  */

/**
  * @swagger
  * tags:
  *   name: User
  *   description: The Front end API's
  */

// /**
//  * @swagger
//  * /register:
//  *   post:
//  *     summary: Save a new user to database
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            name:
//  *              type: string
//  *            email:
//  *              type: string
//  *            password:
//  *              type: string
//  *     tags: [Auth]
//  *     responses:
//  *       200:
//  *         description: Saved the user.
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  data:
//  *                     type: object
//  *                     properties:
//  *                       email: 
//  *                         type: string
//  *                         example: tarun@gmail.com
//  *                       name: 
//  *                         type: string
//  *                         example: tarun
//  *                       isEmailVerified: 
//  *                         type: boolean
//  *                         example: false
//  *                       createdAt:
//  *                         type: string
//  *                         example: '2022-07-22T10:07:10.850Z'
//  *                       updatedAt:
//  *                         type: string
//  *                         example: '2022-07-22T10:07:10.850Z'
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  message:
//  *                     type: string
//  *                     example: We have sent you a verification code on your mail box.
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
//  */


router.post(
  "/register",
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  async (req, res) => {
    try {
      let userRegister = await authController.register(req);
      let code = userRegister.statusCode;
      // delete userRegister.statusCode;
      res.status(code).send(userRegister);
    } catch (error) {
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  }
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login for admin
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User object and authentication token for further API's
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 62d7a96ecff8ac1770318059
 *                       name: 
 *                         type: string
 *                         example: tarun
 *                       email: 
 *                         type: string
 *                         example: tarun@gmail.com
 *                       mobile: 
 *                         type: string
 *                         example: 123456789
 *                       role: 
 *                         type: string
 *                         example: User
 *                       token:
 *                         type: string
 *                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjM5MDQ5N2UyMWQ4Mjc1OWEwNDY4ZDA4Iiwic29jaWFsSWQiOiJzdHJpbmciLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjcwNDAzODk2LCJleHAiOjE3MDE5Mzk4OTZ9.6mwnY1FsurkPbzI8EjLyCcdoVO6B5Ly_O1UnGAUDNw4
 *                  error:
 *                     type: string
 *                     example: null
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
 */

router.post(
  "/login",
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  async (req, res) => {
    try {
      let userLogin = await authController.login(req);
      let code = userLogin.statusCode;

      // delete userLogin.statusCode;

      res.status(code).send(userLogin);
    } catch (error) {
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  }
);

router.get(
  "/authenticate",
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  async (req, res) => {
    try {

      let token = req.headers['authorization'];
      let userAuthenticated = await authController.authenticate(token);
      let code = userAuthenticated.statusCode;

      delete userAuthenticated.statusCode;

      res.status(code).send(userAuthenticated);
    } catch (error) {
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  }
);

// /**
//  * @swagger
//  * /forgot:
//  *   post:
//  *     summary: Send verification code for reset password
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            email:
//  *              type: string
//  *     tags: [Auth]
//  *     responses:
//  *       200:
//  *         description: User object and authentication token for further API's
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  message:
//  *                     type: string
//  *                     example: OTP Sent!
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
//  */

// // Route for forgot password
// router.post("/forgot", async (req, res) => {
//   try {
//     let finalResult = await authController.forgotPassword(req);
//     console.log('final result from forgot password', finalResult);
//     let code = finalResult.statusCode;
//     res.status(200).send(finalResult);
//   } catch (error) {
//     console.log('error on route of forgot password', error);
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// });

// /**
//  * @swagger
//  * /reset_password:
//  *   post:
//  *     summary: Reset password with otp
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            email:
//  *              type: string
//  *            otp:
//  *              type: string
//  *            password:
//  *              type: string
//  *     tags: [Auth]
//  *     responses:
//  *       200:
//  *         description: User object and authentication token for further API's
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  message:
//  *                     type: string
//  *                     example: Password Reset Successfully!
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
//  */

// router.post("/reset_password", async (req, res) => {
//   try {
//     let finalResult = await authController.resetPassword(req);
//     console.log('final result from reset password', finalResult);
//     let code = finalResult.statusCode;
//     res.status(200).send(finalResult);
//   } catch (error) {
//     console.log('error on route of reset password', error);
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// })

// /**
//  * @swagger
//  * /verifyotp:
//  *   post:
//  *     summary: Account verification
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            email:
//  *              type: string
//  *            otp:
//  *              type: string
//  *     tags: [Auth]
//  *     responses:
//  *       200:
//  *         description: User object and authentication token for further API's
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  message:
//  *                     type: string
//  *                     example: Account verified. Try to login Please!
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
//  */

// verifyOTP
router.post("/verify", async (req, res) => {
  try {
    let finalResult = await authController.verifyOTP(req);
    console.log('final result from verifyotp ', finalResult);
    let code = finalResult.statusCode;
    res.status(200).send(finalResult);
  } catch (error) {
    console.log('error on route of verifyotp', error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

// /**
//  * @swagger
//  * /stat:
//  *   get:
//  *     summary: stat details
//  *     parameters:
//  *         -  in: query
//  *            name: companyId
//  *            required: true
//  *     tags: [Admin, Moderator, Dealer]
//  *     responses:
//  *       200:
//  *         description: Stat Details
//  *         content:
//  *            application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  data:
//  *                    type: object
//  *                    example: {"newLead":{"count":1,"percent":"20.00"},"leads":{"monthlyOpen":[{"_id":{"month":12},"count":1}],"monthlyProcess":[{"_id":{"month":12},"count":2}],"monthlyClosed":[{"_id":{"month":12},"count":1}],"monthlyRejected":[{"_id":{"month":12},"count":1}]},"source":[{"_id":{"source":"Direct"},"count":4},{"_id":{"source":"string"},"count":1}],"dealers":[{"_id":"638d7ebf767bfb61d086de23","profile_picture":"","address":"Arthala Road, Shrinashan Pg","postalCode":"","isEmailVerified":true,"isDeleted":false,"role":"Dealer","priority":60,"otp":8988,"name":"Abhisek Goldy","email":"abhisekgoldy14@gmail.com","mobile":"7500063621","password":"$argon2i$v=19$m=4096,t=3,p=1$OwmyuUmPqQKnWRrtIDmQNg$9HacdJkhILbwh2nu89hwlWWB8wHIKUwLr2xWlobKbjk","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:16:47.275Z","updatedAt":"2022-12-06T07:01:52.568Z","__v":0,"projectId":"638d7ec7767bfb61d086de2a","lastActive":"3 minutes ago","lead":[{"_id":{"status":"Rejected"},"count":1},{"_id":{"status":"Closed"},"count":1},{"_id":{"status":"In Process"},"count":2},{"_id":{"status":"Open"},"count":1}],"totalLead":5},{"_id":"638db96414ed476234dff7d6","profile_picture":"","address":"string","postalCode":"","isEmailVerified":true,"isDeleted":false,"role":"Dealer","priority":40,"otp":1788,"addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","name":"Jagan 2","email":"jagan2@gmail.com","mobile":"7500063621","password":"$argon2i$v=19$m=4096,t=3,p=1$9Uchqq7W3J2sQ+rOvBm+9A$ny1i/LasEwVxp9vne0hatD8KH0l7g3NmQuRT0KjPMv8","createdAt":"2022-12-05T09:27:00.451Z","updatedAt":"2022-12-06T07:01:54.348Z","__v":0,"lastActive":"2 hours ago","lead":[]}],"moderator":[{"_id":"638d8376767bfb61d086de4b","profile_picture":"","address":"Gurugram","postalCode":"","isEmailVerified":true,"isDeleted":false,"role":"Moderator","priority":0,"otp":6233,"name":"Akash Mehta","email":"akash@gmail.com","mobile":"7500063621","password":"$argon2i$v=19$m=4096,t=3,p=1$yiEunlUzM++p1sLmrtG/Dw$SlsriB1opZotTc2DvKW88j6juR42+pYr/w9lDIANIGM","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","createdAt":"2022-12-05T05:36:54.993Z","updatedAt":"2022-12-05T05:36:54.993Z","__v":0,"lastActive":"33 minutes ago","lead":[{"_id":"638dce5398f4c26ec4a6af3e","intro":"Learn HTML free","source":"Direct","clientName":"Anit Sharma","company":"Rajmith","mobile":"7500063621","email":"info@rajmith.in","address":"Gurugram","status":"In Process","isDeleted":false,"projectId":"638d83ac767bfb61d086de52","name":"Create Rajmith Website","addedBy":"636a07005eb11a76b83c05df","companyId":"636c7ba4e4a7fb84d41735a9","timeline":[{"title":"Added","desc":"This lead is added from Direct ( Source ) on 05-Dec-2022 16:12 pm.","_id":"638dce5398f4c26ec4a6af3f","createdAt":"2022-12-05T10:56:19.438Z"},{"title":"Assign To Moderator","desc":"Lead Assign to Akash Mehta by preeti sanger","_id":"638ddf831e0062691cca27cc","createdAt":"2022-12-05T12:09:39.836Z"},{"title":"Assign To Channel Partner","desc":"Lead Assign to Abhisek Goldy by Akash Mehta","_id":"638de3568ed94e76ec0100e0","createdAt":"2022-12-05T12:25:58.451Z"}],"createdAt":"2022-12-05T10:56:19.439Z","updatedAt":"2022-12-05T12:25:58.438Z","__v":0,"assignToM":"638d8376767bfb61d086de4b","assignToD":"638d7ebf767bfb61d086de23"}]}]}
//  *                  error:
//  *                     type: string
//  *                     example: null
//  *                  message:
//  *                     type: string
//  *                     example: SUCCESS
//  *                  statusCode:
//  *                     type: integer
//  *                     example: 200
// */


// // stats
// router.get("/stat", authMiddleware, async (req, res) => {
//   try {
//     let finalResult = await leadController.getStats(req);
//     // console.log('final result from verifyotp ', finalResult);
//     let code = finalResult.statusCode;
//     res.status(code).send(finalResult);
//   } catch (error) {
//     console.log('error on stat route', error);
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// })

// // sett password
// router.post("/setpassword", async (req, res) => {
//   try {
//     let finalResult = await authController.setPassword(req);
//     console.log('final result from forgot password', finalResult);
//     let code = finalResult.statusCode;
//     res.status(200).send(finalResult);
//   } catch (error) {
//     console.log('error on route of forgot password', error);
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// });

// /** VERIFICATION MAIL ROUTE */
// router.post(
//   "/verify",
//   setConnectionTimeout(`${TIME_OUT_TIME}`),
//   async (req, res) => {
//     try {
//       let updateUser = await authController.verifyAccount(req);
//       let code = updateUser.statusCode;
//       res.status(code).send(updateUser);
//     } catch (error) {
//       res.status(500).send({
//         message: "FAILED",
//         data: null,
//         error: error,
//       });
//     }
//   }
// );

// /** ROUTE FOR ADD PLAN */
// router.post('/insertPlan', setConnectionTimeout(`${TIME_OUT_TIME}`),
//   async (req, res) => {
//     try {
//       let addPlan = await authController.addPlan(req);
//       let code = addPlan.statusCode;
//       res.status(code).send(addPlan);
//     } catch (error) {
//       res.status(500).send({
//         message: "FAILED",
//         data: null,
//         error: error,
//       });
//     }
//   }
// )

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: contact us
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *            tourId:
 *              type: string
 *              example: 646225fd4cd89acd31bfe707
 *            msg:
 *              type: string
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User object and authentication token for further API's
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 62d7a96ecff8ac1770318059
 *                       name: 
 *                         type: string
 *                         example: tarun
 *                       email: 
 *                         type: string
 *                         example: tarun@gmail.com
 *                       mobile: 
 *                         type: string
 *                         example: 123456789
 *                       role: 
 *                         type: string
 *                         example: User
 *                       token:
 *                         type: string
 *                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjM5MDQ5N2UyMWQ4Mjc1OWEwNDY4ZDA4Iiwic29jaWFsSWQiOiJzdHJpbmciLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjcwNDAzODk2LCJleHAiOjE3MDE5Mzk4OTZ9.6mwnY1FsurkPbzI8EjLyCcdoVO6B5Ly_O1UnGAUDNw4
 *                  error:
 *                     type: string
 *                     example: null
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
 */

// router.post('/contact', async (req, res) => {
//   try {
//     let addMainAdmin = await authController.contactUs(req);
//     let code = addMainAdmin.statusCode;
//     res.status(code).send(addMainAdmin);
//   } catch (error) {
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// });

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: contact us
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User object and authentication token for further API's
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 62d7a96ecff8ac1770318059
 *                       email: 
 *                         type: string
 *                         example: tarun@gmail.com
 *                  error:
 *                     type: string
 *                     example: null
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
 */

router.post('/subscribe', async (req, res) => {
  try {
    let addMainAdmin = await authController.addSubs(req);
    let code = addMainAdmin.statusCode;
    res.status(code).send(addMainAdmin);
  } catch (error) {
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: home data
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: test
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                     type: array
 *                     items: 
 *                       type: object
 *                       example: { "_id": "644788665466301ac091f79e", "image": "https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Affili/1682409573877.png", "isActive": true, "isDeleted": false, "createdAt": "2023-04-25T07:59:34.398Z", "updatedAt": "2023-04-25T07:59:34.398Z", "__v": 0 }
 *                  message:
 *                     type: string
 *                     example: SUCCESS
 *                  statusCode:
 *                     type: integer
 *                     example: 200
*/


// router.get("/home", async (req, res) => {
//   try {
//     let finalResult = await authController.homeData(req);
//     // console.log('final result from verifyotp ', finalResult);
//     let code = finalResult.statusCode;
//     res.status(code).send(finalResult);
//   } catch (error) {
//     console.log('error on stat route', error);
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// });

router.get("/test", async (req, res) => {
  try {
    console.log("tested", req?.body, req?.query);
    res.status(200).send({ body: req?.body, query: req?.query });
  } catch (error) {
    console.log('error on test', error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

module.exports = router;
