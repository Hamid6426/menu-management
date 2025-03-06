import { useState } from 'react';
import PropTypes from 'prop-types';

const AdvanceSearch = ({ categoryList, specialList, onSearch }) => {
    const [category, setCategory] = useState('');
    const [special, setSpecial] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch({ category, special, searchTerm });
    };

    return (
        <div className="advance-search">
            <div className="search-inputs">
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">Select Category</option>
                    {categoryList.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

                <select onChange={(e) => setSpecial(e.target.value)} value={special}>
                    <option value="">Restaurant Special</option>
                    {specialList.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search items..."
                />
            </div>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

AdvanceSearch.propTypes = {
    categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
    specialList: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default AdvanceSearch;
