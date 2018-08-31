
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import { initDeck } from 'features/cards'
import { resync } from 'features/dataset'

import MobilePage from 'layouts/MobilePage'
import Button from 'layouts/MobilePage/lib/Button'

const mapState = () => ({})
const mapDispatch = (dispatch, { history }) => ({
    play: () => {
        dispatch(initDeck())
        history.push('/play')
    },
    stats: () => {
        history.push('/stats')
    },
    resync: () => dispatch(resync()),
})

const Home = ({
    play,
    stats,
    resync,
}) => (
    <MobilePage>
        <MobilePage.Header title={'QuizzY'} />
        <MobilePage.Body withPadding>
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 25, marginTop: 25 }}>
                    <Button onClick={play}>play</Button>
                </div>
                <div style={{ marginBottom: 25, marginTop: 25 }}>
                    <Button onClick={stats}>view stats</Button>
                </div>
                <div style={{ marginBottom: 25, marginTop: 25 }}>
                    <Button onClick={resync}>download new words</Button>
                </div>
            </div>
        </MobilePage.Body>
    </MobilePage>
)

Home.propTypes = {
    play: PropTypes.func.isRequired,
    stats: PropTypes.func.isRequired,
    resync: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(radium(Home))
