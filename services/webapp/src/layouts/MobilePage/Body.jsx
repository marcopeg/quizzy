import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from './MobilePage'
import getStyles from './Body.style'

/* dev */
// const ps = []
// for (let i = 0; i < 100; i++) {
//     ps.push(i)
// }
/* dev */

const Body = ({ children, style, noScroll, withPadding, ...props }) => (
    <ThemeContext.Consumer>
        {theme => (
            <div
                {...props}
                className="touch-scroll"
                style={[
                    getStyles(theme.name, 'body'),
                    withPadding ? getStyles(theme.name, 'body').withPadding : null,
                    theme.hasHeader ? getStyles(theme.name, 'body').withHeader : null,
                    theme.hasFooter ? getStyles(theme.name, 'body').withFooter : null,
                    theme.hasHeader && theme.hasFooter ? getStyles(theme.name, 'body').withHeaderAndFooter : null,
                    noScroll ? null : getStyles(theme.name, 'body').scrollContent,
                    style,
                ]}
            >
                {children}
                {/* {ps.length ? ps.map(i => <p key={`ps${i}`}>{i}</p>) : null} */}
            </div>
        )}
    </ThemeContext.Consumer>
)

Body.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
    className: PropTypes.string,
    noScroll: PropTypes.bool,
    withPadding: PropTypes.bool.isRequired,
}

Body.defaultProps = {
    style: {},
    className: '',
    noScroll: false,
    // withPadding: false,
}

const StyledBody = radium(Body)

export default StyledBody
