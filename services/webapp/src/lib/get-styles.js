/**
 * Pick a property from a theme with memoization
 *
 */
const getStylesFactory = styles => {
    const getStyles = (theme, prop) => {
        const cacheName = `${theme}${prop}`
        if (getStyles[cacheName] !== undefined) {
            return getStyles[cacheName]
        }

        const baseStyle = styles.___
            ? (styles.___[prop] || {})
            : {}

        try {
            getStyles[cacheName] = {
                ...baseStyle,
                ...(styles[theme][prop] || {}),
            }
        } catch (e) {
            getStyles[cacheName] = {}
        }

        // console.log('get', theme, prop, getStyles[cacheName])
        return getStyles[cacheName]
    }

    return getStyles
}

export default getStylesFactory
