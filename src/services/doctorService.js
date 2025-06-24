import doctors from '../assets/medicos.json';

const doctorService = {
  getDoctors() {
    return doctors;
  },

  searchDoctors(query = '') {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      return this.getDoctors();
    }
    
    return doctors.filter(doctor => 
      doctor.nome.toLowerCase().includes(normalizedQuery)
    );
  },

  getPaginatedDoctors(doctors, page = 1, pageSize = 10) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      doctors: doctors.slice(startIndex, endIndex),
      total: doctors.length,
      totalPages: Math.ceil(doctors.length / pageSize),
      currentPage: page
    };
  }
};

export default doctorService;