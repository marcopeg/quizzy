import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { cardOk, cardKo, initDeck } from './cards.service'
import Title from 'components/Title'
import Card from './components/Card'

const mapState = ({ cards }, { match }) => ({
    currentCard: cards.currentCard,
})

const mapDispatch = {
    cardOk,
    cardKo,
    initDeck,
}

const Cards = ({ currentCard, cardOk, cardKo, initDeck }) => (
    <div>
        <Title value="QuizzY" />
        {currentCard ? (
            <Card
                {...currentCard}
                cardOk={() => cardOk(currentCard)}
                cardKo={() => cardKo(currentCard)}
            />
        ) : (
            <div style={{ textAlign: 'center', color: '#666', marginTop: 80 }}>
                <small>loading...</small>
            </div>
        )}
        <div style={{ textAlign: 'center', color: '#666', marginTop: 80 }}>
            <small onClick={() => initDeck()}>initDeck deck</small>
        </div>
    </div>
)

Cards.propTypes = {
    currentCard: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    cardOk: PropTypes.func.isRequired,
    cardKo: PropTypes.func.isRequired,
    initDeck: PropTypes.func.isRequired,
}

Cards.defaultProps = {
    currentCard: null,
}

const ConnectedCards = connect(mapState, mapDispatch)(Cards)
export default ConnectedCards
