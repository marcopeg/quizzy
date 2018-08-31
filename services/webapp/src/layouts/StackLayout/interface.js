
const stack = []
const listeners = []
const routes = []

const notify = (evt, item) =>
    listeners.forEach(l => l(evt, item, [...stack]))

export const subscribe = (fn) => {
    listeners.push(fn)
}

export const open = (component, props = {}, popupProps = {}, method = 'push') => {
    const item = {
        id: Date.now(),
        component,
        props,
        popupProps,
    }

    // pushes the history so to keep a back button compatibility
    open.history && open.history[method](`${popupProps.location || ''}?stack=${item.id}`)

    stack.push(item)
    notify('open', item)
}

export const close = () => {
    close.history && close.history.goBack()
}

export const init = (history) => {
    open.history = history
    close.history = history

    history.listen((location, action) => {
        if (action === 'POP' && stack.length) {
            const item = stack.pop()
            notify('close', item)
        }
    })
}

/**
 * An interface to persist stacked popups after page reload
 */

export const register = (url, cmp, cmpProps, popupProps) => {
    routes.push({ url, cmp, cmpProps, popupProps })
}

export const triggerRoutes = (history) => {
    const route = routes
        .filter(route => history.location.pathname === route.url)
        .shift()

    if (route) {
        open(route.cmp, route.cmpProps, route.popupProps, 'replace')
    }
}
