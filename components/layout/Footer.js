export default function Footer() {
  return (
    <footer style={{ marginTop: '36px', padding: '20px', textAlign: 'center', color: '#666', borderTop: '1px solid #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
        <div>© {new Date().getFullYear()} CareerDoc</div>
        <div style={{ color: '#999' }}>•</div>
        <div>Developed by Majdi</div>
      </div>
      <div style={{ marginTop: '8px', fontSize: '13px', color: '#999' }}>Built with ❤️ for fast hiring</div>
    </footer>
  );
}