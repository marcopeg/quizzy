import { getJSON } from '@marcopeg/utils/lib/request'

import {
    setDataset,
    setReady,
} from './dataset.reducer'

export const fetchDataset = () => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl('/v1/dataset/')
    return ssr.await(getJSON(endpoint))
}

export const start = () => async (dispatch) => {
    const dataset = await dispatch(fetchDataset())
    dispatch(setDataset(dataset))
    dispatch(setReady())
}
