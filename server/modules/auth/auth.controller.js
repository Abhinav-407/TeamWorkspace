const {register, login} = require("./auth.service")
const { validationResult } = require('express-validator');


const registerUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    try {
        const result = await register(req.body)
        res.status(201).json({
            success: true,
            ...result
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const loginUser = async(req, res) =>{
    try {
        const result = await login(req.body)
        res.status(200).json({
            success: true,
            ...result
        })
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

const getMe = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = {registerUser, loginUser, getMe}