
export const initialState = {
    cards: [],
    cardsMap: {},
    tags: [],
    tagsMap: {},
    types: [],
    typesMap: {},
}

/**
 * Actions
 */

export const SET_DATASET = 'setDataset@cards'

export const setDataset = ({ cards, types, tags }) => ({
    type: SET_DATASET,
    payload: { cards, types, tags },
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
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

