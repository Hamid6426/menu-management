import PropTypes from 'prop-types';

const FilterItems = ({ filterOptions, onFilter }) => {
    return (
        <div className="filter-items">
            <select onChange={(e) => onFilter(e.target.value)}>
                <option value="">Filter by</option>
                {filterOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

FilterItems.propTypes = {
    filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilter: PropTypes.func.isRequired,
};

export default FilterItems;
