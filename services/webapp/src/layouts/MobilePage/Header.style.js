import getStyles from 'lib/get-styles'
import { colors } from 'styles'
import { variables } from './MobilePage.style'

const themes = {
    ___: {
        leftItems: {
            display: 'flex',
            alignItems: 'center',
        },
    },
    default: {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            height: variables.default.headerHeight,
            width: '100vw',
            zIndex: 2,
            paddingLeft: variables.default.hSpace,
            paddingRight: variables.default.hSpace,
            backgroundColor: colors.primary,
            color: colors.primaryContrast,
        },
    },
    wizard: {
        header: {
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            height: variables.wizard.headerHeight,
            width: '100vw',
            paddingLeft: variables.default.hSpace,
            paddingRight: variables.default.hSpace,
            paddingTop: 10,
            paddingBottom: 10,
        },
    },
}

export default getStyles(themes)
