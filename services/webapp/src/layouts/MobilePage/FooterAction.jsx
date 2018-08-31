/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Icon from 'components/Flaticon'
import RadiumLink from 'components/RadiumLink'

import { ThemeContext } from './MobilePage'
import getStyles from './FooterAction.style'

const BadgeComponent = ({ num }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 15,
            right: 30,
            borderRadius: '100%',
            backgroundColor: 'red',
            width: 12,
            height: 12,
            fontSize: 10,
            color: '#fff',
            textAlign: 'center',
        }}>
            <p style={{ marginTop: -2 }}>{num}</p>
        </div>
    )
}

const ComponentBody = radium(({ isActive, style, icon, badge, children }) => (
    <ThemeContext.Consumer>
        {theme => (
            <div
                style={[
                    getStyles(theme.name, 'footerAction'),
                    isActive ? getStyles(theme.name, 'footerAction').isActive : null,
                    style,
                ]}
            >
                {icon ? <Icon type={icon} /> : null }
                {badge === 0 ? null : <BadgeComponent num={badge} />}
                {children}
            </div>
        )}
    </ThemeContext.Consumer>
))

const FooterAction = ({ routeTo, onClick, ...props }) =>
    onClick ? (
        <div onClick={onClick}>
            <ComponentBody {...props} />
        </div>
    ) : (
            <RadiumLink to={routeTo}>
                <ComponentBody {...props} />
            </RadiumLink>
        )

FooterAction.propTypes = {
    style: PropTypes.object,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    routeTo: PropTypes.string,
    isActive: PropTypes.bool,
    badge: PropTypes.number,
    children: PropTypes.any, 
}

FooterAction.defaultProps = {
    style: {},
    icon: null,
    routeTo: '#',
    isActive: false,
    badge: 0,
    onClick: null,
    children: null,
}

const StyledFooterAction = radium(FooterAction)
export default StyledFooterAction
