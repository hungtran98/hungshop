const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../controllers/verifyToken')
const router = require('express').Router()
const UserController = require('../controllers/UserController')
router.put('/:id',  verifyTokenAndAuthorization, UserController.update)
router.delete('/:id', verifyTokenAndAuthorization, UserController.delete)
router.get('/find/:id', verifyTokenAndAdmin, UserController.getUser)
router.get('/', verifyTokenAndAdmin, UserController.getUsers)
router.get('/stat', verifyTokenAndAdmin, UserController.getStat)


module.exports = router