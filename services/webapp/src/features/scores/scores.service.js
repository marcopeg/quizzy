/* eslint-disable */

import moment from 'moment'
import { setData, setReady, setScore, initialScore } from './scores.reducer'

export const readLocalDataset = () => () => {
    try {
        const minified = JSON.parse(localStorage.getItem('quizzy:scores'))
        return minified.reduce((acc, curr) => ({
            ...acc,
            [curr[0]]: {
                value: curr[1],
                lastIteration: curr[2],
                nextIteration: curr[3],
            },
        }), {})
    } catch (err) {
        return null
    }
}

export const writeLocalDataset = (scores) => () => {
    const minified = Object.keys(scores).map(id => [
        id,
        scores[id].value,
        scores[id].lastIteration,
        scores[id].nextIteration,
    ])
    localStorage.setItem('quizzy:scores', JSON.stringify(minified))
}

export const save = () => (dispatch, getState) => {
    const { scores } = getState()
    dispatch(writeLocalDataset(scores.cards))
}

export const getCurrentScore = (card) => (dispatch, getState) => {
    const { scores } = getState()
    return scores.cards[card.id]
        ? scores.cards[card.id]
        : initialScore
}

// gradually delay the probability of showing the card
export const scoreOk = (card) => (dispatch, getState) => {
    const score = dispatch(getCurrentScore(card))

    let delay = 0
    switch (score.value) {
        case 0:
            delay = 1
            break
        case 2:
            delay = 6
            break
        case 3:
            delay = 12
            break
        case 4:
            delay = 24
            break
        case 5:
            delay = 48
            break
        case 6:
            delay = 168
            break
        default:
            delay = 720
            break
    }

    const value = score.value + 1
    const nextIteration = moment().add(delay, 'h').toDate()

    dispatch(setScore(card.id, value, nextIteration))
    dispatch(save())
}

// basically just reset the card as it was a new card
export const scoreKo = (card) => (dispatch, getState) => {
    const score = dispatch(getCurrentScore(card))
    const value = 0
    const nextIteration = new Date()

    dispatch(setScore(card.id, value, nextIteration))
    dispatch(save())
}

export const start = () => (dispatch) => {
    try {
        const scores = dispatch(readLocalDataset())
        dispatch(setData(scores))
        dispatch(setReady())
    } catch (err) {
        // eslint-disable-next-line
        alert('it was not possible to initialize the score db')
    }
}
