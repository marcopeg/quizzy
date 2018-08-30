import moment from 'moment'
import shuffle from 'shuffle-array'
import { scoreOk, scoreKo } from 'features/scores'

import {
    setDeck,
    setDeckCompleted,
    setCurrentCard,
    setResult,
    resetResults,
} from './cards.reducer'

export const selectDeck = () => (dispatch, getState) => {
    const now = Date.now()
    const { dataset, scores, cards } = getState()
    const withResults = dataset.cards
        .map((card) => {
            return {
                ...card,
                score: scores.cards[card.id] ? scores.cards[card.id].value : 0,
                delay: scores.cards[card.id] ? moment(scores.cards[card.id].nextIteration).valueOf() : now,
            }
        })
        .filter(card => card.delay <= now)

    // sort from shorter words to longher
    withResults.sort((a, b) => a.score - b.score)

    const candidates = withResults.slice(0, cards.deckSize * 2)
    shuffle(candidates)

    dispatch(setDeck(candidates.slice(0, cards.deckSize)))
}

// finds out cards in the deck that still need some work
export const getAvailableDeckCards = () => (dispatch, getState) => {
    const now = Date.now()
    const { cards } = getState()
    const availableDeck = cards.deck
        .map((card) => {
            return {
                ...card,
                score: cards.results[card.id] ? cards.results[card.id].score : 0,
                delay: cards.results[card.id] ? cards.results[card.id].delay : now,
            }
        })
        .filter(card => card.delay <= now)

    availableDeck.sort((a, b) => a.score - b.score)
    return availableDeck
}

export const selectNextCard = () => async (dispatch, getState) => {
    const availableDeck = await dispatch(getAvailableDeckCards())

    if (availableDeck.length) {
        dispatch(setCurrentCard(availableDeck[0]))
    } else {
        dispatch(setDeckCompleted())
    }
}

export const randomizeNextCard = () => async (dispatch, getState) => {
    const { cards } = getState()
    const availableDeck = await dispatch(getAvailableDeckCards())

    const nextCardSet = availableDeck.length
        ? [...availableDeck]
        : [...cards.deck]

    shuffle(nextCardSet)
    dispatch(setCurrentCard(nextCardSet[0]))
}

export const cardOk = (card) => (dispatch, getState) => {
    const { cards } = getState()
    const result = cards.results[card.id]
        ? ({ ...cards.results[card.id] })
        : ({
            score: 0,
            delay: 0,
        })

    result.score = result.score >= 0
        ? result.score += 1
        : 1

    result.delay = moment().add(cards.cardDelay * result.score, 's').valueOf()

    dispatch(setResult(card.id, result))
    dispatch(selectNextCard())
    dispatch(scoreOk(card))
}

export const cardKo = (card) => (dispatch, getState) => {
    const { cards } = getState()
    const result = cards.results[card.id]
        ? ({ ...cards.results[card.id] })
        : ({
            score: 0,
            delay: 0,
        })

    result.score -= 1

    dispatch(setResult(card.id, result))
    dispatch(randomizeNextCard())
    dispatch(scoreKo(card))
}

export const initDeck = () => (dispatch) => {
    dispatch(selectDeck())
    dispatch(selectNextCard())
}

export const replayDeck = () => (dispatch) => {
    dispatch(resetResults())
    dispatch(selectNextCard())
}

// export const init = () => async (dispatch) => {
//     const dataset = await dispatch(fetchDataset())
//     dispatch(setDataset(dataset))
//     dispatch(initDeck())
// }
