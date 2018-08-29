import papa from 'papaparse'
import csvSource from './cards-csv'
import { setDataset } from './cards.reducer'

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

export const getNextCard = (currentCardId) => (dispatch, getState) => {
    const { cards } = getState()
    return cards.cards[Math.floor(Math.random() * cards.cards.length)]
}

export const init = () => (dispatch) => {
    const dataset = dispatch(parseCsv(csvSource))
    dispatch(setDataset(dataset))
}
