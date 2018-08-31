import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import HeaderControls from './HeaderControls'
import Title from './Title'

import { ThemeContext } from './MobilePage'
import getStyles from './Header.style'

const Header = ({
    title,
    children,
    style,
    backBtn,
    leftComponent,
    leftBtnIcon,
    leftBtnRoute,
    leftBtnHandler,
    rightComponent,
    rightBtnIcon,
    rightBtnRoute,
    rightBtnHandler,
    ...props
}) => (
    <ThemeContext.Consumer>
        {theme => (
            <div
                {...props}
                style={[
                    getStyles(theme.name, 'header'),
                    style,
                ]}
            >
                <div style={getStyles(theme.name, 'leftItems')}>
                    <HeaderControls
                        align="left"
                        backBtn={backBtn}
                        btnIcon={leftBtnIcon}
                        btnRoute={leftBtnRoute}
                        btnHandler={leftBtnHandler}
                        component={leftComponent}
                    />
                    {title ? <Title value={title} /> : null}
                </div>
                <div>{children}</div>
                <div>
                    <HeaderControls
                        align="right"
                        btnIcon={rightBtnIcon}
                        btnRoute={rightBtnRoute}
                        btnHandler={rightBtnHandler}
                        component={rightComponent}
                    />
                </div>
            </div>
        )}
    </ThemeContext.Consumer>
)

Header.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any, // eslint-disable-line
    style: PropTypes.object,
    backBtn: PropTypes.bool,
    leftBtnIcon: PropTypes.string,
    leftBtnRoute: PropTypes.string,
    leftBtnHandler: PropTypes.func,
    leftComponent: PropTypes.any, // eslint-disable-line
    rightBtnIcon: PropTypes.string,
    rightBtnRoute: PropTypes.string,
    rightBtnHandler: PropTypes.func,
    rightComponent: PropTypes.any, // eslint-disable-line
}

Header.defaultProps = {
    title: null,
    children: null,
    style: {},
    backBtn: false,
    leftComponent: null,
    leftBtnIcon: null,
    leftBtnRoute: null,
    leftBtnHandler: null,
    rightComponent: null,
    rightBtnIcon: null,
    rightBtnRoute: null,
    rightBtnHandler: null,
}

const StyledHeader = radium(Header)
export default StyledHeader
