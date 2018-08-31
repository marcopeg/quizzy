import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from '../MobilePage'
import './Input.style.css'
import getStyles from './Input.style'

// Normal input wrapped with radium
const StyledInput = radium(props => <input {...props} />)

class Input extends React.PureComponent {
    state = {
        value: '',
    }

    onEnterHandler = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnterPress(e)
        }
    }

    onChangeHandler = (e) => {
        if (this.props.withState) {
            this.setState({
                value: e.target.value,
            })
        } else {
            this.props.onChange(e)
        }
    }

    inputHeader = (theme) => {
        if (this.props.label) {
            return (
                <div style={getStyles(theme.name, 'label')}>
                    {this.props.label}
                </div>
            )
        }
    }

    inputFooter = (theme) => {
        let cmp = null

        if (this.props.helperComponent) {
            cmp = this.props.helperComponent
        }

        if (this.props.errorMessage) {
            cmp = (
                <span style={getStyles(theme.name, 'error')}>
                    {this.props.errorMessage}
                </span>
            )
        }

        return (
            <div style={getStyles(theme.name, 'message')}>
                {cmp}
            </div>
        )
    }

    render () {
        const fullWidthInput = this.props.fullWidth
            ? { width: '100%' }
            : {}

        return (
            <ThemeContext.Consumer>
                {theme => (
                    <div style={getStyles(theme.name, 'wrapper')}>
                        {this.inputHeader(theme)}
                        <StyledInput
                            type={this.props.type}
                            onChange={this.onChangeHandler}
                            value={this.props.withState ? this.state.value : this.props.value}
                            placeholder={this.props.placeholder}
                            className={`mp__input mp-${theme.name}__input`}
                            style={[
                                getStyles(theme.name, 'input'),
                                fullWidthInput,
                            ]}
                            onKeyDown={this.onEnterHandler}
                            onBlur={this.props.onBlur}
                            onFocus={this.props.onFocus}
                            spellCheck={this.props.spellCheck}
                            disabled={this.props.disabled}
                            autoFocus={this.props.autoFocus}
                        />
                        {this.inputFooter(theme)}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    type: PropTypes.string,
    spellCheck: PropTypes.bool,
    withState: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onEnterPress: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    label: PropTypes.any, // eslint-disable-line
    helperComponent: PropTypes.any, // eslint-disable-line
    rightBottomComponent: PropTypes.any, // eslint-disable-line
}

Input.defaultProps = {
    value: '',
    placeholder: '',
    type: 'text',
    label: null,
    errorMessage: null,
    spellCheck: false,
    withState: false,
    disabled: false,
    fullWidth: false,
    autoFocus: false,
    onChange: () => null,
    onEnterPress: () => null,
    onBlur: () => null,
    onFocus: () => null,
    helperComponent: null,
    rightBottomComponent: null,
}

export default Input
