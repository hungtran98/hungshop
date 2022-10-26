const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const monDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Course = new Schema({
    name: {type: String, maxLength: 255},
    desc: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    slug: { type: String, slug: 'name', unique: true},
    videoId: {type: String, maxLength: 255},
}, {
    timestamps: true
})

    //add plugin
    mongoose.plugin(slug)
    //add plugin for soft delete
    Course.plugin(monDelete, {
        overrideMethods: 'all',
        deletedAt: true
    })

module.exports = mongoose.model('Course', Course)