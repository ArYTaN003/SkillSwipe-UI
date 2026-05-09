export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '20px' }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        style={btnStyle(false, page === 1)}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} style={btnStyle(p === page, false)}>
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        style={btnStyle(false, page === totalPages)}
      >
        ›
      </button>
    </div>
  );
}

function btnStyle(active, disabled) {
  return {
    padding: '6px 12px', borderRadius: '6px', border: '1px solid #d9d9d9',
    background: active ? '#6c63ff' : '#fff', color: active ? '#fff' : '#333',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
    fontWeight: active ? 600 : 400, fontSize: '14px',
  };
}
