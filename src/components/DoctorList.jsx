import PropTypes from 'prop-types';
import DoctorCard from './DoctorCard';
import EmptyState from './EmptyState';

function DoctorList({ doctors }) {
  if (!doctors || doctors.length === 0) {
    return <EmptyState message="Não foram encontrados médicos com os critérios de busca" />;
  }

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

DoctorList.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      especialidade: PropTypes.string.isRequired,
      crm: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DoctorList;