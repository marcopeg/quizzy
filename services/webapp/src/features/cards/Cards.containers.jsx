import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resync } from 'features/dataset'
import { cardOk, cardKo, initDeck, replayDeck } from './cards.service'
import Title from 'components/Title'
import Button from 'components/Button'
import Card from './components/Card'

const mapState = ({ cards }, { match }) => ({
    currentCard: cards.currentCard,
    isDeckCompleted: cards.isDeckCompleted,
    isLoading: !cards.currentCard && !cards.isDeckCompleted,
})

const mapDispatch = (dispatch, { history }) => ({
    cardOk: (card) => dispatch(cardOk(card)),
    cardKo: (card) => dispatch(cardKo(card)),
    initDeck: () => dispatch(initDeck()),
    replayDeck: () => dispatch(replayDeck()),
    resync: () => dispatch(resync()),
    checkStats: () => history.push('/stats'),
})

const Cards = ({
    isLoading,
    isDeckCompleted,
    currentCard,
    cardOk,
    cardKo,
    initDeck,
    replayDeck,
    checkStats,
    resync,
}) => (
    <div>
        <Title value="QuizzY" />
        {isLoading ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: 80 }}>
                <small>loading...</small>
            </div>
        ) : null}

        {currentCard ? (
            <div>
                <Card
                    {...currentCard}
                    cardOk={() => cardOk(currentCard)}
                    cardKo={() => cardKo(currentCard)}
                />
                <div style={{ textAlign: 'center', color: '#666', marginTop: 80 }}>
                    <p>
                        <small onClick={() => initDeck()}>load a new deck</small>
                    </p>
                    <p>
                        <small onClick={() => checkStats()}>check stats</small>
                    </p>
                    <p>
                        <small onClick={() => resync()}>resync dataset</small>
                    </p>
                </div>
            </div>
        ) : null}

        {isDeckCompleted ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
                <small>this deck is completed!</small>
                <p>
                    <Button onClick={() => initDeck()}>load a new deck</Button>
                </p>
                <p>
                    <Button onClick={() => replayDeck()}>replay deck</Button>
                </p>
                <p>
                    <Button onClick={() => checkStats()}>check stats</Button>
                </p>
                <hr />
                <p>
                    <Button onClick={() => resync()}>resync dataset</Button>
                </p>
            </div>
        ) : null}
    </div>
)

Cards.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isDeckCompleted: PropTypes.bool.isRequired,
    currentCard: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    cardOk: PropTypes.func.isRequired,
    cardKo: PropTypes.func.isRequired,
    initDeck: PropTypes.func.isRequired,
    replayDeck: PropTypes.func.isRequired,
    checkStats: PropTypes.func.isRequired,
    resync: PropTypes.func.isRequired,
}

Cards.defaultProps = {
    currentCard: null,
}

const ConnectedCards = connect(mapState, mapDispatch)(Cards)
export default ConnectedCards
