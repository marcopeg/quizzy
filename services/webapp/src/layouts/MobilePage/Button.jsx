import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Icon from 'components/Flaticon'

import { ThemeContext } from './MobilePage'
import getStyles from './Button.style'

const renderIcon = (pos, { theme, iconPos, icon }) => {
    if (pos !== iconPos) {
        return null
    }

    return (
        <Icon
            type={icon}
            style={[
                getStyles(theme.name, 'button').icon,
                getStyles(theme.name, 'button')[`icon${pos}`],
            ]}
        />
    )
}

const Button = ({ children, icon, iconPos, ...props }) => (
    <ThemeContext.Consumer>
        {theme => (
            <button
                {...props}
                style={getStyles(theme.name, 'button')}
            >
                {renderIcon('left', { theme, iconPos, icon })}
                {children}
                {renderIcon('right', { theme, iconPos, icon })}
            </button>
        )}
    </ThemeContext.Consumer>
)

Button.propTypes = {
    icon: PropTypes.string,
    iconPos: PropTypes.oneOf([ 'left', 'right' ]),
    children: PropTypes.any, // eslint-disable-line
}

Button.defaultProps = {
    icon: null,
    iconPos: null,
    children: null,
}

const StyledButton = radium(Button)
export default StyledButton
