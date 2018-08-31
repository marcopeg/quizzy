import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from './MobilePage'
import getStyles from './Title.style'

const Title = ({ value, color }) => (
    <ThemeContext.Consumer>
        {theme => (
            <span style={[
                getStyles(theme.name, 'title'),
                color ? { color } : null, // custom color
            ]}>{value}</span>
        )}
    </ThemeContext.Consumer>
)

Title.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
}

Title.defaultProps = {
    color: null,
}

const StyledTitle = radium(Title)
export default StyledTitle
