'use client';
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UserAuth from '../components/auth/UserAuth';
import StaffAuth from '../components/auth/StaffAuth';
import UserDashboard from '../components/dashboards/UserDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import HRDashboard from '../components/dashboards/HRDashboard';
import { fetchPdfAndCreateUrl } from '../components/shared/pdfHelper';

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

  const handleUserLogin = (userData) => {
    setUser(userData);
    setCurrentView('userDashboard');
    showMessage('Login successful!', 'success');
  };

  const handleStaffLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'admin') setCurrentView('adminDashboard');
    else setCurrentView('hrDashboard');
    showMessage('Login successful!', 'success');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '12px auto' }}>
        <Header user={user} onNavigate={(v) => setCurrentView(v)} onLogout={logout} />

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '900px', margin: '20px auto', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>

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
              <section style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: '30px' }}>
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>Hire smarter. Onboard faster.</h1>
                  <p style={{ color: '#555', maxWidth: '560px', margin: '0 0 18px' }}>Create beautiful candidate profiles, review applications, and download complete PDF dossiers. Fast for teams — simple for small businesses.</p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
                    <button onClick={showUser} style={{ padding: '12px 22px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>Get Started</button>
                    <button onClick={showStaff} style={{ padding: '12px 22px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>For HR / Admin</button>
                  </div>

                  <div style={{ marginTop: '22px', display: 'flex', gap: '12px', color: '#666' }}>
                    <div><strong>✅</strong> Quick candidate form</div>
                    <div><strong>✅</strong> PDF export</div>
                    <div><strong>✅</strong> Role-based access</div>
                  </div>
                </div>

                <div style={{ width: '420px', background: '#fbfdff', border: '1px solid #eef3ff', padding: '18px', borderRadius: '10px', boxShadow: '0 6px 20px rgba(13,110,253,0.08)' }}>
                  <h3 style={{ marginTop: 0 }}>Apply now</h3>
                  {/* CandidateForm component - lightweight inclusion */}
                  <div>
                    {/* Lazy inline form placeholder to keep page light; the real CandidateForm is available on user portal */}
                    <p style={{ fontSize: '13px', color: '#666' }}>Open the User Portal to fill the full application form and upload documents.</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button onClick={showUser} style={{ flex: 1, padding: '10px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '6px' }}>Open User Portal</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {currentView === 'user' && !user && (
            <UserAuth onLogin={handleUserLogin} onMessage={showMessage} />
          )}

          {currentView === 'userDashboard' && user && user.role === 'user' && (
            <UserDashboard user={user} onMessage={showMessage} onBack={showHome} />
          )}

          {currentView === 'staff' && !user && (
            <StaffAuth onLogin={handleStaffLogin} onMessage={showMessage} />
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

        <Footer />
      </div>
    </div>
  );
}