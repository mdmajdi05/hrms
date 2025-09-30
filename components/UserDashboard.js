'use client';
import { useState, useEffect } from 'react';

export default function UserDashboard({ user, onMessage, onBack }) {
  const [submissions, setSubmissions] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewing, setPreviewing] = useState(false);

  const loadSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/submissions', { headers: { Authorization: 'Bearer ' + token } });
      if (!res.ok) throw new Error('Failed to load submissions');
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      onMessage && onMessage('❌ ' + err.message, 'error');
    }
  };

  useEffect(() => { loadSubmissions(); }, []);

  const fetchPdf = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/download/${id}`, { headers: { Authorization: 'Bearer ' + token } });
    if (!res.ok) throw new Error('Failed to fetch PDF');
    const buf = await res.arrayBuffer();
    const blob = new Blob([buf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return { url, blob };
  };

  const handleView = async (id) => {
    try {
      const r = await fetchPdf(id);
      setPreviewUrl(r.url);
      setPreviewing(true);
    } catch (err) {
      onMessage && onMessage('❌ ' + err.message, 'error');
    }
  };

  const handleDownload = async (id) => {
    try {
      const r = await fetchPdf(id);
      const a = document.createElement('a');
      a.href = r.url; a.download = `${id}.pdf`; document.body.appendChild(a); a.click(); a.remove();
    } catch (err) {
      onMessage && onMessage('❌ ' + err.message, 'error');
    }
  };

  const handlePrint = async (id) => {
    try {
      const r = await fetchPdf(id);
      const w = window.open(r.url, '_blank');
      if (w) setTimeout(() => w.print(), 500);
    } catch (err) {
      onMessage && onMessage('❌ ' + err.message, 'error');
    }
  };

  return (
    <div>
      <h3>👤 Your Submissions</h3>
      <button onClick={onBack} style={{ padding: '8px 12px', marginBottom: '10px' }}>← Back</button>

      {previewing && previewUrl && (
        <div style={{ marginBottom: '10px' }}>
          <iframe src={previewUrl} title="preview" style={{ width: '100%', height: '400px', border: '1px solid #ddd' }} />
          <div style={{ marginTop: '8px' }}>
            <button onClick={() => { setPreviewing(false); setPreviewUrl(null); }} style={{ marginRight: '8px' }}>Close Preview</button>
            <button onClick={() => window.open(previewUrl)} style={{ marginRight: '8px' }}>Open</button>
            <button onClick={() => { const a=document.createElement('a'); a.href=previewUrl; a.download='submission.pdf'; document.body.appendChild(a); a.click(); a.remove(); }}>Download</button>
          </div>
        </div>
      )}

      {submissions.length === 0 ? (
        <div style={{ padding: '20px', background: '#f8f9fa' }}>No submissions yet.</div>
      ) : (
        <div>
          {submissions.map(s => (
            <div key={s.id} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '8px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{s.fullName}</strong> <div style={{ fontSize: '12px', color: '#666' }}>{s.qualification} · {s.experienceYears} years</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => handleView(s.id)} style={{ padding: '6px 10px' }}>Preview</button>
                  <button onClick={() => handleDownload(s.id)} style={{ padding: '6px 10px' }}>Download</button>
                  <button onClick={() => handlePrint(s.id)} style={{ padding: '6px 10px' }}>Print</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
