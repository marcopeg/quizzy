import getStyles from 'lib/get-styles'
import { colors } from 'styles'
import { variables } from './MobilePage.style'

const themes = {
    ___: {
        headerButton: {
            cursor: 'pointer',
            fontSize: variables.default.headerHeight * 0.35,
            color: '#fff',
            fontWeight: 800,
        },
        headerLink: {
            cursor: 'pointer',
        },
    },
    default: {
        headerControls: {
            height: variables.default.headerHeight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            leftSide: {
                paddingRight: 10,
            },
            rightSide: {
                position: 'absolute',
                top: 0,
                right: variables.default.hSpace,
            },
        },
        headerLink: {
            color: colors.primary,
        },
    },

    wizard: {
        headerControls: {
            color: '#fff',

            leftSide: {
                fontSize: 20,
            },

            rightSide: {
                position: 'fixed',
                top: 15,
                right: 20,
            },
        },
    },
}

export default getStyles(themes)
