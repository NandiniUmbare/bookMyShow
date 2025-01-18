const jwt = require('jsonwebtoken')

const auth = (req, res, next )=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET) 
        req.body.userId = verifiedToken.userId
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({success: false, message: "Invalid token"})
    }
}

module.exports = auth