
export const initialState = {
    // dataset
    cards: [],
    cardsMap: {},
    tags: [],
    tagsMap: {},
    types: [],
    typesMap: {},

    // status of the game
    deckSize: 10,
    deck: [],
    currentCard: null,

    // keep track of the results
    results: {},
}

/**
 * Actions
 */

export const SET_DATASET = 'setDataset@cards'
export const SET_DECK = 'setDeck@cards'
export const SET_CURRENT_CARD = 'setCurrentCard@cards'
export const SET_RESULT = 'setResult@cards'

export const setDataset = ({ cards, types, tags }) => ({
    type: SET_DATASET,
    payload: { cards, types, tags },
})

export const setDeck = deck => ({
    type: SET_DECK,
    payload: deck,
})

export const setCurrentCard = card => ({
    type: SET_CURRENT_CARD,
    payload: card,
})

export const setResult = (id, data) => ({
    type: SET_RESULT,
    payload: { id, data },
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
    [SET_DECK]: (state, { payload }) => ({
        ...state,
        deck: [...payload],
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
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

