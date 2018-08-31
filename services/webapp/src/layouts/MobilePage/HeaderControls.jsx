import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Icon from 'antd/lib/icon'
import Link from 'components/RadiumLink'
import Button from 'layouts/MobilePage/lib/Button'

import { ThemeContext } from './MobilePage'
import getStyles from './HeaderControls.style'

const iconTypes = {
    close: 'close',
    setting: 'setting',
    left: 'left',
    right: 'right',
    save: {
        value: 'Save',
        isBtn: true,
    },
}

const HeaderControls = ({
    align,
    backBtn,
    btnIcon,
    btnRoute,
    btnHandler,
    component,
    style,
    ...props
}, context) => {
    if (!component && !btnIcon && !backBtn) {
        return null
    }

    // generic action button (depends on theme)
    const getBtnCmp = theme => {
        let btnCmp = null
        if (btnIcon && iconTypes[btnIcon]) {
            if (iconTypes[btnIcon].isBtn) {
                btnCmp = (
                    <Button onClick={btnHandler}>{iconTypes[btnIcon].value}</Button>
                )
            } else {
                btnCmp = (
                    <Icon
                        type={iconTypes[btnIcon]}
                        style={getStyles(theme.name, 'headerButton')}
                        onClick={btnHandler}
                    />
                )
            }
        }
        if (btnRoute) {
            btnCmp = (
                <Link
                    to={btnRoute}
                    style={getStyles(theme.name, 'headerLink')}
                >
                    {btnCmp}
                </Link>
            )
        }

        return btnCmp
    }

    // backBtn (depends on theme)
    const getBackBtnCmp = (theme) => {
        let backBtnCmp = null
        if (backBtn) {
            backBtnCmp = (
                <Icon
                    type={iconTypes['left']}
                    style={getStyles(theme.name, 'headerButton')}
                    onClick={context.router.history.goBack}
                />
            )
        }

        return backBtnCmp
    }

    return (
        <ThemeContext.Consumer>
            {theme => (
                <div
                    {...props}
                    style={[
                        getStyles(theme.name, 'headerControls'),
                        getStyles(theme.name, 'headerControls')[`${align}Side`],
                        style,
                    ]}
                >
                    {getBackBtnCmp(theme)}
                    {getBtnCmp(theme)}
                    {component}
                </div>
            )}
        </ThemeContext.Consumer>
    )
}

// used to get access to the router history
HeaderControls.contextTypes = {
    router: PropTypes.object,
}

HeaderControls.propTypes = {
    align: PropTypes.oneOf([ 'left', 'right' ]),
    backBtn: PropTypes.bool,
    btnIcon: PropTypes.string,
    btnRoute: PropTypes.string,
    btnHandler: PropTypes.func,
    component: PropTypes.any, // eslint-disable-line
    style: PropTypes.object,
}

HeaderControls.defaultProps = {
    align: 'left',
    backBtn: false,
    btnIcon: null,
    btnRoute: null,
    btnHandler: null,
    component: null,
    style: {},
}

const StyledHeaderControls = radium(HeaderControls)

export default StyledHeaderControls
