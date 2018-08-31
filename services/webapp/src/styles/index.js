import {
    isMobileSafari,
    isIOS,
} from 'react-device-detect'

import './styles.css'

import color from 'color'
export const fontFamily = 'Verdana'

const colorPrimary = '#2772FF'

export const colors = {
    white: '#fff',
    black: '#000',
    default: '#333',
    defaultLight: '#666',
    defaultLighter: '#aaa',
    primary: colorPrimary,
    primaryContrast: '#fff',
    primaryLight: color(colorPrimary).lighten(0.5),
    primaryDark: color(colorPrimary).darken(0.3),
    error: 'red',

    // so far used in footer actions
    iconDefault: '#767687',
    iconActive: colorPrimary,
    iconDisabled: 'gray',
}

export const fonts = {
    text: {
        fontFamily,
        fontSize: 12,
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 12,
    },
    title: {
        fontFamily,
        fontSize: 16,
    },
}

/**
 * different mobile browsers implement VH in a different way.
 *
 * this value is going to be used as plain css property as well
 * as result of a calc() operation.
 *
 * if this method gets to do more sophisticated javascript calculations
 * with the inner window size or stuff like that, then it's best
 * to return just px
 */
export const getVH = () => {
    if (!isIOS) {
        return '90vh'
    }

    if (isMobileSafari) {
        if (!(window.navigator && window.navigator.standalone)) {
            return '88vh'
        }
    }

    return '100vh'
}
