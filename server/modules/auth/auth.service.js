const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {findByEmail, createUser} = require("./auth.repository")

const register = async({name, email, password}) => {
    const existingUser = await findByEmail(email)
    if(existingUser){
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({name, email, password:hashedPassword})

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}      
    )
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    };   
}

const login = async({email, password})=>{
        const user = await findByEmail(email)
        if(!user){
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error("Incorrect Password")
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}      
        )
        return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    };
}

module.exports = {register, login}