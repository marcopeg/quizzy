import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from '../MobilePage'

import getStyles from './SelectList.style'

const SelectListItem = ({
    item,
    isFirstItem,
    isLastItem,
    isSelected,
    onSelect,
    renderItem,
}) => (
    <ThemeContext.Consumer>
        {theme => (
            <div
                onClick={onSelect}
                style={[
                    getStyles(theme.name, 'item'),
                    isFirstItem ? getStyles(theme.name, 'item').firstChild : null,
                    isLastItem ? getStyles(theme.name, 'item').lastChild : null,
                    isSelected ? getStyles(theme.name, 'item').isSelected : null,
                ]}
            >
                {renderItem ? renderItem(item) : item.label}
            </div>
        )}
    </ThemeContext.Consumer>
)

SelectListItem.propTypes = {
    isFirstItem: PropTypes.bool.isRequired,
    isLastItem: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    renderItem: PropTypes.func,
    item: PropTypes.object.isRequired,
}

SelectListItem.defaultProps = {
    renderItem: null,
}

const StyledSelectListItem = radium(SelectListItem)
export default StyledSelectListItem
