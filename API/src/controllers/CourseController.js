const Course = require('../models/Course')


class CourseController {

    //[GET]  /courses
    getCourses = async ( req, res ) => {
        try {
            const courses = await Course.find()
            res.status(200).json(courses)
       } 
       catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    //[POST]  / courses/store

    store = async (req, res ) => {
        const { name, desc, videoId, slug } = req.body
        req.body.image = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
        const newCourse = new Course(   
            req.body       
        )
        try {
            await newCourse.save()
            res.status(201).json(newCourse)
        } catch (error) {
            res.status(409).json({message: error.message})
        }
    
    }

    update = async (req, res) => { 
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        try {
            await Course.updateOne({_id: req.params.id}, req.body)
            res.status(200).json('update')
        } catch (error) {
            res.status(409).json({message: error.message})
        }
    }

    delete = async ( req, res ) => {
        try {
            await Course.delete({_id: req.params.id})
            res.status(200).json('deleted')
        } catch (error) {
            res.status(409).json({message: error.message})
        }
    }

    restore = async (req, res) => {
        try {
            await Course.restore({_id: req.params.id})
            res.status(200).json('restored')
        } catch (error) {
            res.status(409).json({message: error.message})
        }
    }

    deleteForce = async (req, res) => {
        try {
            await Course.deleteOne({ _id: req.params.id })
            res.status(200).json("delete force !!!")
        } catch (error) {
            res.status(409).json({message: error.message})         
        }
    }

    
}


module.exports = new CourseController