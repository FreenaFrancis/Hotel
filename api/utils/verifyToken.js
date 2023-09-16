const createError = require('./error');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }
    
    jwt.verify(token, "sdfghj", (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid"));
        }
        
        // Store the user data in the request for later use
        req.user = user;
        next(); // Call next to continue to the next middleware
    });
};

const verifyUser = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next();

        }else{
            return next(createError(403,"you are not authorized"))
        }
    })
}

const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,next, ()=>{
        if ( req.user.isAdmin){
            next();

        }else{
            return next(createError(403,"you are not authorized"))
        }
    })
}
module.exports = {verifyToken, verifyUser, verifyAdmin};
