import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from '../MobilePage'
import getStyles from './Button.style'

class Button extends React.PureComponent {
    static propTypes = {
        children: PropTypes.any, // eslint-disable-line
        component: PropTypes.func,
        onClick: PropTypes.func,
        style: PropTypes.object,
    }

    static defaultProps = {
        children: null,
        component: null,
        onClick: () => null,
        style: {},
    }

    componentWillUnmount () {
        clearTimeout(this.timer)
    }

    state = {
        isClicked: false,
    }

    clickHandler = () => {
        this.props.onClick()
        this.setState({ isClicked: true })
        this.timer = setTimeout(() => this.setState({ isClicked: false }), 250)
    }

    render () {
        const {
            children,
            component,
            style,
        } = this.props

        return (
            <ThemeContext.Consumer>
                {theme => (
                    <div
                        onClick={this.clickHandler}
                        style={[
                            getStyles(theme.name, 'wrapper'),
                            this.state.isClicked ? getStyles(theme.name, 'isClicked') : null,
                            style,
                        ]}
                    >
                        {component ? React.createElement(component, { theme }) : children}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const StyledButton = radium(Button)
export default StyledButton
