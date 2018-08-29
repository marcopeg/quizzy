import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

const style = {
    wrapper: {
        margin: '20px 10px',
        textAlign: 'center',
        fontSize: 20,
        color: '#444',
    },
}

const Title = ({ value }) => (
    <div style={style.wrapper}>{value}</div>
)

Title.propTypes = {
    value: PropTypes.string.isRequired,
}

export default radium(Title)
