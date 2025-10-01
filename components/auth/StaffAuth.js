import { useState } from 'react';
import StaffLoginForm from './StaffLoginForm';

export default function StaffAuth({ onLogin, onMessage }) {
  const [staffRole, setStaffRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginStaff = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: staffRole, username, password })
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

  if (!staffRole) {
    return (
      <div>
        <h3>👥 Staff Portal</h3>
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button
            onClick={() => setStaffRole('admin')}
            style={{
              padding: '15px 30px',
              margin: '10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            👑 Admin Login
          </button>
          <button
            onClick={() => setStaffRole('hr')}
            style={{
              padding: '15px 30px',
              margin: '10px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            💼 HR Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <StaffLoginForm
      role={staffRole}
      onSubmit={loginStaff}
      loading={loading}
      onBack={() => setStaffRole(null)}
    />
  );
}