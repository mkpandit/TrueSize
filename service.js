const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const limit = require('express-rate-limit')

/**
 * Define constants to be used in Service
 */
require('dotenv').config()
const port = 3000
// Determine environment development or production
const isProd = process.env.NODE_ENV === 'production'
const origin = {
    origin: isProd ? 'https://true-size.stockx' : '*'
}
/**
 * limiting request
 * 30 request per minute
 */
const limitReq = limit({
    windowMs: 1 * 60 * 1000,
    max: process.env.MAX_REQ_PER_MIN
})

const routes = require('./routes/true-size')

/**
 * Initiate the App
 */
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())
app.use(cors(origin))
app.use(limitReq)

/**
 * Define root router
 */
app.get('/', (request, response) => {
    response.json({ name: 'True to Size Calculation Service' })
})

/**
 * Define /true-size router
 */
app.get('/true-size', routes.trueSize)
app.get('/true-size/:shoe_id', routes.trueSizeByShoeId)
app.post('/true-size', routes.addTrueSize)

/**
 * Start True to Size Calculation service
 */
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})