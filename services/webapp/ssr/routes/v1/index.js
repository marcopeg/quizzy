const express = require('express')
const bodyParser = require('body-parser')

/**
 * Import sub routers
 */

const { createDatasetRouter } = require('./dataset')

/**
 * Router creator
 * it can receive configuration as parameter
 */

const createApiRouter = () => {
    const router = express.Router()

    router.use(bodyParser.json())

    router.use('/dataset', [
        createDatasetRouter(),
    ])

    router.get('/', (req, res) => res.send('+ok api v1'))

    return router
}

module.exports = {
    createApiRouter,
}
