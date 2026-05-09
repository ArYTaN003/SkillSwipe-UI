export default function Loader({ size = 40, message = '' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div
        style={{
          width: size, height: size,
          border: `3px solid #e0e0e0`,
          borderTop: `3px solid #6c63ff`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {message && <p style={{ marginTop: '12px', color: '#888', fontSize: '14px' }}>{message}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
