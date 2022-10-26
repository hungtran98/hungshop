const express = require('express')
const router = express.Router()
const CourseController = require('../controllers/CourseController')


router.get('/', CourseController.getCourses)
router.post('/', CourseController.store)
router.put('/:id', CourseController.update) 
router.delete('/:id', CourseController.delete)
router.patch('/:id/restore', CourseController.restore)
router.delete('/:id/force', CourseController.deleteForce)
module.exports = router