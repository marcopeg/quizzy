/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from '../MobilePage'
import './TextArea.style.css'
import getStyles from './TextArea.style'

// Normal TextArea wrapped with radium
const StyledTextArea = radium(props => <textarea {...props} />)

class TextArea extends React.PureComponent {
    state = {
        value: ''
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

    onEnter = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnterPress(e)
        }
    }

    textAreaFooter = (theme) => {
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

    render() {
        const fullWidthTextArea = this.props.fullWidth
            ? { width: '100%' }
            : {}

        return (
            <ThemeContext.Consumer>
                {theme => (
                    <div style={getStyles(theme.name, 'wrapper')}>
                        <StyledTextArea
                            onChange={this.props.onChange}
                            value={this.props.withState ? this.state.value : this.props.value}
                            placeholder={this.props.placeholder}
                            className={`mp__textarea mp-${theme.name}__textarea`}
                            style={[getStyles(theme.name, 'textarea'), fullWidthTextArea]}
                            onKeyDown={this.onEnter}
                            onBlur={this.props.onBlur}
                            onFocus={this.props.onFocus}
                            rows={this.props.rows}
                            spellCheck={this.props.spellCheck}
                            autoFocus={this.props.autoFocus}
                            disabled={this.props.disabled}
                        />
                        {this.textAreaFooter(theme)}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

TextArea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    onEnterPress: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    rows: PropTypes.number,
    spellCheck: PropTypes.bool,
    autoFocus: PropTypes.bool,
    fullWidth: PropTypes.bool,
    withState: PropTypes.bool,
    disabled: PropTypes.bool,
}

TextArea.defaultProps = {
    value: '',
    placeholder: '',
    onChange: () => null,
    onEnterPress: () => null,
    onBlur: () => null,
    onFocus: () => null,
    rows: 1,
    spellCheck: false,
    autoFocus: false,
    fullWidth: false,
    withState: false,
    disabled: false,
}

export default TextArea
