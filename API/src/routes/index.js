const coursesRouter = require('./course')
const authRouter = require('./auth')
const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const orderRouter = require('./order')
const stripeRouter = require('./stripe')

function route(app) {
    app.use('/courses', coursesRouter)
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/products', productRouter)
    app.use('/cart', cartRouter)
    app.use('/order', orderRouter)
    app.use('/checkout', stripeRouter)
}

module.exports = route
