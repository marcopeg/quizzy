// import { colors } from 'styles'
import getStyles from 'lib/get-styles'

const themes = {
    default: {
        wrapper: {
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#666',
            borderRadius: 4,

        },
        item: {
            borderBottom: '1px solid #666',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,

            isSelected: {
                backgroundColor: '#ddd',
            },
            firstChild: {
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
            },
            lastChild: {
                borderBottomWidth: 0,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
            },
        },
    },

    wizard: {
        wrapper: {
            marginTop: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#fff',
            borderRadius: 4,

        },
        item: {
            borderBottom: '1px solid #fff',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,

            isSelected: {
                backgroundColor: '#fff',
                color: '#000',
                borderBottomColor: '#ddd',
            },
            firstChild: {
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
            },
            lastChild: {
                borderBottomWidth: 0,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
            },
        },
    },
}

export default getStyles(themes)
