import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchItems = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-items">
            <input
                type="text"
                placeholder="Search for items (e.g., pizza)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

SearchItems.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchItems;
