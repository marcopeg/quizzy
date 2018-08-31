import React from 'react'
// import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from './MobilePage'

import './Input.style.css'
import getStyles from './Input.style'

const Input = (props) => (
    <ThemeContext.Consumer>
        {theme => (
            <input
                {...props}
                className={`mp__input mp-${theme.name}__input`}
                style={[
                    getStyles(theme.name, 'input'),
                ]}
            />
        )}
    </ThemeContext.Consumer>
)

// Input.propTypes = {
//     value: PropTypes.string.isRequired,
// }

// Input.defaultProps = {
//     color: null,
// }

const StyledInput = radium(Input)
export default StyledInput
