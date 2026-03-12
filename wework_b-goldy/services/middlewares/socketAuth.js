let jwt = require("../jwt/jwt");

module.exports = async (token) => {
    try {
        console.log('req on socket auth', token);
        // Get the token from header
        // Split the token And get the JWT token from  Authorization header
        // Verify the token 
        // if it's valid call next with appending userId to req.body
        // console.log(req.headers);
        if(!token)
            throw 'Authorization Token is requiered!'
        // token = token.split(" ");
        // let jwtToken = token[1];
        let decodedToken = await jwt.verify(token);
        return decodedToken = decodedToken.data;
    } catch (error) {
        console.log(error);
        return false;
        // res.status(401).send({
        //     message: "FAILED",
        //     data: null,
        //     error: error,
        //     status: 401
        // });
    }    
}