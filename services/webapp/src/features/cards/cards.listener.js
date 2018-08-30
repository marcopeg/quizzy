
import { SET_READY as DATASET_READY } from 'features/dataset'
import { SET_READY as SCORES_READY } from 'features/scores'
import { initDeck } from './cards.service'

// wait until both dataset and scores reducers are ready
const checkReady = () => (dispatch, getState) => {
    const { dataset, scores } = getState()

    if (!dataset.isReady) return
    if (!scores.isReady) return

    dispatch(initDeck())
}

export default [
    {
        type: DATASET_READY,
        async: true,
        handler: action => checkReady(),
    },
    {
        type: SCORES_READY,
        async: true,
        handler: action => checkReady(),
    },
]
