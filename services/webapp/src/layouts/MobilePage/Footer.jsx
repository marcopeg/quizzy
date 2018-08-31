import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from './MobilePage'
import getStyles from './Footer.style'

const Footer = ({ children, style }) => (
    <ThemeContext.Consumer>
        {theme => (
            <div
                style={[
                    getStyles(theme.name, 'footer'),
                    style,
                ]}
            >
                {children}
            </div>
        )}
    </ThemeContext.Consumer>
)

Footer.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
}

Footer.defaultProps = {
    style: {},
}

const StyledFooter = radium(Footer)
export default StyledFooter
