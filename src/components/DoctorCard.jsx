import PropTypes from 'prop-types';

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <h3>{doctor.nome}</h3>
      <div className="doctor-info">
        <p><strong>Especialidade:</strong> {doctor.especialidade}</p>
        <p><strong>CRM:</strong> {doctor.crm}</p>
      </div>
    </div>
  );
}

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    especialidade: PropTypes.string.isRequired,
    crm: PropTypes.string.isRequired
  }).isRequired
};

export default DoctorCard;