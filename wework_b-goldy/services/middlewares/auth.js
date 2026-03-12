let jwt = require("./../jwt/jwt");

module.exports = async (req, res, next) => {
    try {
        // Get the token from header
        // Split the token And get the JWT token from  Authorization header
        // Verify the token 
        // if it's valid call next with appending userId to req.body
        // console.log(req.headers);
        if(!req.headers?.authorization)
            throw 'Authorization Token is requiered!'
        let token = req.headers.authorization;
        token = token.split(" ");
        let jwtToken = token[1];
        let decodedToken = await jwt.verify(jwtToken);
        req.decodedToken = decodedToken.data;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 401
        });
    }    
}