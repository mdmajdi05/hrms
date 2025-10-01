'use client';
import { useState, useEffect } from 'react';
import {CandidateForm} from './CandidateForm.js';
import { fetchPdfAndCreateUrl } from '../app/page-old.js'
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
export default UserDashboard;