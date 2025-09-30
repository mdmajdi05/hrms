'use client';
import { useState, useEffect } from 'react';

// Shared PDF helper used by dashboards/components to fetch the PDF bytes
// and produce an object URL. Accepts an onMessage callback for error reporting.
const fetchPdfAndCreateUrl = async (id, onMessage) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/download/${id}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    if (!res.ok) throw new Error('Failed to fetch PDF');
  const buf = await res.arrayBuffer();
  const blob = new Blob([buf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  return { url, blob };
  } catch (err) {
    if (typeof onMessage === 'function') onMessage('❌ ' + err.message, 'error');
    return null;
  }
};

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    if (token && role && username) {
      setUser({ token, role, username });
      if (role === 'user') setCurrentView('userDashboard');
      else if (role === 'admin') setCurrentView('adminDashboard');
      else if (role === 'hr') setCurrentView('hrDashboard');
    }
  }, []);

  const showHome = () => setCurrentView('home');
  const showUser = () => setCurrentView('user');
  const showStaff = () => setCurrentView('staff');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setUser(null);
    setCurrentView('home');
    setMessage('Logged out successfully');
  };

  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '900px', margin: '20px auto', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>🚀 Simple Candidate System</h2>

        {message && (
          <div style={{ padding: '10px', margin: '10px 0', borderRadius: '4px', backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da', color: message.includes('success') ? '#155724' : '#721c24', border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}` }}>
            {message}
          </div>
        )}

        {user && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
            <span>Welcome, <strong>{user.username}</strong> ({user.role})</span>
            <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          </div>
        )}

        {currentView === 'home' && (
          <div id="home">
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
              <button onClick={showUser} style={{ padding: '15px 30px', margin: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>👤 User</button>
              <button onClick={showStaff} style={{ padding: '15px 30px', margin: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>👥 Staff</button>
            </div>
          </div>
        )}

        {currentView === 'user' && !user && (
          <UserAuth onLogin={(userData) => { setUser(userData); setCurrentView('userDashboard'); showMessage('Login successful!', 'success'); }} onMessage={showMessage} />
        )}

        {currentView === 'userDashboard' && user && user.role === 'user' && (
          <UserDashboard user={user} onMessage={showMessage} onBack={showHome} />
        )}

        {currentView === 'staff' && !user && (
          <StaffAuth onLogin={(userData) => { setUser(userData); if (userData.role === 'admin') setCurrentView('adminDashboard'); else setCurrentView('hrDashboard'); showMessage('Login successful!', 'success'); }} onMessage={showMessage} />
        )}

        {currentView === 'adminDashboard' && user && user.role === 'admin' && (
          <AdminDashboard user={user} onMessage={showMessage} onBack={showHome} />
        )}

        {currentView === 'hrDashboard' && user && user.role === 'hr' && (
          <HRDashboard user={user} onMessage={showMessage} onBack={showHome} />
        )}

        {(currentView === 'user' || currentView === 'staff') && !user && (
          <button onClick={showHome} style={{ padding: '8px 16px', marginTop: '20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Back</button>
        )}
      </div>
    </div>
  );
}

// User Authentication Component
function UserAuth({ onLogin, onMessage }) {
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

// User Registration Form Component
function UserRegisterForm({ onSubmit, loading, onBack }) {
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
      <h4>Create New Account</h4>
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
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '10px',
              fontSize: '16px'
            }}
          >
            {loading ? 'Creating...' : 'Create Account'}
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

// User Login Form Component
function UserLoginForm({ onSubmit, loading, onBack }) {
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

// Staff Authentication Component
function StaffAuth({ onLogin, onMessage }) {
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

// Staff Login Form Component
function StaffLoginForm({ role, onSubmit, loading, onBack }) {
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

// User Dashboard Component
function UserDashboard({ user, onMessage, onBack }) {
  const [submissions, setSubmissions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const loadSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/submissions', {
        headers: { Authorization: 'Bearer ' + token }
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        onMessage('❌ Failed to load submissions', 'error');
      }
    } catch (error) {
      onMessage('❌ Network error', 'error');
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleView = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      setPreviewUrl(r.url);
      setPreviewing(true);
    }
  };

  const handleDownload = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      const a = document.createElement('a');
      a.href = r.url;
      a.download = `${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const handlePrint = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      const w = window.open(r.url, '_blank');
      if (w) setTimeout(() => w.print(), 500);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Delete submission ${id}? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      });
      const data = await res.json();
      if (res.ok) {
        onMessage('✅ Submission deleted', 'success');
        loadSubmissions();
      } else {
        onMessage(`❌ ${data.error || 'Delete failed'}`, 'error');
      }
    } catch (err) {
      onMessage('❌ Network error', 'error');
    }
  };

  return (
    <div>
      {previewing && previewUrl && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ width: '80%', height: '80%', background: 'white', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <button onClick={() => { setPreviewing(false); setPreviewUrl(null); }} style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 10, padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#dc3545', color: 'white' }}>Close</button>
            <iframe src={previewUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="submission-preview" />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>👤 User Dashboard</h3>
        <button onClick={onBack} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Back</button>
      </div>

      <p>Welcome, <strong>{user.username}</strong>! Manage your candidate applications.</p>

      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '12px 24px', backgroundColor: showForm ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }}>{showForm ? '📋 Hide Form' : '📝 New Application'}</button>
        <button onClick={loadSubmissions} style={{ padding: '12px 24px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>🔄 Refresh</button>
      </div>

      {showForm && (
        <CandidateForm onSuccess={() => { setShowForm(false); loadSubmissions(); onMessage('✅ Application submitted successfully!', 'success'); }} onError={(error) => onMessage(`❌ ${error}`, 'error')} />
      )}

      <div style={{ marginTop: '30px' }}>
        <h4>Your Applications ({submissions.length})</h4>
        {submissions.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #dee2e6' }}>
            <p>No applications submitted yet.</p>
            <p>Click "New Application" to get started!</p>
          </div>
        ) : (
          <div>
            {submissions.map((sub, index) => (
              <div key={sub.id || index} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '6px', backgroundColor: '#f8f9fa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '18px' }}>{sub.fullName || 'Unnamed Application'}</strong>
                    <span style={{ background: '#007bff', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', marginLeft: '10px' }}>{sub.id || 'N/A'}</span>
                  </div>
                  <span style={{ background: sub.status === 'approved' ? '#28a745' : sub.status === 'rejected' ? '#dc3545' : '#ffc107', color: 'white', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' }}>{sub.status || 'pending'}</span>
                </div>

                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleView(sub.id)} style={{ padding: '6px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Preview</button>
                  <button onClick={() => handleDownload(sub.id)} style={{ padding: '6px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Download</button>
                  <button onClick={() => handlePrint(sub.id)} style={{ padding: '6px 10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>Print</button>
                  <button onClick={() => handleDelete(sub.id)} style={{ padding: '6px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                </div>

                <div style={{ color: '#666', margin: '8px 0' }}>📧 {sub.email || 'No email'} | 📞 {sub.phone || 'No phone'}</div>
                <div style={{ color: '#666' }}>🎓 {sub.qualification || 'No qualification'} | 💼 {sub.experienceYears || '0'} years experience</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Candidate Form Component
function CandidateForm({ onSuccess, onError }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experienceYears: '',
    skills: '',
    declaration: false,
    // additional personal fields
    dob: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    permanentAddress: '',
    // professional fields
    currentEmployer: '',
    roleAtWork: '',
    preferredLocation: '',
    positionConsidered: '',
    totalExperience: '',
    expInConsideredRole: '',
    dom: '',
    // complex/multi entries
    education: [], // array of strings
    careerHistory: [] // array of strings
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      onError('Full name is required');
      return;
    }

    if (!formData.declaration) {
      onError('Please accept the declaration');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      const toUpperSnake = (s) => s.replace(/([A-Z])/g, '_$1').toUpperCase();

      Object.keys(formData).forEach(key => {
        if (key === 'declaration') return; // handled separately below

        const value = formData[key];
        const payload = (Array.isArray(value) || (value && typeof value === 'object')) ? JSON.stringify(value) : (value !== undefined && value !== null ? String(value) : '');

        // append both naming variants
        formDataToSend.append(key, payload);
        formDataToSend.append(toUpperSnake(key), payload);
      });

      // declaration is sent as 'yes' / 'no' (also mirrored)
      const decl = formData.declaration ? 'yes' : 'no';
      formDataToSend.append('declaration', decl);
      formDataToSend.append('DECLARATION', decl);

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok) {
        // show preview and provide download link
        if (result.previewUrl) setPreviewUrl(result.previewUrl);
        if (result.downloadUrl) setDownloadUrl(result.downloadUrl);
        onSuccess();
        // Reset form (clear all added fields)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          qualification: '',
          experienceYears: '',
          skills: '',
          declaration: false,
          dob: '',
          gender: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          permanentAddress: '',
          currentEmployer: '',
          roleAtWork: '',
          preferredLocation: '',
          positionConsidered: '',
          totalExperience: '',
          expInConsideredRole: '',
          dom: '',
          education: [],
          careerHistory: []
        });
        // Clear newly added section 2..8 fields
        setFormData(prev => ({
          ...prev,
          fatherName: '', fatherDateOfBirth: '', fatherOccupation: '',
          motherName: '', motherDateOfBirth: '', motherOccupation: '',
          spouseName: '', spouseDateOfBirth: '', spouseOccupation: '',
          totalExperienceYears: '', expWithPresentOrg: '', avgExpPerOrganization: '', breakGapInEducationYears: '', breakGapInProfCareerYears: '', roleKcrTeam: '', teamSize: '',
          kraKpi1: '', kraKpi2: '', kraKpi3: '',
          noticePeriodMonths: '', noticePeriodNegotiatedDays: '', reasonForLeavingLastOrg: '', presentCtcFixedAndVariable: '', presentPerMonthSalary: '', anyOtherCompensationBenefit: '', expectedCtc: '', expectedPerMonthTakeHomeSalary: '',
          signature: '', signatureDate: '', signaturePlace: ''
        }));
      } else {
        onError(result.error || 'Submission failed');
      }
    } catch (error) {
      onError('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      margin: '20px 0'
    }}>
      <h4>📋 Candidate Registration Form</h4>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            required
            style={{
              padding: '10px',
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Additional personal fields */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender</label>
            <select value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Address fields */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Present Address</label>
          <input type="text" value={formData.street} onChange={(e) => handleInputChange('street', e.target.value)} placeholder="Street / locality" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <input type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="City" style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} placeholder="State" style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" value={formData.zip} onChange={(e) => handleInputChange('zip', e.target.value)} placeholder="ZIP" style={{ padding: '10px', width: '120px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label style={{ fontSize: '12px', color: '#666' }}>Permanent Address (optional)</label>
            <input type="text" value={formData.permanentAddress} onChange={(e) => handleInputChange('permanentAddress', e.target.value)} placeholder="Permanent address" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', marginTop: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Qualification</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => handleInputChange('qualification', e.target.value)}
              placeholder="Highest qualification"
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience (Years)</label>
            <input
              type="number"
              value={formData.experienceYears}
              onChange={(e) => handleInputChange('experienceYears', e.target.value)}
              placeholder="Years of experience"
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Skills</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            placeholder="List your skills (comma separated)"
            style={{
              padding: '10px',
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Professional extras */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Current Employer</label>
            <input type="text" value={formData.currentEmployer} onChange={(e) => handleInputChange('currentEmployer', e.target.value)} placeholder="Current employer" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Role / Designation</label>
            <input type="text" value={formData.roleAtWork} onChange={(e) => handleInputChange('roleAtWork', e.target.value)} placeholder="Your role" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preferred Location</label>
            <input type="text" value={formData.preferredLocation} onChange={(e) => handleInputChange('preferredLocation', e.target.value)} placeholder="Preferred location" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Position Considered</label>
            <input type="text" value={formData.positionConsidered} onChange={(e) => handleInputChange('positionConsidered', e.target.value)} placeholder="Position applied for" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Total Experience</label>
            <input type="text" value={formData.totalExperience} onChange={(e) => handleInputChange('totalExperience', e.target.value)} placeholder="e.g., 3 years" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience in Considered Role</label>
            <input type="text" value={formData.expInConsideredRole} onChange={(e) => handleInputChange('expInConsideredRole', e.target.value)} placeholder="e.g., 1 year" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Mobility (DOM)</label>
          <input type="date" value={formData.dom} onChange={(e) => handleInputChange('dom', e.target.value)} style={{ padding: '10px', width: '250px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        {/* Education and Career as multi-line textareas (one per line) */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Education (one entry per line)</label>
          <textarea value={(formData.education || []).join('\n')} onChange={(e) => handleInputChange('education', e.target.value.split('\n'))} placeholder="Course - Institution - Year - Grade" style={{ padding: '10px', width: '100%', minHeight: '80px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Career History (one entry per line)</label>
          <textarea value={(formData.careerHistory || []).join('\n')} onChange={(e) => handleInputChange('careerHistory', e.target.value.split('\n'))} placeholder="Org - Designation - From - To - Salary" style={{ padding: '10px', width: '100%', minHeight: '80px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>

        {/* SECTION 2: PERSONAL DETAILS (FATHER / MOTHER / SPOUSE) */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>PERSONAL DETAILS</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="text" placeholder="Father's Name" value={formData.fatherName} onChange={(e) => handleInputChange('fatherName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="date" placeholder="Father DOB" value={formData.fatherDateOfBirth} onChange={(e) => handleInputChange('fatherDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Father Occupation" value={formData.fatherOccupation} onChange={(e) => handleInputChange('fatherOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />

            <input type="text" placeholder="Mother's Name" value={formData.motherName} onChange={(e) => handleInputChange('motherName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="date" placeholder="Mother DOB" value={formData.motherDateOfBirth} onChange={(e) => handleInputChange('motherDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Mother Occupation" value={formData.motherOccupation} onChange={(e) => handleInputChange('motherOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />

            <input type="text" placeholder="Spouse Name (if married)" value={formData.spouseName} onChange={(e) => handleInputChange('spouseName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="date" placeholder="Spouse DOB" value={formData.spouseDateOfBirth} onChange={(e) => handleInputChange('spouseDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Spouse Occupation" value={formData.spouseOccupation} onChange={(e) => handleInputChange('spouseOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        {/* SECTION 3: EDUCATIONAL PROGRESS - note: education entries are captured as lines in the education textarea; for richer UX we can add dynamic rows in future */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>EDUCATIONAL PROGRESS</h5>
          <p style={{ fontSize: '13px', color: '#666' }}>Please add each qualification on a new line in the Education box above (Course | Institute | Board | Place | %/CGPA | YOS | YOP | FT/PT/DL)</p>
        </div>

        {/* SECTION 4: TOTAL EXPERIENCE & GAPS */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>TOTAL EXPERIENCE & GAPS</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="text" placeholder="Total Experience (years)" value={formData.totalExperienceYears} onChange={(e) => handleInputChange('totalExperienceYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Experience with present org" value={formData.expWithPresentOrg} onChange={(e) => handleInputChange('expWithPresentOrg', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Avg experience per org" value={formData.avgExpPerOrganization} onChange={(e) => handleInputChange('avgExpPerOrganization', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Break/gap in education (years)" value={formData.breakGapInEducationYears} onChange={(e) => handleInputChange('breakGapInEducationYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Break/gap in prof career (years)" value={formData.breakGapInProfCareerYears} onChange={(e) => handleInputChange('breakGapInProfCareerYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Role KCR/Team" value={formData.roleKcrTeam} onChange={(e) => handleInputChange('roleKcrTeam', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Team Size" value={formData.teamSize} onChange={(e) => handleInputChange('teamSize', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        {/* SECTION 5: CAREER CONTOUR - Career history lines are used; for richer structure we can parse lines into objects in the future */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>CAREER CONTOUR</h5>
          <p style={{ fontSize: '13px', color: '#666' }}>Add up to 7 entries in the Career History box above. Each line: Organization | Designation | Salary Fixed | Salary Variable | Salary Total CTC | Salary Per Month | Duration From | Duration To</p>
        </div>

        {/* SECTION 6: KRA / KPI */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>ROLE (MAJOR KRA / KPI)</h5>
          <textarea value={formData.kraKpi1} onChange={(e) => handleInputChange('kraKpi1', e.target.value)} placeholder="KRA / KPI 1" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <textarea value={formData.kraKpi2} onChange={(e) => handleInputChange('kraKpi2', e.target.value)} placeholder="KRA / KPI 2" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '8px' }} />
          <textarea value={formData.kraKpi3} onChange={(e) => handleInputChange('kraKpi3', e.target.value)} placeholder="KRA / KPI 3" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '8px' }} />
        </div>

        {/* SECTION 7: OTHER DETAILS */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>OTHER DETAILS</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="text" placeholder="Notice period (months)" value={formData.noticePeriodMonths} onChange={(e) => handleInputChange('noticePeriodMonths', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Negotiated notice (days)" value={formData.noticePeriodNegotiatedDays} onChange={(e) => handleInputChange('noticePeriodNegotiatedDays', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Reason for leaving last org" value={formData.reasonForLeavingLastOrg} onChange={(e) => handleInputChange('reasonForLeavingLastOrg', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Present CTC (F & V)" value={formData.presentCtcFixedAndVariable} onChange={(e) => handleInputChange('presentCtcFixedAndVariable', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Present per month salary" value={formData.presentPerMonthSalary} onChange={(e) => handleInputChange('presentPerMonthSalary', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Any other compensation / benefit" value={formData.anyOtherCompensationBenefit} onChange={(e) => handleInputChange('anyOtherCompensationBenefit', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Expected CTC" value={formData.expectedCtc} onChange={(e) => handleInputChange('expectedCtc', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Expected per month take-home" value={formData.expectedPerMonthTakeHomeSalary} onChange={(e) => handleInputChange('expectedPerMonthTakeHomeSalary', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        {/* SECTION 8: DECLARATION SIGNATURE */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>DECLARATION</h5>
          <input type="text" placeholder="Signature (type your name)" value={formData.signature} onChange={(e) => handleInputChange('signature', e.target.value)} style={{ padding: '8px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <input type="date" placeholder="Date" value={formData.signatureDate} onChange={(e) => handleInputChange('signatureDate', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Place" value={formData.signaturePlace} onChange={(e) => handleInputChange('signaturePlace', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={formData.declaration}
              onChange={(e) => handleInputChange('declaration', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span>✅ I declare that all information provided is true and correct</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 30px',
            backgroundColor: loading ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Submitting...' : '📤 Submit Application'}
        </button>
      </form>

      {/* Preview and actions */}
      {previewUrl && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h5>Preview</h5>
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '6px', background: '#fff' }}>
            <iframe
              title="pdf-preview"
              src={previewUrl}
              style={{ width: '100%', height: '500px', border: 'none' }}
            />
          </div>

          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <a href={previewUrl} download="submission.pdf">
              <button type="button" style={{ padding: '10px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Download Preview</button>
            </a>

            {downloadUrl && (
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <button type="button" style={{ padding: '10px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Open Download</button>
              </a>
            )}

            <button type="button" onClick={() => {
              // open preview in new window for printing
              const w = window.open(previewUrl, '_blank');
              if (w) {
                // give the window a moment to load then print
                setTimeout(() => w.print(), 500);
              }
            }} style={{ padding: '10px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Print</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard({ user, onMessage, onBack }) {
  const [submissions, setSubmissions] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewing, setPreviewing] = useState(false);
  const [hrForm, setHrForm] = useState({ username: '', password: '' });

  const loadSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/submissions', {
        headers: { Authorization: 'Bearer ' + token }
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
        onMessage(`✅ Loaded ${data.length} submissions`, 'success');
      } else {
        onMessage('❌ Failed to load submissions', 'error');
      }
    } catch (error) {
      onMessage('❌ Network error', 'error');
    }
  };

  const createHRAccount = async () => {
    if (!hrForm.username || !hrForm.password) {
      onMessage('❌ Please fill all fields', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/create-hr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(hrForm)
      });

      const data = await response.json();

      if (response.ok) {
        onMessage(`✅ HR account created for: ${data.username}`, 'success');
        setHrForm({ username: '', password: '' });
      } else {
        onMessage(`❌ ${data.error}`, 'error');
      }
    } catch (error) {
      onMessage('❌ Network error', 'error');
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Admin uses the shared fetchPdfAndCreateUrl helper
  const adminHandleView = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      setPreviewUrl(r.url);
      setPreviewing(true);
    }
  };

  const adminHandleDownload = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      const a = document.createElement('a');
      a.href = r.url;
      a.download = `${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const adminHandlePrint = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      const w = window.open(r.url, '_blank');
      if (w) setTimeout(() => w.print(), 500);
    }
  };

  return (
    <div>
      {previewing && previewUrl && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ width: '80%', height: '80%', background: 'white', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <button onClick={() => { setPreviewing(false); setPreviewUrl(null); }} style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 10, padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#dc3545', color: 'white' }}>Close</button>
            <iframe src={previewUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="submission-preview" />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>👑 Admin Dashboard</h3>
        <button
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </div>

      <p>Welcome, <strong>{user.username}</strong>! Manage the system.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <h5>Create HR Account</h5>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="HR Username"
              value={hrForm.username}
              onChange={(e) => setHrForm({ ...hrForm, username: e.target.value })}
              style={{
                padding: '10px',
                width: '100%',
                margin: '5px 0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="password"
              placeholder="HR Password"
              value={hrForm.password}
              onChange={(e) => setHrForm({ ...hrForm, password: e.target.value })}
              style={{
                padding: '10px',
                width: '100%',
                margin: '5px 0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            onClick={createHRAccount}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create HR Account
          </button>
        </div>

        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <h5>System Overview</h5>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <div>📊 Total Submissions: <strong>{submissions.length}</strong></div>
            <div>👤 User Accounts: <strong>{new Set(submissions.map(s => s.userId)).size}</strong></div>
            <div>⏰ Last Updated: <strong>{new Date().toLocaleTimeString()}</strong></div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4>All Submissions ({submissions.length})</h4>
          <button
            onClick={loadSubmissions}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh
          </button>
        </div>

        {submissions.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #dee2e6'
          }}>
            <p>No submissions found.</p>
          </div>
        ) : (
          <div>
            {submissions.map((sub, index) => (
              <div
                key={sub.id || index}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '6px',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '16px' }}>{sub.fullName || 'Unnamed Application'}</strong>
                    <span style={{
                      background: '#6c757d',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      marginLeft: '10px'
                    }}>
                      {sub.id || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span style={{
                      background: sub.status === 'approved' ? '#28a745' :
                        sub.status === 'rejected' ? '#dc3545' : '#ffc107',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      marginRight: '10px'
                    }}>
                      {sub.status || 'pending'}
                    </span>
                    <span style={{
                      background: '#17a2b8',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}>
                      User: {sub.userId ? sub.userId.substring(0, 8) + '...' : 'Unknown'}
                    </span>
                  </div>
                </div>
                <div style={{ color: '#666', margin: '8px 0' }}>
                  📧 {sub.email || 'No email'} | 📞 {sub.phone || 'No phone'}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  🎓 {sub.qualification || 'No qualification'} | 💼 {sub.experienceYears || '0'} years
                </div>
                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => adminHandleView(sub.id)} style={{ padding: '6px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}>Preview</button>
                  <button onClick={() => adminHandleDownload(sub.id)} style={{ padding: '6px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}>Download</button>
                  <button onClick={() => adminHandlePrint(sub.id)} style={{ padding: '6px 10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}>Print</button>
                </div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
                  Submitted: {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Unknown date'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// HR Dashboard Component - FIXED VERSION
function HRDashboard({ user, onMessage, onBack }) {
  const [submissions, setSubmissions] = useState([]);
  const [previewing, setPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const loadSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/submissions', {
        headers: { Authorization: 'Bearer ' + token }
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
        onMessage(`✅ Loaded ${data.length} submissions`, 'success');
      } else {
        onMessage('❌ Failed to load submissions', 'error');
      }
    } catch (error) {
      onMessage('❌ Network error', 'error');
    }
  };

  // Add these missing functions to HRDashboard
  const hrHandleView = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      setPreviewUrl(r.url);
      setPreviewing(true);
    }
  };

  const hrHandleDownload = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      const a = document.createElement('a');
      a.href = r.url;
      a.download = `${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const hrHandlePrint = async (id) => {
    const r = await fetchPdfAndCreateUrl(id, onMessage);
    if (r) {
      const w = window.open(r.url, '_blank');
      if (w) setTimeout(() => w.print(), 500);
    }
  };

  const handleApprove = (id) => {
    if (confirm(`Approve submission ${id}?`)) {
      onMessage(`✅ Submission ${id} approved!`, 'success');
      // In real app, you would call API to update status
    }
  };

  const handleReject = (id) => {
    if (confirm(`Reject submission ${id}?`)) {
      onMessage(`❌ Submission ${id} rejected!`, 'error');
      // In real app, you would call API to update status
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <div>
      {/* PDF Preview Modal */}
      {previewing && previewUrl && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ width: '80%', height: '80%', background: 'white', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <button onClick={() => { setPreviewing(false); setPreviewUrl(null); }} style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 10, padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#dc3545', color: 'white' }}>Close</button>
            <iframe src={previewUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="submission-preview" />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>💼 HR Dashboard</h3>
        <button
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </div>

      <p>Welcome, <strong>{user.username}</strong>! Review candidate applications.</p>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={loadSubmissions}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🔄 Refresh Submissions
        </button>
      </div>

      <div>
        <h4>Candidate Submissions ({submissions.length})</h4>

        {submissions.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #dee2e6'
          }}>
            <p>No submissions found.</p>
            <p>Click "Refresh Submissions" to load applications.</p>
          </div>
        ) : (
          <div>
            {submissions.map((sub, index) => (
              <div
                key={sub.id || index}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '6px',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '18px' }}>{sub.fullName || 'Unnamed Application'}</strong>
                    <span style={{
                      background: '#007bff',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      marginLeft: '10px'
                    }}>
                      {sub.id || 'N/A'}
                    </span>
                  </div>
                  <span style={{
                    background: sub.status === 'approved' ? '#28a745' :
                      sub.status === 'rejected' ? '#dc3545' : '#ffc107',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '12px'
                  }}>
                    {sub.status || 'pending'}
                  </span>
                </div>
                <div style={{ color: '#666', margin: '8px 0' }}>
                  📧 {sub.email || 'No email'} | 📞 {sub.phone || 'No phone'}
                </div>
                <div style={{ color: '#666' }}>
                  🎓 {sub.qualification || 'No qualification'} | 💼 {sub.experienceYears || '0'} years experience
                </div>
                <div style={{ color: '#666', margin: '8px 0' }}>
                  🔧 Skills: {sub.skills || 'Not specified'}
                </div>

                {/* Fixed Action Buttons */}
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleApprove(sub.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(sub.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => hrHandleView(sub.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => hrHandleDownload(sub.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Download
                  </button>
                  <button
                    onClick={() => hrHandlePrint(sub.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Print
                  </button>
                </div>

                <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
                  Submitted: {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Unknown date'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}