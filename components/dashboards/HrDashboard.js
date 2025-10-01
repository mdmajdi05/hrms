// import { useState, useEffect } from 'react';
// import { fetchPdfAndCreateUrl } from '../shared/pdfHelper';

// export default function HRDashboard({ user, onMessage, onBack }) {
//   const [submissions, setSubmissions] = useState([]);
//   const [previewing, setPreviewing] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const loadSubmissions = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/submissions', {
//         headers: { Authorization: 'Bearer ' + token }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSubmissions(data);
//         onMessage(`✅ Loaded ${data.length} submissions`, 'success');
//       } else {
//         onMessage('❌ Failed to load submissions', 'error');
//       }
//     } catch (error) {
//       onMessage('❌ Network error', 'error');
//     }
//   };

//   const hrHandleView = async (id) => {
//     const r = await fetchPdfAndCreateUrl(id, onMessage);
//     if (r) {
//       setPreviewUrl(r.url);
//       setPreviewing(true);
//     }
//   };

//   const hrHandleDownload = async (id) => {
//     const r = await fetchPdfAndCreateUrl(id, onMessage);
//     if (r) {
//       const a = document.createElement('a');
//       a.href = r.url;
//       a.download = `${id}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     }
//   };

//   const hrHandlePrint = async (id) => {
//     const r = await fetchPdfAndCreateUrl(id, onMessage);
//     if (r) {
//       const w = window.open(r.url, '_blank');
//       if (w) setTimeout(() => w.print(), 500);
//     }
//   };

//   const handleApprove = (id) => {
//     if (confirm(`Approve submission ${id}?`)) {
//       onMessage(`✅ Submission ${id} approved!`, 'success');
//     }
//   };

//   const handleReject = (id) => {
//     if (confirm(`Reject submission ${id}?`)) {
//       onMessage(`❌ Submission ${id} rejected!`, 'error');
//     }
//   };

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   return (
//     <div>
//       {previewing && previewUrl && (
//         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
//           <div style={{ width: '80%', height: '80%', background: 'white', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
//             <button onClick={() => { setPreviewing(false); setPreviewUrl(null); }} style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 10, padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#dc3545', color: 'white' }}>Close</button>
//             <iframe src={previewUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="submission-preview" />
//           </div>
//         </div>
//       )}

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h3>💼 HR Dashboard</h3>
//         <button
//           onClick={onBack}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#6c757d',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           ← Back
//         </button>
//       </div>

//       <p>Welcome, <strong>{user.username}</strong>! Review candidate applications.</p>

//       <div style={{ marginBottom: '20px' }}>
//         <button
//           onClick={loadSubmissions}
//           style={{
//             padding: '10px 20px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//             fontSize: '16px'
//           }}
//         >
//           🔄 Refresh Submissions
//         </button>
//       </div>

//       <div>
//         <h4>Candidate Submissions ({submissions.length})</h4>

//         {submissions.length === 0 ? (
//           <div style={{
//             padding: '40px',
//             textAlign: 'center',
//             backgroundColor: '#f8f9fa',
//             borderRadius: '6px',
//             border: '1px solid #dee2e6'
//           }}>
//             <p>No submissions found.</p>
//             <p>Click "Refresh Submissions" to load applications.</p>
//           </div>
//         ) : (
//           <div>
//             {submissions.map((sub, index) => (
//               <div
//                 key={sub.id || index}
//                 style={{
//                   border: '1px solid #ddd',
//                   padding: '15px',
//                   margin: '10px 0',
//                   borderRadius: '6px',
//                   backgroundColor: 'white'
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <div>
//                     <strong style={{ fontSize: '18px' }}>{sub.fullName || 'Unnamed Application'}</strong>
//                     <span style={{
//                       background: '#007bff',
//                       color: 'white',
//                       padding: '2px 8px',
//                       borderRadius: '12px',
//                       fontSize: '12px',
//                       marginLeft: '10px'
//                     }}>
//                       {sub.id || 'N/A'}
//                     </span>
//                   </div>
//                   <span style={{
//                     background: sub.status === 'approved' ? '#28a745' :
//                       sub.status === 'rejected' ? '#dc3545' : '#ffc107',
//                     color: 'white',
//                     padding: '4px 12px',
//                     borderRadius: '15px',
//                     fontSize: '12px'
//                   }}>
//                     {sub.status || 'pending'}
//                   </span>
//                 </div>
//                 <div style={{ color: '#666', margin: '8px 0' }}>
//                   📧 {sub.email || 'No email'} | 📞 {sub.phone || 'No phone'}
//                 </div>
//                 <div style={{ color: '#666' }}>
//                   🎓 {sub.qualification || 'No qualification'} | 💼 {sub.experienceYears || '0'} years experience
//                 </div>
//                 <div style={{ color: '#666', margin: '8px 0' }}>
//                   🔧 Skills: {sub.skills || 'Not specified'}
//                 </div>

//                 <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//                   <button
//                     onClick={() => handleApprove(sub.id)}
//                     style={{
//                       padding: '6px 12px',
//                       backgroundColor: '#28a745',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px'
//                     }}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleReject(sub.id)}
//                     style={{
//                       padding: '6px 12px',
//                       backgroundColor: '#dc3545',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px'
//                     }}
//                   >
//                     Reject
//                   </button>
//                   <button
//                     onClick={() => hrHandleView(sub.id)}
//                     style={{
//                       padding: '6px 12px',
//                       backgroundColor: '#007bff',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px'
//                     }}
//                   >
//                     Preview
//                   </button>
//                   <button
//                     onClick={() => hrHandleDownload(sub.id)}
//                     style={{
//                       padding: '6px 12px',
//                       backgroundColor: '#6c757d',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px'
//                     }}
//                   >
//                     Download
//                   </button>
//                   <button
//                     onClick={() => hrHandlePrint(sub.id)}
//                     style={{
//                       padding: '6px 12px',
//                       backgroundColor: '#17a2b8',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px'
//                     }}
//                   >
//                     Print
//                   </button>
//                 </div>

//                 <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
//                   Submitted: {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Unknown date'}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { fetchPdfAndCreateUrl } from '../shared/pdfHelper';

export default function HRDashboard({ user, onMessage, onBack }) {
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

  // Add delete functionality for HR
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

  const handleApprove = (id) => {
    if (confirm(`Approve submission ${id}?`)) {
      onMessage(`✅ Submission ${id} approved!`, 'success');
    }
  };

  const handleReject = (id) => {
    if (confirm(`Reject submission ${id}?`)) {
      onMessage(`❌ Submission ${id} rejected!`, 'error');
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

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
                  {/* Add Delete button for HR */}
                  <button
                    onClick={() => handleDelete(sub.id)}
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
                    Delete
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