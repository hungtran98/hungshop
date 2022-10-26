const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    title: {
        type: String, required: true, unique: true
    },
    desc: {
        type: String
    },
    img: {
        type: String, required: true
    },
    categories: {
        type: Array
    },
    color: {
        type: Array
    },
    size: {
        type: Array
    },
    price: {
        type: Number
    },
    inStock: {
        type: Boolean, default: true
    }
},
    {timestamps: true}
)


module.exports = mongoose.model('Product', Product)