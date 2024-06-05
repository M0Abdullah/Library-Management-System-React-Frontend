import React from 'react';
import Main from './Main';
import './App.css';
import { useSelector } from 'react-redux';
export default function App() {
  const user = useSelector((state) => state.user.userObj);
  React.useEffect(() => {
    console.log('Logged in user:', user);
  }, [user]);

  return (
    <div className="App">
      <Main />
      {user && (
        <div  className='userlogin' >
          <h2>Logged in as: {user.username}</h2>
        </div>
      )}
    </div>
  );
}
