import { useState } from 'react';
import PropTypes from 'prop-types';
import useDebounce from '../hooks/useDebounce';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar médicos por nome..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;