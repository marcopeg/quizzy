import getStyles from 'lib/get-styles'

const themes = {
    ___: {
        title: {
            display: 'block',
        },
    },
    default: {
        title: {
            fontSize: '16pt',
        },
    },
    wizard: {
        title: {
            color: 'white',
            fontSize: 18,
        },
    },
}

export default getStyles(themes)
