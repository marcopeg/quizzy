import { colors } from 'styles'
import getStyles from 'lib/get-styles'

const themes = {
    ___: {
        textarea: {
            ':focus': {
                outline: 'none',
            },
            minWidth: 300,
            fontSize: 16,
            resize: 'none',
            padding: 10,
            borderRadius: 4,
        },
    },
    default: {
        textarea: {
            border: `1px solid ${colors.defaultLighter}`,
            color: colors.black,
        },
    },
    wizard: {
        textarea: {
            background: 'none',
            border: `1px solid ${colors.white}`,
            color: colors.primaryContrast,
        },
    },
}

export default getStyles(themes)
