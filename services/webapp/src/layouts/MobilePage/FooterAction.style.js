import getStyles from 'lib/get-styles'
import { colors } from 'styles'

const themes = {
    default: {
        footerAction: {
            fontSize: 22,
            position: 'relative',
            padding: '15px 25px',
            transition: 'color 0.3s ease',
            color: colors.iconDefault,
            isActive: {
                color: colors.iconActive,
            },
        },
    },
}

export default getStyles(themes)
