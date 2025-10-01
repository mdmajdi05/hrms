export const fetchPdfAndCreateUrl = async (id, onMessage) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/download/${id}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    if (!res.ok) throw new Error('Failed to fetch PDF');
    const buf = await res.arrayBuffer();
    const blob = new Blob([buf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return { url, blob };
  } catch (err) {
    if (typeof onMessage === 'function') onMessage('❌ ' + err.message, 'error');
    return null;
  }
};