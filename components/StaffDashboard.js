'use client';

export default function StaffDashboard({ user }) {
  return (
    <div>
      <h3>{user.role === 'admin' ? '👑 Admin' : '💼 HR'} Dashboard</h3>
      <p>Welcome, {user.username}! Manage candidate submissions here.</p>
      <div style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        marginTop: '20px'
      }}>
        <p>Submission management component will be implemented here.</p>
      </div>
    </div>
  );
}
