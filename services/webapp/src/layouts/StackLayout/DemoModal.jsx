/* eslint-disable */

import React from 'react'
import { open } from './index'
import MobilePage from 'layouts/MobilePage'

import Icon from 'antd/lib/icon'

class DemoModal extends React.Component {
    state = {
        count: 0,
        stopped: 0,
    }

    componentDidMount () {
        this.___updater = setInterval(() => {
            this.setState({
                count: this.state.count + 1,
            })
        }, 1000)
    }

    componentWillUpdate (nextProps) {
        if (this.props.stackLayout.isActive !== nextProps.stackLayout.isActive) {
            console.log(this.props.name, this.props.stackLayout, nextProps.stackLayout)
            this.setState({
                stopped: this.state.stopped + 1,
            })

            // toggle updated
            if (nextProps.stackLayout.isActive === false) {
                clearInterval(this.___updater)
            } else {
                this.___updater = setInterval(() => {
                    this.setState({
                        count: this.state.count + 1,
                    })
                }, 1000)
            }
        }
    }

    componentWillUnmount () {
        clearInterval(this.___updater)
    }

    render () {
        const { name, id, stackLayout } = this.props
        return (
            <MobilePage>
                <MobilePage.Header
                    leftComponent={<Icon type={'left'} onClick={stackLayout.close} />}
                >
                    {name || 'foo'} ({id})
                </MobilePage.Header>
                <MobilePage.Body>
                    {`count: ${this.state.count}, stopped: ${this.state.stopped}`}
                    <div onClick={() => open(
                        DemoModal,
                        { name, id: id + 1 },
                        { slideFrom: 'right', onClose: false })
                    }>
                        open new modal
                    </div>
                    <div onClick={() => stackLayout.close()}>close this one</div>
                </MobilePage.Body>
            </MobilePage>
        )
    }
}

export default DemoModal
