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
        cardOk: PropTypes.func.isRequired,
        cardKo: PropTypes.func.isRequired,
    }

    state = {
        flip: false,
    }

    flip = () => this.setState({
        flip: !this.state.flip,
    })

    cardOk = () => {
        let delay = 0
        if (this.state.flip) {
            this.setState({ flip: false })
            delay = 200
        }
        setTimeout(this.props.cardOk, delay)
    }

    cardKo = () => {
        let delay = 0
        if (this.state.flip) {
            this.setState({ flip: false })
            delay = 200
        }
        setTimeout(this.props.cardKo, delay)
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
                <div style={style.controls}>
                    <button
                        style={[ style.btn, style.damnBtn ]}
                        onClick={this.cardKo}
                    >nope :-(</button>
                    <button
                        style={[ style.btn, style.nextBtn ]}
                        onClick={this.cardOk}
                    >Got it!</button>
                </div>
            </div>
        )
    }
}

export default radium(Card)
