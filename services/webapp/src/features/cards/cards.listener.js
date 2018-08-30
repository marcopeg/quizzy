
import { SET_READY } from 'features/dataset'
import { initDeck } from './cards.service'

export default [
    {
        type: SET_READY,
        handler: action => initDeck(),
    },
]
