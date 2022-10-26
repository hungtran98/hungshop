const router = require('express').Router()
const OrderController = require('../controllers/OrderController')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../controllers/verifyToken')

router.post('/', verifyToken, OrderController.createOrder)
router.put('/:id', verifyTokenAndAdmin, OrderController.updateOrder)
router.delete('/:id', verifyTokenAndAdmin, OrderController.deleteOrder)
router.get('/find/:userId', verifyTokenAndAuthorization, OrderController.getUserOrder)
router.get('/find', verifyTokenAndAdmin, OrderController.getOrders)
router.get('/income', verifyTokenAndAdmin, OrderController.getIncome)



module.exports = router