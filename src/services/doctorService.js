import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import medicosData from '../assets/medicos.json';

const DoctorService = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState(medicosData);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 10;

    useEffect(() => {
        const filteredDoctors = medicosData.filter(doctor =>
            doctor.nome.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setDoctors(filteredDoctors);
    }, [debouncedSearchTerm]);

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Buscar por nome" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <ul>
                {currentDoctors.length > 0 ? (
                    currentDoctors.map(doctor => (
                        <li key={doctor.id}>
                            {doctor.nome} - {doctor.especialidade} - CRM: {doctor.crm}
                        </li>
                    ))
                ) : (
                    <p>Nenhum médico encontrado.</p>
                )}
            </ul>
            <div>
                <button onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}>Anterior</button>
                <button onClick={() => setCurrentPage(page => page + 1)}>Próximo</button>
            </div>
        </div>
    );
};

export default DoctorService;