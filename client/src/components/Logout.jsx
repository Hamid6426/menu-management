import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/auth/login');
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg">
      Logout
    </button>
  );
};

export default Logout;
