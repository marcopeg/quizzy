import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import MobilePage from 'layouts/MobilePage'

const style = {
    card: {
        position: 'relative',
        borderBottom: '1px solid #ddd',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    origin: {
        fontSize: 15,
    },
    translation: {
        fontSize: 11,
    },
    score: {
        position: 'absolute',
        top: '50%',
        marginTop: -17,
        right: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        background: '#ddd',
        fontSize: 11,
        borderRadius: 100,
    },
    info: {
        textAlign: 'center',
        paddingTop: 50,
        paddingBottom: 50,
        background: '#bfeaff',
        marginBottom: 20,
        borderBottom: '1px solid #69b2d3',
    },
}

const mapState = ({ dataset, scores }) => {
    const cards = dataset.cards.map(card => ({
        ...card,
        hasScore: !!scores.cards[card.id],
        score: scores.cards[card.id]
            ? scores.cards[card.id].value
            : 0,
    }))

    cards.sort((a, b) => a.se.localeCompare(b.se))

    const completed = cards.reduce((acc, curr) => curr.hasScore ? acc + 1 : acc, 0)

    return {
        completed,
        progress: Math.round((completed / cards.length) * 100),
        cards,
    }
}

const mapDispatch = (dispatch, { history }) => ({
    close: () => history.push('/'),
})

const Stats = ({ cards, completed, progress, close }) => (
    <MobilePage>
        <MobilePage.Header
            title={'quizzy :: stats'}
            leftBtnIcon={'left'}
            leftBtnHandler={close}
        />
        <MobilePage.Body withPadding={false}>
            <div
                style={style.info}
                onClick={close}
            >
                completed {completed} of {cards.length} ({progress}%)
            </div>
            {cards.map((card) => (
                <div key={card.id} style={style.card}>
                    <div style={style.origin}>{card.se}</div>
                    <div style={style.translation}>{card.en}</div>
                    {card.hasScore ? <div style={style.score}>{card.score}</div> : null}
                </div>
            ))}
        </MobilePage.Body>
    </MobilePage>
)

Stats.propTypes = {
    completed: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        en: PropTypes.string.isRequired,
        se: PropTypes.string.isRequired,
    })).isRequired,
    close: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(radium(Stats))
