import getStyles from 'lib/get-styles'

const themes = {
    wizard: {
        button: {
            display: 'inline-block',
            border: '1px solid #fff',
            background: 'transparent',
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            icon: {
                fontSize: '0.9em',
            },
            iconleft: {
                marginRight: 5,
            },
            iconright: {
                marginLeft: 5,
            },
        },
    },
}

export default getStyles(themes)
