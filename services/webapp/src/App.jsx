import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Syncing } from 'features/dataset'
import { Cards } from 'features/cards'
import { Stats } from 'features/stats'

/**
 * Component
 */

const App = () => (
    <div>
        <Helmet>
            <html lang="en" />
            <title>quizzy</title>
        </Helmet>
        <Route path="/" exact component={Cards} />
        <Route path="/stats" exact component={Stats} />
        <Syncing />
    </div>
)


/**
 *  Decorators & Exports
 */

export default App
