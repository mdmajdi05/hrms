import { useState } from 'react';

export default function StaffLoginForm({ role, onSubmit, loading, onBack }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(formData.username, formData.password);
  };

  const title = role === 'admin' ? '👑 Admin Login' : '💼 HR Login';

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h4>{title}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
          style={{
            padding: '12px',
            width: '100%',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: '16px'
          }}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          style={{
            padding: '12px',
            width: '100%',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: '16px'
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#6c757d' : (role === 'admin' ? '#dc3545' : '#ffc107'),
              color: role === 'admin' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '10px',
              fontSize: '16px'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ← Back
          </button>
        </div>
      </form>
      {role === 'admin' && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <strong>Default Admin Credentials:</strong><br />
          Username: <code>admin</code><br />
          Password: <code>admin123</code>
        </div>
      )}
    </div>
  );
}