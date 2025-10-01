function Footer() {
  return (
    <footer style={{ marginTop: '24px', padding: '12px 20px', textAlign: 'center', color: '#666' }}>
      <div>© {new Date().getFullYear()} Simple Candidate System</div>
      <div style={{ marginTop: '6px' }}>Developed by Majdi</div>
    </footer>
  );
}
export default Footer;