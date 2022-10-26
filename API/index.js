const express = require('express')
const { urlencoded } = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')


dotenv.config();

//db
const db = require('./src/config/db')
db.connect()

const route = require('./src/routes')

const PORT = 5000
const app = express()

app.use(cors())
app.use(morgan('combined'))

//middleware-----------
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//---------------------

route(app)


app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`)
})




