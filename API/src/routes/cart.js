const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}  = require('../controllers/verifyToken')


router.post('/', verifyToken, CartController.createCart)
router.put('/:id', verifyTokenAndAuthorization, CartController.updateCart)
router.delete('/:id',verifyTokenAndAuthorization, CartController.deleteCart)
router.get('/find/:userId', verifyTokenAndAuthorization, CartController.getUserCart)
router.get('/find', verifyTokenAndAdmin, CartController.getCarts)


module.exports = router