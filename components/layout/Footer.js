export default function Footer() {
  return (
    <footer style={{ marginTop: '36px', padding: '20px', textAlign: 'center', color: '#666', borderTop: '1px solid #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
        <div>© {new Date().getFullYear()} HRMS</div>
        <div style={{ color: '#999' }}>•</div>
        <div>Developed by Majdi</div>
      </div>
      
    </footer>
  );
}