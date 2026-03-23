const jwt = require("jsonwebtoken")
const {findById} = require("../modules/auth/auth.repository")

const protect = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await findById(decoded.id)

            if(!user){
                throw new Error("User not found")
            }
            req.user = {
                id: user._id,
                name: user.name,
                email: user.email,
            }
            next()
        }else{
            throw new Error("Not authorized, token missing");
        }
    } catch (error) {
        res.status(401).json({ message: error.message || "Not authorized, token failed" })
    }
}

module.exports = {protect}