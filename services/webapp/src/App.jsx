import React from 'react'
// import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Syncing } from 'features/dataset'
import { Cards } from 'features/cards'

/**
 * Component
 */

const App = () => (
    <div>
        <Helmet>
            <html lang="en" />
            <title>quizzy</title>
        </Helmet>
        <Cards />
        <Syncing />
    </div>
)


/**
 *  Decorators & Exports
 */

export default App
