import { useState } from 'react';

export default function UserLoginForm({ onSubmit, loading, onBack }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(formData.username, formData.password);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h4>Login to Your Account</h4>
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
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: 'white',
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
    </div>
  );
}