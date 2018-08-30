import { getJSON } from '@marcopeg/utils/lib/request'

import {
    setDataset,
    setReady,
    setLoading,
} from './dataset.reducer'

export const fetchRemoteDataset = () => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl('/v1/dataset/')
    return ssr.await(getJSON(endpoint))
}

export const readLocalDataset = () => () => {
    try {
        return JSON.parse(localStorage.getItem('quizzy:dataset'))
    } catch (err) {
        return null
    }
}

export const writeLocalDataset = (dataset) => () => {
    localStorage.setItem('quizzy:dataset', JSON.stringify(dataset))
}

export const download = () => async (dispatch) => {
    let data = null
    try {
        dispatch(setLoading(true))
        data = await dispatch(fetchRemoteDataset())
    } catch (err) {
        throw new Error(`[dataset] failed download - ${err.message}`)
    } finally {
        setTimeout(() => dispatch(setLoading(false)), 600)
    }
    return data
}

export const resync = () => async (dispatch) => {
    try {
        const dataset = await dispatch(download())
        dispatch(writeLocalDataset(dataset))
        dispatch(setDataset(dataset))
        dispatch(setReady())
    } catch (err) {
        // eslint-disable-next-line
        alert('it was not possible to sync the dataset')
    }
}

export const start = () => async (dispatch) => {
    try {
        let dataset = dispatch(readLocalDataset())
        if (!dataset) {
            dataset = await dispatch(download())
            dispatch(writeLocalDataset(dataset))
        }
        dispatch(setDataset(dataset))
        dispatch(setReady())
    } catch (err) {
        // eslint-disable-next-line
        alert('it was not possible to sync the dataset')
    }
}
