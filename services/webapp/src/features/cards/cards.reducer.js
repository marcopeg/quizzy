
export const initialState = {
    // status of the game
    deckSize: 7,
    cardDelay: 45,
    deck: [],
    currentCard: null,
    isDeckCompleted: false,

    // keep track of the results
    results: {},
}

/**
 * Actions
 */

export const SET_DECK = 'setDeck@cards'
export const SET_DECK_COMPLETED = 'setDeckCompleted@cards'
export const SET_CURRENT_CARD = 'setCurrentCard@cards'
export const SET_RESULT = 'setResult@cards'
export const RESET_RESULTS = 'resetResults@cards'

export const setDeck = deck => ({
    type: SET_DECK,
    payload: deck,
})

export const setDeckCompleted = () => ({
    type: SET_DECK_COMPLETED,
})

export const setCurrentCard = card => ({
    type: SET_CURRENT_CARD,
    payload: card,
})

export const setResult = (id, data) => ({
    type: SET_RESULT,
    payload: { id, data },
})

export const resetResults = () => ({
    type: RESET_RESULTS,
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET_DECK]: (state, { payload }) => ({
        ...state,
        isDeckCompleted: false,
        deck: [...payload],
    }),
    [SET_DECK_COMPLETED]: (state) => ({
        ...state,
        isDeckCompleted: true,
        currentCard: null,
    }),
    [SET_CURRENT_CARD]: (state, { payload }) => ({
        ...state,
        currentCard: payload ? { ...payload } : null,
    }),
    [SET_RESULT]: (state, { payload }) => ({
        ...state,
        results: {
            ...state.results,
            [payload.id]: { ...payload.data },
        },
    }),
    [RESET_RESULTS]: (state) => ({
        ...state,
        isDeckCompleted: false,
        results: {},
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

