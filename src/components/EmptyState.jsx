import PropTypes from 'prop-types';

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3>{message}</h3>
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyState;