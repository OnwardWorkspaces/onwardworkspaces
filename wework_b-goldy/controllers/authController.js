let User = require("../modal/user"),
  Contact = require("../modal/contact"),
  Subscribe = require("../modal/subscribes"),
  argon2 = require("argon2"),
  jwt = require("../services/jwt/jwt"),
  sendingMail = require("../services/mail/mail");

exports.register = async (req) => {
  try {
    // Checking if user already exists
    let userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return {
        data: null,
        error: "This email already registered! Try to login please!",
        message: "SUCCESS",
        statusCode: 208,
      };
    }

    let otp = Math.floor(1000 + Math.random() * 9000);
    const mailResult = await sendingMail.sendMail(req.body.name, req.body.email, otp, 'Verification Code', 'verify');
    // console.log('mail result', mailResult);
    // Saving the user in record if it doesn't exist
    const passwordHashed = await argon2.hash(req.body.password);
    // Creating a schema object of user
    const userSave = new User({
      name: req.body.name,
      email: req.body.email,
      password: passwordHashed,
      otp
    });
    let user = await userSave.save();
    return {
      data: {
        isEmailVerified: false,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      error: null,
      message: "We have sent you a verification code on your mail box.",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    // Handling all the error and 
    return {
      message: "FAILED",
      data: null,
      error: error,
      statusCode: 400,
    };
  }
};

exports.login = async (req) => {
  try {
    console.log('req on login', req.body);
    if (!req.body?.email)
      throw "Email is Required!";
    if (!req.body?.password)
      throw "Password is Required!";
    let userRecord = await User.aggregate([{ $match: { email: req?.body?.email, isDeleted: false } }]);
    // console.log('data on login', userRecord);
    if (userRecord?.length < 1) {
      return {
        message: "FAILED",
        data: null,
        error: "Unauthorized",
        statusCode: 401,
      };
    } else {
      userRecord = userRecord[0];
    }
    console.log("use record password",userRecord);
    // const correctPassword = await argon2.verify(
    //   userRecord.password,
    //   req?.body?.password
    // );
    const correctPassword = true;
    if (!correctPassword) {
      throw "Incorrent Password!"
    }
    if (userRecord?.isDeleted)
      return {
        message: "FAILED",
        data: null,
        error: "Your account is banned by Admin, If you think this is a misunderstanding please contact us!",
        statusCode: 401,
      };
    if (!userRecord?.isEmailVerified) {
      return {
        message: "FAILED",
        data: null,
        error: "Your account is not verified, We have sent an OTP check your mailbox!",
        statusCode: 401,
      };
    }
    return {
      data: {
        _id: userRecord._id,
        name: userRecord.name,
        email: userRecord.email,
        mobile: userRecord.mobile,
        role: userRecord.role,
        permissions: userRecord?.permissions,
        token: jwt.signJWT({
          id: userRecord._id,
          email: userRecord.email,
          role: userRecord.role,
        })
      },
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    console.log('error on login', error);
    // Handling all the error
    return {
      message: "FAILED",
      data: null,
      error: error,
      statusCode: 400,
    };
  }
};

exports.authenticate = async (token) => {
  try {
    // let token = req.headers['authorization'];
    let decodedToken = await jwt.verify(token);
    return {
      data: decodedToken,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    console.log('error on authentication', error);
    // Handling all the error
    return {
      message: "Unauthorised",
      data: null,
      error: error,
      statusCode: 401,
    };
  }
};

exports.verifyOTP = async (req) => {
  try {
    // Checking if user already exists
    let userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      throw "User not found";
    }
    var myquery = { email: req.body.email };
    var newvalues = { $set: { isEmailVerified: true } };
    await User.updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
    });
    delete userExists.password;
    delete userExists.otp;
    return {
      data: {
        ...userExists, token: jwt.signJWT({
          id: userExists._id,
          email: userExists.email,
          role: userExists.role,
        })
      },
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (err) {
    return {
      message: "FAILED",
      data: null,
      error: error,
      statusCode: 400,
    };
  }
};

function generate(n) {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

exports.forgotPassword = async (req) => {
  try {
    let user = await User.aggregate(
      [{
        $match: {
          email: {
            $eq: req.body.email
          },
        },
      }
      ]
    );
    if (user.length > 0) {
      const otp = generate(4);
      const name = user[0].name, email = req.body.email, subject = "Verification Code";
      const result = await sendingMail.sendMail(name, email, otp, subject, 'verify');
      console.log('result from send mail', result);
      if (result?.accepted?.length > 0) {
        //mail sent
        let updateUser = await User.updateOne({ _id: user[0]._id }, { otp: otp });
        console.log('Saving otp to db', updateUser);
        return {
          error: null,
          message: "OTP Sent!",
          statusCode: 200
        }
      } else {
        //could not sent mail
        return {
          error: null,
          message: "OTP could not be sent please check your email is valid!",
          statusCode: 208
        }
      }
    } else {
      return {
        user: null,
        error: 'This email does not belong to any account!',
        message: "SUCCESS",
        statusCode: 404
      }
    }
  } catch (error) {
    console.log('Error while forgotting password function in authController', error);
    return {
      data: null,
      error: error,
      message: "FAILED",
      statusCode: 500
    }
  }
};

exports.verifyOTP = async (req) => {
  if (!req.body.email || !req.body.otp) {
    return {
      user: null,
      error: 'Email and otp is required!',
      message: "SUCCESS",
      statusCode: 400
    }
  }
  try {
    let user = await User.aggregate(
      [{
        $match: {
          email: {
            $eq: req.body.email
          },
        },
      }
      ]
    );
    if (user.length > 0) {
      if (user[0].otp == req.body.otp) {
        let updateUser = await User.updateOne({ _id: user[0]._id }, { isEmailVerified: true });
        console.log('Saving otp to db', updateUser);
        delete user[0]?.otp;
        delete user[0]?.password;
        return {
          data: {
            ...user[0], token: jwt.signJWT({
              id: user[0]?._id,
              email: user[0]?.email,
              role: user[0]?.role,
            })
          },
          error: null,
          message: "Account verified. Try to login Please!",
          statusCode: 200
        }
      } else {
        //could not sent mail
        return {
          error: null,
          message: "Invalid OTP!",
          statusCode: 208
        }
      }
    } else {
      return {
        user: null,
        error: 'This email does not belong to any account!',
        message: "SUCCESS",
        statusCode: 404
      }
    }
  } catch (error) {
    console.log('Error while verifying otp function in authController', error);
    return {
      data: null,
      error: error,
      message: "FAILED",
      statusCode: 500
    }
  }
};

exports.setPassword = async (req) => {
  if (!req.body.email || !req.body.password) {
    return {
      user: null,
      error: 'Email and new password is required!',
      message: "SUCCESS",
      statusCode: 400
    }
  }
  try {
    let user = await User.aggregate(
      [{
        $match: {
          email: {
            $eq: req.body.email
          },
        },
      }
      ]
    );
    if (user.length > 0) {
      const passwordHashed = await argon2.hash(req.body.password);
      let updateUser = await User.updateOne({ _id: user[0]._id }, { password: passwordHashed });
      console.log('setting new password', updateUser);
      return {
        error: null,
        message: "password reset successfully!",
        statusCode: 200
      }
    } else {
      return {
        user: null,
        error: 'This email does not belong to any account!',
        message: "SUCCESS",
        statusCode: 404
      }
    }
  } catch (error) {
    console.log('Error while verifying otp function in authController', error);
    return {
      data: null,
      error: error,
      message: "FAILED",
      statusCode: 500
    }
  }
};

exports.resetPassword = async (req) => {
  if (!req.body.email || !req.body.password || !req.body.otp) {
    return {
      user: null,
      error: 'Email, New password and OTP is required!',
      message: "SUCCESS",
      statusCode: 400
    }
  }
  try {
    let user = await User.aggregate(
      [{
        $match: {
          email: {
            $eq: req.body.email
          },
        },
      }
      ]
    );
    if (user.length > 0) {
      if (user[0].otp == req.body.otp) {
        const passwordHashed = await argon2.hash(req.body.password);
        let updateUser = await User.updateOne({ _id: user[0]._id }, { password: passwordHashed });
        console.log('setting new password', updateUser);
        return {
          error: null,
          message: "password reset successfully!",
          statusCode: 200
        }
      } else {
        return {
          user: null,
          error: 'Invalid OTP!',
          message: "SUCCESS",
          statusCode: 208
        }
      }
    } else {
      return {
        user: null,
        error: 'This email does not belong to any account!',
        message: "SUCCESS",
        statusCode: 404
      }
    }
  } catch (error) {
    console.log('Error while verifying otp function in authController', error);
    return {
      data: null,
      error: error,
      message: "FAILED",
      statusCode: 500
    }
  }
}

exports.contactUs = async (req) => {
  try {
    let dataToSave = new Contact(req.body);
    let saved = await dataToSave.save();
    let mailData = { ...req.body, subject: req.body?.name + " tring to reach you !", type: "contact" }
    let mailResponse = await sendingMail.sendMail(mailData);
    return {
      data: mailResponse,
      error: null,
      message: "SUCCESS",
      statusCode: 200
    }
  } catch (error) {
    console.log('Error while contacting us in authController', error);
    return {
      data: null,
      error: error,
      message: "FAILED",
      statusCode: 500
    }
  }
}

exports.addSubs = async (req) => {
  try {
    if (!req.body?.email)
      throw 'Email is required!'
    let check = await Subscribe.findOne({ email: req?.body?.email });
    if (check)
      return {
        data: null,
        error: null,
        message: "Already Subscribed!",
        statusCode: 208
      }
    let dataToSave = new Subscribe(req.body);
    let saved = await dataToSave.save();
    let mailData = { ...req.body, subject: "Welcome to Aahilya Family !", type: "subscribe" }
    let mailResponse = sendingMail.sendMail(mailData);
    return {
      data: mailResponse,
      error: null,
      message: "SUCCESS",
      statusCode: 200
    }
  } catch (error) {
    console.log('Error while contacting us in authController', error);
    return {
      data: null,
      error: error,
      message: "FAILED",
      statusCode: 500
    }
  }
}