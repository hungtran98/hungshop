const Product = require('../models/Product')
const cryptoJs = require('crypto-js')

class ProductController {

    //[POST]  /

    createProduct = async (req, res) => {

        const newProduct = new Product(
            // title: req.body.title,
            // desc: req.body.desc,
            // img: req.body.img,
            // categories: req.body.categories,
            // color: req.body.color,
            // size: req.body.size,
            // price: req.body.price
            req.body
        )
        try {
            await newProduct.save()
            res.status(200).json(newProduct)
        } catch (error) {
            res.status(500).json(error)          
        }
    }


    //[PUT]   /products/:id
    updateProduct = async ( req, res) => {
        
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true} 
        )
        res.status(200).json(updateProduct)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

    //[DELETE] /users/:id
    deleteProduct = async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('deleted!')
        } catch (error) {
            res.status(500).json(error) 
        }
    }

//     //[GET]  /users/:id
    getProduct = async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //[GET]  /products/
    getProducts = async (req, res) => {
        const qNew = req.query.new
        const qCategory = req.query.category
        try {
            let products
            if(qNew){
                products = await Product.find().sort({created: -1}).limit(1)
            }
            else if(qCategory){
                products = await Product.find({
                    categories: {
                        $in: [qCategory]
                    }
                })
            }
            else {
                products = await Product.find()
            }
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new ProductController