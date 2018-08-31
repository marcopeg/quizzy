import cardsReducer from './cards.reducer'
import * as cardsService from './cards.service'
import cardsListener from './cards.listener'

/**
 * Synchronous Feature API
 * every resource listed here will partake into the main bundle
 * (reducers are required for correct SSR)
 */

export const reducers = {
    cards: cardsReducer,
}
export const services = [
    cardsService,
]
export const listeners = [
    cardsListener,
]

export { default as Cards } from './Cards.containers'

export const initDeck = cardsService.initDeck
