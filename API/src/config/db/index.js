const mongoose = require('mongoose')


async function connect () {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tvth_blognode',
        {
            useNewUrlParser:true,
            useUnifiedTopology: true,    
        } )
        console.log('connected...')
    }

    catch(err) {    
        console.log('connect failure...!')

    }


} 

module.exports = { connect }