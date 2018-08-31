import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

const Flaticon = ({ type, style }) => (
    <i className={`flaticon-${type}`} style={style} />
)

Flaticon.propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.any, // eslint-disable-line
}

Flaticon.defaultProps = {
    style: null,
}

const StyledFlaticon = radium(Flaticon)
export default StyledFlaticon
