import { useState } from 'react';
import UserRegisterForm from './UserRegisterForm';
import UserLoginForm from './UserLoginForm';

export default function UserAuth({ onLogin, onMessage }) {
  const [mode, setMode] = useState('auth');
  const [loading, setLoading] = useState(false);

  const registerUser = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        onMessage('✅ Registration successful! Please login.', 'success');
        setMode('login');
      } else {
        onMessage(`❌ ${data.error}`, 'error');
      }
    } catch (error) {
      onMessage('❌ Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);
        onLogin(data);
      } else {
        onMessage(`❌ ${data.error}`, 'error');
      }
    } catch (error) {
      onMessage('❌ Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>👤 User Portal</h3>

      {mode === 'auth' && (
        <div id="userAuth" style={{ textAlign: 'center', margin: '30px 0' }}>
          <button
            onClick={() => setMode('register')}
            style={{
              padding: '12px 20px',
              margin: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            📝 Register
          </button>
          <button
            onClick={() => setMode('login')}
            style={{
              padding: '12px 20px',
              margin: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔐 Login
          </button>
        </div>
      )}

      {mode === 'register' && (
        <UserRegisterForm
          onSubmit={registerUser}
          loading={loading}
          onBack={() => setMode('auth')}
        />
      )}

      {mode === 'login' && (
        <UserLoginForm
          onSubmit={loginUser}
          loading={loading}
          onBack={() => setMode('auth')}
        />
      )}
    </div>
  );
}