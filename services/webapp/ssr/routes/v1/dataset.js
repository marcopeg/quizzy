const express = require('express')
const GoogleSpreadsheet = require('google-spreadsheet')

const GOOGLE_SHEET_CODE = '1TavfZyGXE1UJnJsdJ2qtFGz29SPAlLLyzXAn6bDDwjA'
const CACHE_DURATION = 1000 * 15


/**
 * Custom Middlewares
 * they compose the core logic for this router
 */

const getDocument = (code) => (req, res, next) => {
    req.gdoc = new GoogleSpreadsheet(code)
    next()
}

const getInfo = () => async (req, res, next) => {
    req.gdoc.getInfo((err, info) => {
        if (err) {
            res.status(500).send(err.message)
            return
        }
        req.gdocInfo = info
        req.gdocSheet = info.worksheets[0]
        next()
    })
}

// @TODO: read multiple pages when the data becomes huge
const fetchRows = () => async (req, res, next) => {
    req.datasetRows = []
    req.gdocSheet.getRows({
        offset: 1,
        limit: 10000,
    }, (err, rows) => {
        if (err) {
            res.status(500).send(err.message)
            return
        }

        const dataset = rows
            .filter(row => row.id)
            .map(row => ({
                id: row.id.toString(),
                se: row.se.trim().toLowerCase(),
                en: row.en.trim().toLowerCase(),
                type: row.type.trim().toLowerCase(),
                tags: (row.tags || '')
                    .split(',')
                    .map(i => i.trim().toLowerCase())
                    .filter(i => i),
            }))

        req.datasetRows = [
            ...req.datasetRows,
            ...dataset,
        ]
        next()
    })
}

const prepareDataset = () => async (req, res, next) => {
    const cards = req.datasetRows
    const types = cards.reduce((acc, curr) => (
        (acc.indexOf(curr.type) === -1)
            ? [ ...acc, curr.type ]
            : acc
    ), [])

    const tags = cards.reduce((acc, curr) => {
        const newTags = curr.tags.reduce((newTags, curr) => (
            (acc.indexOf(curr) === -1)
                ? [ ...newTags, curr ]
                : newTags
        ), [])

        return [
            ...acc,
            ...newTags,
        ]
    }, [])

    req.dataset = { cards, types, tags }
    next()
}

/**
 * Router creator
 * it can receive configuration as parameter
 */

const createDatasetRouter = () => {
    const router = express.Router()
    let cache = null

    router.get('/', [
        // check in memory cache with expiration control
        (req, res, next) => {
            if (cache === null || (Date.now() - cache.created) > CACHE_DURATION) {
                return next()
            }
            res.send(cache.value)
        },
        getDocument(GOOGLE_SHEET_CODE),
        getInfo(),
        fetchRows(),
        prepareDataset(),
        // write in memory cache and send out results
        (req, res) => {
            cache = {
                value: req.dataset,
                created: Date.now(),
            }
            res.send(req.dataset)
        },
    ])

    return router
}

module.exports = {
    createDatasetRouter,
}
