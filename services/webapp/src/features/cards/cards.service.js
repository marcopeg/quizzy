import papa from 'papaparse'
import moment from 'moment'
import shuffle from 'shuffle-array'
import csvSource from './cards-csv'
import { setDataset, setDeck, setCurrentCard, setResult } from './cards.reducer'

export const parseCsv = (source) => () => {
    const result = papa.parse(source)

    const cards = result.data
        .filter(i => i[0])
        .map(item => ({
            id: item[0],
            en: item[2],
            se: item[1],
            type: item[3].trim().toLowerCase(),
            tags: (item[4] || '')
                .split(',')
                .map(i => i.trim().toLowerCase())
                .filter(i => i),
        }))

    const types = cards.reduce((acc, curr) => (
        (acc.indexOf(curr.type) === -1)
            ? [ ...acc, curr.type ]
            : acc
    ), [])

    const tags = cards.reduce((acc, curr) => {
        const newTags = curr.tags.reduce((newTags, curr) => (
            (acc.indexOf(curr) === -1)
                ? [ ...newTags, curr ]
                : newTags
        ), [])

        return [
            ...acc,
            ...newTags,
        ]
    }, [])

    return { cards, types, tags }
}

export const selectDeck = () => (dispatch, getState) => {
    const now = Date.now()
    const { cards } = getState()
    const withResults = cards.cards
        .map((card) => {
            return {
                ...card,
                score: cards.results[card.id] ? cards.results[card.id].score : 0,
                delay: cards.results[card.id] ? cards.results[card.id].delay : now,
            }
        })
        .filter(card => card.delay <= now)

    // sort from shorter words to longher
    withResults.sort((a, b) => a.score - b.score)

    const candidates = withResults.slice(0, cards.deckSize * 2)
    shuffle(candidates)

    dispatch(setDeck(candidates.slice(0, cards.deckSize)))
}

export const selectNextCard = (currentCardId) => (dispatch, getState) => {
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

    const nextCard = availableDeck.length
        ? availableDeck[0]
        : cards.deck[Math.floor(Math.random() * cards.deck.length)]

    dispatch(setCurrentCard(nextCard))
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

    result.delay = moment().add(45 * result.score, 's').valueOf()

    dispatch(setResult(card.id, result))
    dispatch(selectNextCard())
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
    dispatch(selectNextCard())
}

export const initDeck = () => (dispatch) => {
    dispatch(selectDeck())
    dispatch(selectNextCard())
}

export const init = () => (dispatch) => {
    const dataset = dispatch(parseCsv(csvSource))
    dispatch(setDataset(dataset))
    dispatch(initDeck())
}
