import getStyles from 'lib/get-styles'

export const variables = {
    default: {
        hSpace: 20,
        headerHeight: 60,
        footerHeight: 60,
    },
    wizard: {
        hSpace: 20,
        headerHeight: 80,
        footerHeight: 60,
    },
}

const themes = {
    ___: {
        wrapper: {
            position: 'relative',
        },
    },

    wizard: {
        wrapper: {
            background: 'linear-gradient(#23232B, #2772FF)',
            height: '100vh',
        },
    },
}

export default getStyles(themes)
