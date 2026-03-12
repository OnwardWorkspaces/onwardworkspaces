var createError = require('http-errors');
const http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require("helmet");
// const cloudinary = require('cloudinary').v2;
// var io = server.onListening();

var indexRouter = require('./routes/index');
var authRoutes = require('./routes/auth');
var userRoutes = require("./routes/user");
var homeRoutes = require("./routes/home");
var expRoutes = require("./routes/experience");
var affiliRoutes = require("./routes/affili");
var destiRoutes = require("./routes/destination");
var tourRoutes = require("./routes/tour");
var testiRoutes = require("./routes/testimonial");
var galleryRoutes = require("./routes/gallery");
var storeRoutes = require("./routes/store");
var blogRoutes = require("./routes/blog");
var bookingRoutes = require("./routes/booking");
var cityRoutes = require("./routes/city");
var locationRoutes = require("./routes/location");
var categoryRoutes = require("./routes/category");
var clientaleRoutes = require("./routes/clientale");
var standardRoutes = require("./routes/standard");
var amenityRoutes = require("./routes/amenities");
var propertyRoutes = require("./routes/property");
var officeRoutes = require("./routes/offices");
var leadRoutes = require("./routes/lead");
var subsRoutes = require("./routes/subscribe");
var aboutRoutes = require("./routes/about");
var partnerRoutes = require("./routes/partnership");
var brokerRoutes = require("./routes/broker");
var fromRoutes = require("./routes/form");
var landingRoutes = require("./routes/landing");
var contactRoutes = require("./routes/contactus");
var solutionRoutes = require("./routes/oursolution");
var enterpriseRoutes = require("./routes/enterprise");
var caseRoutes = require("./routes/case");
const fileUpload = require('express-fileupload');
var authMiddlware = require('./services/middlewares/auth');
// // Middlewares binding with routes
userRoutes.use(authMiddlware);
// langRoutes.use(authMiddleware);
var app = express();

app.use(fileUpload());

let mongoose = require("mongoose");

// ================================================
//            MODAL CONFIGURATION
// ================================================

// ================================================
//            SERVER CONFIGURATION
// ================================================


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", false);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  res.header("Content-Security-Policy", "default-src 'self';base-uri 'self';font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self';");
  next();
});
app.use(cors({
  origin: ['*', 'http://192.168.1.50:8089/', 'http://13.200.63.202:8089/', 'https://aahilyaholidays.com/'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
// app.use(cors({
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
// }));

//Unit Testing with swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WeWork',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://onwardworkspaces.com:' + process.env.SERVICE_PORT
      },
      {
        url: 'http://3.108.12.59:' + process.env.SERVICE_PORT
      },
      {
        url: 'http://192.168.1.50:' + process.env.SERVICE_PORT
      }
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],
  },
  apis: ["./routes/*.js"]
}

const swaggerSpac = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpac));
app.use(helmet());

app.use('/', indexRouter);
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/city', cityRoutes);
app.use('/location', locationRoutes);
app.use('/category', categoryRoutes);
app.use('/clientale', clientaleRoutes);
app.use('/standard', standardRoutes);
app.use('/amenity', amenityRoutes);
app.use('/property', propertyRoutes);
app.use('/office', officeRoutes);
app.use('/home', homeRoutes);
app.use('/experience', expRoutes);
app.use('/affili', affiliRoutes);
app.use('/destination', destiRoutes);
app.use('/tour', tourRoutes);
app.use('/testi', testiRoutes);
app.use('/gallery', galleryRoutes);
app.use('/store', storeRoutes);
app.use('/blog', blogRoutes);
app.use('/booking', bookingRoutes);
app.use('/lead', leadRoutes);
app.use('/subs', subsRoutes);
app.use('/about', aboutRoutes);
app.use('/partner', partnerRoutes);
app.use('/broker', brokerRoutes);
app.use('/form', fromRoutes);
app.use('/landing', landingRoutes);
app.use('/contact', contactRoutes);
app.use('/solution', solutionRoutes);
app.use('/enterprise', enterpriseRoutes);
app.use('/case', caseRoutes);
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.use(passport.initialize());
// mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=admin`, {
// allowDiskUse : true,
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("DB Connected");
    // cloudinary.config({ 
    //   cloud_name: 'dzyvfuddu', 
    //   api_key: '248684739764185', 
    //   api_secret: 'VB8d5e9EXzPjmjKke9DtgT1JSEA' 
    // });
  })
  .catch((err) => {
    console.log("ERROR iN DB CONNECTION", err);
  });

module.exports = app;
