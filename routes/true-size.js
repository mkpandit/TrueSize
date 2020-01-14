const pool = require('../db/db')
const logger = require('../helper/logger')

/**
 * Calculate and return true-to-size
 * for all data (regardless shoes)
 * @returns numeric (TrueToSizeCalculation)
 */
const trueSize = (request, response) => {
    pool.query('SELECT AVG(value) AS TrueToSizeCalculation FROM true_size_data', (error, result) => {
        if (error) {
            throw error
        } else {
            if (result.rowCount === 1 && result.rows.length > 0 && result.rows[0].truetosizecalculation !== null){
                response.status(200).json({
                    status: 'ok',
                    data: result.rows[0]
                })
            } else {
                response.status(200).json({
                    status: 'ok',
                    data: 'No data found'
                })
            }
        }
    })
}

/**
 * Calculate and return true-to-size
 * for a specific shoe
 * @returns numeric (TrueToSizeCalculation)
 */
const trueSizeByShoeId = (request, response) => {
    const shoe_id = request.params.shoe_id
    pool.query('SELECT AVG(value) as TrueToSizeCalculation FROM true_size_data WHERE shoe_id = $1', [shoe_id], (error, result) => {
        if (error) {
            throw error
        } else {
            if (result.rowCount === 1 && result.rows.length > 0 && result.rows[0].truetosizecalculation !== null){
                response.status(200).json({
                    status: 'ok',
                    data: result.rows[0]
                })
            } else {
                response.status(200).json({
                    status: 'ok',
                    data: `No data found for shoe Id: ${shoe_id}`
                })
            }
        }
    })
}

/**
 * Adds records to database table
 * shoe_id must be valid (present on shoes table)
 * @returns status and insertId
 * @TO-DO: add validation
 */
const addTrueSize = (request, response) => {
    const { shoe_id, value } = request.body

    // Verify if shoe_id present in shoes table
    pool.query('SELECT name FROM shoes WHERE id = $1', [shoe_id], (error, result) => {
        if (error) {
            throw error
        } else if(result.rowCount > 0) {
            
            // Validate the value (must be >=1 and =<5)
            if (request.body.value > 0 && request.body.value < 6) {
                pool.query('INSERT INTO true_size_data (id, shoe_id, value, added) VALUES (DEFAULT, $1, $2, CURRENT_DATE) RETURNING *', [shoe_id, value], (error, result) => {
                    if (error) {
                        throw error
                    } else {
                        response.status(201).json({
                            status: 'ok',
                            data: `Inserted with ID: ${result.rows[0].id}`
                        })
                        // Add in logger
                        logger.log('info', `Entry added with Id: ${result.rows[0].id}`)
                    }
                })
            } else {
                // Add in logger
                logger.log('error', `Value should be in between 1 - 5, provided value: ${request.body.value}`)
                response.status(202).json({
                    status: 'error'
                })
            }
        } else {
            // Add in logger
            logger.log('error', `shoe_id: ${request.body.shoe_id} is not valid`)
        }
    })
}

module.exports = {
    trueSize,
    addTrueSize,
    trueSizeByShoeId
}