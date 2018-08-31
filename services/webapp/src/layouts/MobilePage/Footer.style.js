import getStyles from 'lib/get-styles'
import { variables } from './MobilePage.style'

const themes = {
    default: {
        footer: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'fixed',
            borderTop: '1px solid #ddd',
            bottom: 0,
            width: '100vw',
            height: variables.default.footerHeight,
            zIndex: 2,
            backgroundColor: '#fff',
        },
    },
}

export default getStyles(themes)
