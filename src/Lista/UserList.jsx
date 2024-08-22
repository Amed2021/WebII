import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const UserList = ({ users }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/perfil/${userId}`);
  };

  return (
    <div className="results-list">
      {users.map((user) => (
        <div key={user.id} className="result-item" onClick={() => handleUserClick(user.id)}>
          <p className="result-name">{user.name}</p>
        </div>
      ))}
    </div>
  );
};


UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default UserList;
