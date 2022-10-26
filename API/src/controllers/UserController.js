const User = require('../models/User')
const cryptoJs = require('crypto-js')

class UserController {

    //[PUT]   /users/:id
    update = async ( req, res) => {
        if(req.body.password) {
            req.body.password = cryptoJs.AES.encrypt(
                req.body.password,
                process.env.SECRECT_KEY
            ).toString()
        }
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true} 
        )
        res.status(200).json(updateUser)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

    //[DELETE] /users/:id
    delete = async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('deleted!')
        } catch (error) {
            res.status(500).json(error) 
        }
    }

    //[GET]  /users/:id
    getUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const {password, ...others} = user._doc
            res.status(200).json({others})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //[GET]  /users/
    getUsers = async (req, res) => {
        try {
            const query = req.query.new
            const allUser =  query ? await User.find().sort({_id: -1}).limit(3) 
            : await User.find({})
            res.status(200).json(allUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //[GET]  /users/stat

    getStat = async (req, res) => {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.setFullYear() - 1))
        try {
            const data = await User.aggregate([
              { $match: { createdAt: { $gte: lastYear } } },
              {
                $project: {
                  month: { $month: "$createdAt" },
                },
              },
              {
                $group: {
                  _id: "$month",
                  total: { $sum: 1 },
                },
              },
            ]);
            res.status(200).json(data)
          } catch (error) {
            res.status(500).json(error)
        }
    }



}

module.exports = new UserController