import { colors } from 'styles'

const getStyles = () => ({
    wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // width: '100vw',
        // height: '100vh',
        background: colors.white,
        zIndex: 3,
        transform: 'translate3d(0, 105vh, 0)',
        transition: 'transform 0.3s ease-in',
    },
    inner: {
        position: 'relative',
    },
    visible: {
        transform: 'translate3d(0, 0, 0)',
    },
    hidden: {},

    theme: {
        default: {
            closeIcon: {
                fontSize: 20,
                color: colors.primaryContrast,
            },
            closeRight: {
                position: 'fixed',
                top: 0,
                right: 0,
                padding: '20px 10px',
                zIndex: 2,
                cursor: 'pointer',
            },
            closeLeft: {
                position: 'fixed',
                top: 0,
                left: 0,
                padding: '20px 10px',
                zIndex: 2,
                cursor: 'pointer',
            },
        },
    },
})

export default getStyles
