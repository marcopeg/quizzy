
export const initialState = {
    // dataset
    cards: [],
    cardsMap: {},
    tags: [],
    tagsMap: {},
    types: [],
    typesMap: {},

    // status management
    isReady: false,
    isLoading: false,
}

/**
 * Actions
 */

export const SET_DATASET = 'setDataset@dataset'
export const SET_LOADING = 'setLoading@dataset'
export const SET_READY = 'setReady@dataset'

export const setDataset = ({ cards, types, tags }) => ({
    type: SET_DATASET,
    payload: { cards, types, tags },
})

export const setLoading = (value) => ({
    type: SET_LOADING,
    payload: value,
})

export const setReady = (value) => ({
    type: SET_READY,
})


/**
 * Handlers
 */

export const actionHandlers = {
    [SET_DATASET]: (state, { payload }) => ({
        ...state,
        // set cards objects
        cards: [...payload.cards],
        cardsMap: payload.cards.reduce((acc, curr) => ({
            ...acc,
            [curr.id]: curr,
        }), {}),
        // set types objects
        types: [...payload.types],
        typesMap: payload.types.reduce((acc, curr) => ({
            ...acc,
            [curr]: payload.cards.filter(card => card.type === curr),
        }), {}),
        // set tags objects
        tags: [...payload.tags],
        tagsMap: payload.tags.reduce((acc, curr) => ({
            ...acc,
            [curr]: payload.cards.filter(card => card.tags.indexOf(curr) !== -1),
        }), {}),
    }),
    [SET_LOADING]: (state, { payload }) => ({
        ...state,
        isLoading: payload,
    }),
    [SET_READY]: (state) => ({
        ...state,
        isReady: true,
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

