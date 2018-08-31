import { colors } from 'styles'
import getStyles from 'lib/get-styles'

const themes = {
    ___: {
        input: {
            ':focus': {
                outline: 'none',
            },
            minWidth: 300,
            fontSize: 16,
            padding: 10,
        },
        error: {
            color: colors.error,
        },
        label: {
            marginBottom: 5,
        },
        message: {
            height: 10,
            margin: '5px 10px',
        },
    },
    default: {
        input: {
            border: `1px solid ${colors.defaultLighter}`,
            color: colors.black,
            borderRadius: 4,
        },
    },
    wizard: {
        input: {
            background: 'none',
            borderTop: 'none',
            borderBottom: `1px solid ${colors.white}`,
            borderRight: 'none',
            borderLeft: 'none',
            color: colors.primaryContrast,
        },
    },
}

export default getStyles(themes)
