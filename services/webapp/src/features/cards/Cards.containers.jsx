import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { cardOk, cardKo, initDeck, replayDeck } from './cards.service'
import Card from './components/Card'

import MobilePage from 'layouts/MobilePage'
import Button from 'layouts/MobilePage/lib/Button'

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
    quit: () => history.push('/'),
})

const Cards = ({
    isLoading,
    isDeckCompleted,
    currentCard,
    cardOk,
    cardKo,
    initDeck,
    replayDeck,
    quit,
}) => (
    <MobilePage>
        <MobilePage.Header
            title={'quizzy - play!'}
            leftBtnIcon={'left'}
            leftBtnHandler={quit}
        />
        <MobilePage.Body withPadding={false}>
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
                </div>
            ) : null}

            {isDeckCompleted ? (
                <div style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
                    <div style={{ marginBottom: 50, marginTop: 50 }}>
                        <small>this deck is completed!</small>
                    </div>
                    <div style={{ marginBottom: 25, marginTop: 25 }}>
                        <Button onClick={() => initDeck()}>load a new deck</Button>
                    </div>
                    <div style={{ marginBottom: 25, marginTop: 25 }}>
                        <Button onClick={() => replayDeck()}>replay deck</Button>
                    </div>
                </div>
            ) : null}
        </MobilePage.Body>
    </MobilePage>
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
    quit: PropTypes.func.isRequired,
}

Cards.defaultProps = {
    currentCard: null,
}

const ConnectedCards = connect(mapState, mapDispatch)(Cards)
export default ConnectedCards
