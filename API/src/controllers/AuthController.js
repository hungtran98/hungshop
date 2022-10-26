const User = require('../models/User')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

class AuthController {

    //[POST] /auth/register
    register = async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: cryptoJs.AES.encrypt(req.body.password, process.env.SECRECT_KEY).toString()
        })
        try {
            await newUser.save()
            res.status(201).json('new user!')
        } catch (error) {
            res.status(409).json({ message: error.message })            
        }
    }

    //[POST] /auth/login

    login = async (req, res) => {
        const user =  await User.findOne({username: req.body.username})
        if(!user){
           return res.json('Account no exist !')
        } 
        try {
            const hashPassword = cryptoJs.AES.decrypt(user.password, process.env.SECRECT_KEY)
            const originalPassword = hashPassword.toString(cryptoJs.enc.Utf8)

            if(originalPassword !== req.body.password)
                return res.status(400).json('wrong password :( !')
            
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_KEY,
            {
                expiresIn: "1d"
            })

            const {password, ...others} = user._doc
            res.status(200).json({...others, accessToken})
               
        } catch (error) {
            res.status(409).json({ message: error.message }) 
        }
    }




}

module.exports = new AuthController