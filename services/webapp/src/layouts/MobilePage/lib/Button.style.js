import { colors } from 'styles'
import getStyles from 'lib/get-styles'

const themes = {
    ___: {
        wrapper: {
            display: 'inline-block',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: colors.primaryContrast,
            borderRadius: 4,
            padding: '5px 10px',
            cursor: 'pointer',
        },
        isClicked: {
            backgroundColor: 'yellow',
        },
    },
    default: {
        wrapper: {
            backgroundColor: colors.primary,
            color: colors.primaryContrast,
        },
    },
    wizard: {
        wrapper: {
            borderColor: colors.primaryContrast,
            color: colors.primaryContrast,
        },
    },
}

export default getStyles(themes)
