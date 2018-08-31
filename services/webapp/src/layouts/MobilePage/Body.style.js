import getStyles from 'lib/get-styles'
import { getVH } from 'styles'
import { variables } from './MobilePage.style'

const themes = {
    default: {
        body: {
            position: 'fixed',
            width: '100vw',
            height: getVH(),
            overflow: 'hidden',
            withPadding: {
                paddingTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
            },
            withHeader: {
                top: variables.default.headerHeight,
                height: `calc(${getVH()} - ${variables.default.headerHeight}px)`,
            },
            withFooter: {
                bottom: variables.default.footerHeight,
                height: `calc(${getVH()} - ${variables.default.footerHeight}px)`,
            },
            withHeaderAndFooter: {
                height: `calc(${getVH()} - ${variables.default.headerHeight}px) - ${variables.default.footerHeight}px)`,
            },
            scrollContent: {
                overflow: 'scroll',
            },
        },
    },
    wizard: {
        body: {
            position: 'fixed',
            width: '100vw',
            height: getVH(),
            overflow: 'hidden',
            paddingLeft: variables.wizard.hSpace,
            paddingRight: variables.wizard.hSpace,
            color: 'white',
            withHeader: {
                top: variables.wizard.headerHeight,
                height: `calc(${getVH()} - ${variables.wizard.headerHeight}px)`,
            },
        },
    },
}

export default getStyles(themes)
