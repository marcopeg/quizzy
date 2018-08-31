/* eslint-disable */
import React from 'react'
import Popup from 'layouts/Popup'
import { withRouter } from 'react-router-dom'
import { init, triggerRoutes, subscribe, close, open } from './interface'

import DemoModal from './DemoModal'

class StackLayout extends React.Component {
    componentWillMount () {
        init(this.props.history)
        subscribe(this.onStackChange)

        // demo shit
        // setTimeout(() => open(
        //     DemoModal,
        //     { name: 'custom', id: 0 },
        //     { slideFrom: 'right', onClose: false }
        // ), 500)
    }

    componentDidMount () {
        triggerRoutes(this.props.history)
    }

    state = {
        stack: [],
    }

    // push and trigger entering animation
    addItem = (item) => {
        this.setState({
            stack: [
                ...this.state.stack,
                { ...item, isVisible: false },
            ],
        })

        setTimeout(() => {
            const currentState = [...this.state.stack]
            const lastItem = currentState.pop()

            this.setState({
                stack: [
                    ...currentState,
                    { ...lastItem, isVisible: true },
                ],
            })
        }, 25)
    }

    // wait for exit animation to finish
    removeItem = (item) => {
        const currentState = [...this.state.stack]
        const lastItem = currentState.pop()

        this.setState({
            stack: [
                ...currentState,
                { ...lastItem, isVisible: false },
            ],
        })

        setTimeout(() => {
            this.setState({
                stack: currentState,
            })
        }, 300)
    }

    onStackChange = (evt, item) => {
        if (evt === 'open') {
            this.addItem(item)
        } else {
            this.removeItem(item)
        }
    }

    renderItem = (item, idx) => {
        const closeHandler = () => close(item)

        const componentProps = {
            ...item.props,
            key: idx,
            stackLayout: {
                index: idx,
                close: closeHandler,
                isActive: idx === (this.state.stack.length - 1),
            },
        }

        const element = React.createElement(item.component, componentProps)

        // card do not use any popup
        if (item.popupProps === false) {
            return element
        }

        const popupProps = {
            ...item.popupProps,
            key: idx,
            visible: item.isVisible,
            onClose: item.popupProps.onClose !== false ? closeHandler : null,
        }

        return (
            <Popup {...popupProps}>
                {element}
            </Popup>
        )
    }

    render () {
        return (
            <div>
                {this.state.stack.map(this.renderItem)}
            </div>
        )
    }
}

export default withRouter(StackLayout)
