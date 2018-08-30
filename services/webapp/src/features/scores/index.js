import scoresReducer, { SET_READY } from './scores.reducer'
import * as scoresService from './scores.service'


export const reducers = {
    scores: scoresReducer,
}
export const services = [
    scoresService,
]
export const listeners = []

export {
    SET_READY,
}

export const scoreOk = scoresService.scoreOk
export const scoreKo = scoresService.scoreKo
