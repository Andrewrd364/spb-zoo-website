import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function LoginPage() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const data = await login(username, password); 
      localStorage.setItem('token', data.token); 
      navigate('/'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Вход для администратора</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleLogin} className="border p-4 rounded shadow">
            <div className="mb-3">
              <label className="form-label">Логин:</label>
              <input
                type="text" 
                className="form-control"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Пароль:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
