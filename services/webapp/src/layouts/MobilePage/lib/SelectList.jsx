import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import { ThemeContext } from '../MobilePage'
import SelectListItem from './SelectListItem'
import getStyles from './SelectList.style'

const SelectList = ({
    items,
    itemKey,
    isSelected,
    onSelect,
    renderItem,
}) => (
    <ThemeContext.Consumer>
        {theme => (
            <div
                style={[
                    getStyles(theme.name, 'wrapper'),
                ]}
            >
                {items.map((item, i) => (
                    <SelectListItem
                        key={item[itemKey]}
                        item={item}
                        isSelected={isSelected(item)}
                        isFirstItem={i === 0}
                        isLastItem={i === items.length - 1}
                        onSelect={() => onSelect(item)}
                        renderItem={renderItem}
                    />
                ))}
            </div>
        )}
    </ThemeContext.Consumer>
)

SelectList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemKey: PropTypes.string,
    isSelected: PropTypes.func,
    onSelect: PropTypes.func,
    renderItem: PropTypes.func,
}

SelectList.defaultProps = {
    itemKey: 'value',
    isSelected: () => false,
    onSelect: () => null,
    renderItem: null,
}

const StyledSelectList = radium(SelectList)
export default StyledSelectList
