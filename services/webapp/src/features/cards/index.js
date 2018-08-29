import cardsReducer from './cards.reducer'
import * as cardsService from './cards.service'

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
export const listeners = []

export { default as Cards } from './Cards.containers'
