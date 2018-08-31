import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import FooterAction from './FooterAction'

import Title from './Title'

import './MobilePage.css'
import getStyles from './MobilePage.style'

export const ThemeContext = React.createContext('default')

// used to check wheather the page has a specific
// component as a children
const hasComponent = (children, cmp) =>
    React.Children.toArray(children).find(i => i.type === cmp) !== undefined

const MobilePage = ({ children, style, theme, ...props }) => (
    <ThemeContext.Provider
        value={{
            name: theme,
            hasHeader: hasComponent(children, Header),
            hasFooter: hasComponent(children, Footer),
            hasBody: hasComponent(children, Body),
        }}
    >
        <div
            {...props}
            style={[
                getStyles(theme, 'wrapper'),
                style,
            ]}
        >
            {children}
        </div>
    </ThemeContext.Provider>
)

MobilePage.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
    theme: PropTypes.oneOf([ 'default', 'wizard' ]),
}

MobilePage.defaultProps = {
    style: {},
    theme: 'default',
}

MobilePage.Header = Header
MobilePage.Body = Body
MobilePage.Footer = Footer
MobilePage.FooterAction = FooterAction
MobilePage.Title = Title

const StyledPage = radium(MobilePage)
export default StyledPage
