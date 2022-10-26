const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../controllers/verifyToken')

router.post('/', verifyTokenAndAdmin, ProductController.createProduct)
router.put('/:id', verifyTokenAndAdmin, ProductController.updateProduct)
router.delete('/:id', verifyTokenAndAdmin, ProductController.deleteProduct)
router.get('/:id', ProductController.getProduct)
router.get('/', ProductController.getProducts)

module.exports = router