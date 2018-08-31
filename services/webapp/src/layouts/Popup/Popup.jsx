import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import Icon from 'antd/lib/icon'

import getStyles from './Popup.style'

const Popup = ({
    theme,
    visible,
    children,
    style,
    onClose,
    closeIcon,
    iconPosition,
    slideFrom,
    ...props
}) => {
    const styles = getStyles()

    // set the proper direction as configured for the popup
    switch (slideFrom) {
        case 'right':
            styles.wrapper.transform = 'translate3d(105vw, 0, 0)'
            break
        case 'left':
            styles.wrapper.transform = 'translate3d(-105vw, 0, 0)'
            break
        case 'top':
            styles.wrapper.transform = 'translate3d(0, -105vh, 0)'
            break
        case 'bottom':
            styles.wrapper.transform = 'translate3d(0, 105vh, 0)'
            break
    }

    // handle the awful hack to abort transition
    if (window.__layoutPopupOverrideDirection) {
        styles.wrapper.transition = 'none'
    }

    return (
        <div
            {...props}
            style={[
                styles.wrapper,
                styles.theme[theme].wrapper,
                visible ? styles.visible : styles.hidden,
                style,
            ]}
        >
            <div style={styles.inner}>
                {children}
            </div>
            {onClose ? (
                <div
                    style={[
                        iconPosition === 'right' ? styles.theme[theme].closeRight : styles.theme[theme].closeLeft,
                    ]}
                    onClick={onClose}
                >
                    <Icon
                        type={closeIcon}
                        style={styles.theme[theme].closeIcon}
                    />
                </div>
            ) : null}
        </div>
    )
}

Popup.propTypes = {
    theme: PropTypes.oneOf([ 'default', 'input' ]),
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    closeIcon: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any, // eslint-disable-line
    slideFrom: PropTypes.string,
    iconPosition: PropTypes.string,
}

Popup.defaultProps = {
    theme: 'default',
    visible: false,
    onClose: null,
    closeIcon: 'close',
    style: {},
    slideFrom: 'bottom',
    iconPosition: 'right',
    children: null,
}

const StyledPage = radium(Popup)
export default StyledPage
