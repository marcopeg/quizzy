
export const initialState = {
    // dataset
    cards: {},

    // status management
    isReady: false,
}

export const initialScore = {
    value: 0,
    nextIteration: new Date(),
    lastIteration: new Date(),
}

/**
 * Actions
 */

export const SET_READY = 'setReady@scores'
export const SET_DATA = 'setData@scores'
export const SET_SCORE = 'setScore@scores'

export const setReady = (value) => ({
    type: SET_READY,
})

export const setData = (data) => ({
    type: SET_DATA,
    payload: data,
})

export const setScore = (id, value, nextIteration) => ({
    type: SET_SCORE,
    payload: { id, value, nextIteration },
})


/**
 * Handlers
 */

export const actionHandlers = {
    [SET_READY]: (state) => ({
        ...state,
        isReady: true,
    }),
    [SET_DATA]: (state, { payload }) => ({
        ...state,
        cards: { ...payload },
    }),
    [SET_SCORE]: (state, { payload }) => ({
        ...state,
        cards: {
            ...state.cards,
            [payload.id]: {
                value: payload.value,
                nextIteration: payload.nextIteration,
                lastIteration: new Date(),
            },
        },
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

