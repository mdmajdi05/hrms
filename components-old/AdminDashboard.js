'use client';
import { useState, useEffect } from 'react';
import { fetchPdfAndCreateUrl } from '../app/page-old.js';
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
export default AdminDashboard;