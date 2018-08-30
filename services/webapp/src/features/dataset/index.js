import datasetReducer, { SET_READY } from './dataset.reducer'
import * as datasetService from './dataset.service'


export const reducers = {
    dataset: datasetReducer,
}
export const services = [
    datasetService,
]
export const listeners = []

export { SET_READY }
