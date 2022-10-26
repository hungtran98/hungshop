const Cart = require('../models/Cart')

class CartController {

    //[POST]
    createCart = async (req, res) => {
        const newCart = new Cart(
            req.body
        )
        try {
            await newCart.save()
            res.status(200).json(newCart)
        } catch (error) {
            res.status(500).json(error)          
        }
    }


    //[PUT]   /cart/:id
    updateCart = async ( req, res) => {
        
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true} 
        )
        res.status(200).json(updateCart)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

    //[DELETE] /cart/:id
    deleteCart = async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json('deleted!')
        } catch (error) {
            res.status(500).json(error) 
        }
    }

   //[GET]  /cart/find/:userId   --get userCart
    getUserCart = async (req, res) => {
        try {
            const userCart = await Cart.findOne(req.params.userId)
            res.status(200).json(userCart)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //[GET]  /cart/find/  --get all carts
    getCarts = async (req, res) => {
        try {
                allCarts = await Cart.find()
                res.status(200).json(allCarts)
            }
        catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new CartController