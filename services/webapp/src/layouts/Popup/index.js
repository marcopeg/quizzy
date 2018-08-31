export { default } from './Popup'

// awful hack to temporarily remove transition from popup
export const overrideDirection = (direction) => {
    window.__layoutPopupOverrideDirection = direction
    setTimeout(() => {
        window.__layoutPopupOverrideDirection = null
    }, 500)
}
