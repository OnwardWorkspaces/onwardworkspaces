require('dotenv').config({ path: './../../.env' })
let jwt = require('jsonwebtoken');

exports.signJWT = (data) => {
    return jwt.sign({
        data: data
      }, process.env.JWT_SECRET, { expiresIn: '365d' });
}

exports.verify = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                reject(err.message)
            }
            else{
                resolve(decoded)
            }
          });
    })
}



