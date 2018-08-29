import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getNextCard } from './cards.service'
import Title from 'components/Title'
import Card from './components/Card'

const mapState = ({ cards }, { match }) => ({
    currentCard: match.params.cardId
        ? cards.cardsMap[match.params.cardId]
        : cards.cards[0],
})

const mapDispatch = (dispatch, props) => ({
    moveNext: () => {
        const next = dispatch(getNextCard(props.match.params.cardId))
        props.history.push(`/${next.id}`)
    },
})

const Cards = ({ currentCard, moveNext }) => (
    <div>
        <Title value="QuizzY" />
        <Card
            {...currentCard}
            moveNext={moveNext}
        />
    </div>
)

Cards.propTypes = {
    currentCard: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    moveNext: PropTypes.func.isRequired,
}

const ConnectedCards = connect(mapState, mapDispatch)(Cards)
export default ConnectedCards
