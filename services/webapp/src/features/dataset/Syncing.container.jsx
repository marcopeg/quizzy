import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

const style = {
    wrapper: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 157, 255, 0.98)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
        textAlign: 'center',
    },
    // visible: {
    //     transform: 'translate3d(0, 0, 0)',
    // },
    // hidden: {
    //     transform: 'translate3d(0, 100vh, 0)',
    // },
    message: {
        color: '#fff',
        fontSize: 40,
    },
}

const mapState = ({ dataset }) => ({
    isLoading: dataset.isLoading,
})

const Syncing = ({ isLoading }) => {
    if (!isLoading) {
        return null
    }
    return (
        <div style={[
            style.wrapper,
            isLoading ? style.visible : style.hidden,
        ]}>
            <div style={style.message}>
                downloading<br />fresh words<br />...
            </div>
        </div>
    )
}

Syncing.propTypes = {
    isLoading: PropTypes.bool.isRequired,
}

const StyledSyncing = radium(Syncing)
const ConnectedSyncing = connect(mapState)(StyledSyncing)
export default ConnectedSyncing
