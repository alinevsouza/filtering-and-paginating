import { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import DoctorList from './components/DoctorList';
import Pagination from './components/Pagination';
import doctorService from './services/doctorService';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setDoctors(doctorService.searchDoctors());
  }, []);

  /* useMemo --> Para garantir que a página só seja recalculada quando houver alguma
   mudança em doctors ou em currentPage. */
  const currentDoctors = useMemo(() => {
    return doctorService.getPaginatedDoctors(doctors, currentPage, 10)
  }, [doctors, currentPage]);

  /* useCallback --> Para evitar atualização de estados desnecessárias em cascata, 
   tratando assim o problema com excessivas renderizações na interface. */
  const handleSearch = useCallback((query) => {
    setDoctors(doctorService.searchDoctors(query));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log('Render');

  return (
    <div className="app-container">
      <h1>Busca de Médicos</h1>
      <SearchBar onSearch={handleSearch} />
      <DoctorList doctors={currentDoctors.doctors} />
      <Pagination
        currentPage={currentPage}
        totalPages={currentDoctors.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;