require('dotenv').config()
const Pool = require('pg').Pool

const isProd = process.env.NODE_ENV === 'production'

/**
 * Establish connection to database
 * Database credentials served from .env
 */
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.DB_PORT,
    ssl: isProd
})

module.exports = pool