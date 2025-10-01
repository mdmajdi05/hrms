export default function Header({ user, onNavigate, onLogout }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: 'linear-gradient(90deg, #0d6efd 0%, #6610f2 100%)', color: 'white', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontWeight: 800, fontSize: '20px' }}>🌟 HRMS</div>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>Hire faster. Manage better.</div>
      </div>

      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px' }}>Home</button>
        <button onClick={() => onNavigate('user')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px' }}>Candidates</button>
        <button onClick={() => onNavigate('staff')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px' }}>Staff</button>
      </nav>

      <div>
        {user ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right', fontSize: '14px' }}>
              <div style={{ fontWeight: 700 }}>{user.username}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>{user.role}</div>
            </div>
            <button onClick={onLogout} style={{ padding: '8px 12px', backgroundColor: '#ff6b6b', border: 'none', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => onNavigate('user')} style={{ padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>Sign In</button>
          </div>
        )}
      </div>
    </header>
  );
}