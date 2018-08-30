import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { cardOk, cardKo, initDeck, replayDeck } from './cards.service'
import Title from 'components/Title'
import Button from 'components/Button'
import Card from './components/Card'

const mapState = ({ cards }, { match }) => ({
    currentCard: cards.currentCard,
    isDeckCompleted: cards.isDeckCompleted,
    isLoading: !cards.currentCard && !cards.isDeckCompleted,
})

const mapDispatch = {
    cardOk,
    cardKo,
    initDeck,
    replayDeck,
}

const Cards = ({
    isLoading,
    isDeckCompleted,
    currentCard,
    cardOk,
    cardKo,
    initDeck,
    replayDeck,
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
                    <small onClick={() => initDeck()}>load a new deck</small>
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
}

Cards.defaultProps = {
    currentCard: null,
}

const ConnectedCards = connect(mapState, mapDispatch)(Cards)
export default ConnectedCards
