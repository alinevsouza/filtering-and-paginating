import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import DoctorList from './components/DoctorList';
import Pagination from './components/Pagination';
import doctorService from './services/doctorService';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [paginatedData, setPaginatedData] = useState({
    doctors: [],
    total: 0,
    totalPages: 0,
    currentPage: 1
  });

  useEffect(() => {
    const filtered = doctorService.searchDoctors(searchQuery);
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const paginated = doctorService.getPaginatedDoctors(
      filteredDoctors,
      currentPage,
      10
    );
    setPaginatedData(paginated);
  }, [filteredDoctors, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <h1>Busca de Médicos</h1>
      <SearchBar onSearch={handleSearch} />
      <DoctorList doctors={paginatedData.doctors} />
      <Pagination
        currentPage={paginatedData.currentPage}
        totalPages={paginatedData.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;