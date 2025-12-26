import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    const userDataString = localStorage.getItem('userData');

    if (!isLogin || isLogin !== 'true') {
      navigate('/login');
      return;
    }

    if (userDataString) {
      try {
        const parsedUser = JSON.parse(userDataString);
        setUser(parsedUser);
      } catch (error) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="h-24 bg-linear-to-r from-(--color-primary) to-(--color-secondary)"></div>

        <div className="px-6 pb-6 relative">
          <div className="flex justify-center -mt-12">
            <img
              src={user.picture || 'https://via.placeholder.com/150'}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white shadow-sm"
            />
          </div>

          <div className="text-center mt-4">
            <h2 className="text-(length:--fs-h3) font-bold text-gray-800 leading-tight">
              {user.name}
            </h2>
            <p className="text-(length:--fs-p) text-gray-500 mt-1">
              {user.email}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white text-(length:--fs-p) font-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
