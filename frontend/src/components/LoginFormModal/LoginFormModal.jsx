import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

import './LoginForm.css';



const LoginFormModal = ({ navigate }) => {
    const dispatch = useDispatch();

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});
      return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        closeModal();
        if (navigate) navigate('/');
    })
      .catch(async (res) => {
        let data;
        try {
          data = await res.json();
        } catch {
          setErrors({ credential: 'An unexpected error occurred.'});
          return;
        }
       
        if (data?.errors) {
          setErrors({ credential: "The provided credentials were invalid"});
        } else if (data?.message) {
          setErrors({ credential: data.message });
        } else {
          setErrors({ credential: "The provided credentials were invalid"});
        }
    });
    };
  
    return (
      <>
        <h1>Log In</h1>
        {errors.credential && (
          <div className='error-container'>
          <p className='error-text'>{errors.credential}
          </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          
        <button 
        type="submit"
        disabled={credential.length < 4 || password.length < 6} 
        className={`login-button ${credential.length < 4 || password.length < 6 ? 'disabled' : ''}`}>
        Log In
        </button>

        <button
        type="button"
        className="demo-login-button"
        onClick={() => {
          dispatch(sessionActions.login({
            credential: 'demo@user.io',
            password: 'password'
          }))
          .then(() => {
            closeModal();
            if (navigate) navigate('/');
          })
          .catch(() => {
            setErrors({ credential: "Demo login failed" });
          });
        }}>Log in as Demo User</button>

        </form>
      </>
    );
};



export default LoginFormModal;