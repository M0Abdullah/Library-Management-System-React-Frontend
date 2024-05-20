import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginuser } from './Store/Slice/Userslice';
import './Login.css';

const Login = ({ loginsuccess, loginsuccess2 }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [option, setOption] = useState('guest');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      if (option === 'guest' || option === 'admin') {
        // Dispatch login action for both guest and admin
        const action = loginuser({ username, password });
        await dispatch(action);

        // Simulate some delay for demonstration purposes (remove in production)
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (option === 'guest') {
          setMessage('You logged in as a Guest');
          loginsuccess();
        } else {
          setMessage('Congratulations, You logged in as an Admin');
          loginsuccess2();
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Authentication failed');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleRemember = () => {
    // Logic for remembering password
    console.log('Remember Me clicked');
  };

  const handleForgetClick = () => {
    // Logic for forgetting password
    console.log('Forget Your Password clicked');
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={formSubmit}>
          <div className="txt_field">
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            required
            className='selectoption1'
          >
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
          </select>
          <div className="pass" onClick={handleForgetClick}>Forget Password?</div>
          <input type="submit" value={loading ? "Loading..." : "Login"} disabled={loading} />
          {error && <div className="error">{error}</div>}
          <div className="signup_link">
            Not a Member ? <a href="signup.php">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
