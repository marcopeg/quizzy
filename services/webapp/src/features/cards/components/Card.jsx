/* eslint react/prefer-stateless-function: off */
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import style from './Card.style'
import './Card.style.css'

class Card extends React.PureComponent {
    static propTypes = {
        en: PropTypes.string.isRequired,
        se: PropTypes.string.isRequired,
        moveNext: PropTypes.func.isRequired,
    }

    state = {
        flip: false,
    }

    flip = () => this.setState({
        flip: !this.state.flip,
    })

    moveNext = () => {
        this.setState({ flip: false })
        this.props.moveNext()
    }

    render () {
        return (
            <div style={style.wrapper}>
                <div
                    className={[
                        'card-flip-container',
                        this.state.flip ? 'card-flipped' : null,
                    ].join(' ')}
                    style={style.flipContainer}
                    onClick={this.flip}
                >
                    <div
                        className={'card-flipper'}
                        style={style.cardSize}
                    >
                        <div
                            className={'card-front'}
                            style={[
                                style.cardSize,
                                style.cardContent,
                            ]}
                        >
                            {this.props.se}
                        </div>
                        <div
                            className={'card-back'}
                            style={[
                                style.cardSize,
                                style.cardContent,
                            ]}
                        >
                            {this.props.en}
                        </div>
                    </div>
                </div>
                <button
                    style={style.nextBtn}
                    onClick={this.moveNext}
                >NEXT</button>
            </div>
        )
    }
}

export default radium(Card)
