import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

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
        <Route path="/:cardId?" component={Cards} />
    </div>
)


/**
 *  Decorators & Exports
 */

export default App
