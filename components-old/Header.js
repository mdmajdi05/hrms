function Header({ user, onNavigate, onLogout }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', backgroundColor: '#0d6efd', color: 'white', borderRadius: '6px' }}>
      <div style={{ fontWeight: '700', fontSize: '18px' }}>🚀 Simple Candidate System</div>
      <nav style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Home</button>
        <button onClick={() => onNavigate('user')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>User</button>
        <button onClick={() => onNavigate('staff')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Staff</button>
      </nav>
      <div>
        {user ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>{user.username} ({user.role})</span>
            <button onClick={onLogout} style={{ padding: '6px 10px', backgroundColor: '#dc3545', border: 'none', color: 'white', borderRadius: '4px' }}>Logout</button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
export default Header;