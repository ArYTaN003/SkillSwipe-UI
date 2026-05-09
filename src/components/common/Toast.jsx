import { useState, useEffect, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext(null);

const typeStyles = {
  success: { background: '#52c41a', color: '#fff' },
  error: { background: '#ff4d4f', color: '#fff' },
  info: { background: '#6c63ff', color: '#fff' },
  warning: { background: '#faad14', color: '#fff' },
};

function ToastItem({ id, message, type, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(id), 3500);
    return () => clearTimeout(t);
  }, [id, onRemove]);

  return (
    <div
      style={{
        ...typeStyles[type],
        padding: '12px 18px', borderRadius: '8px',
        marginBottom: '8px', fontSize: '14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex', alignItems: 'center', gap: '10px',
        minWidth: '260px', maxWidth: '360px',
        animation: 'slideIn 0.3s ease',
      }}
    >
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => onRemove(id)}
        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px' }}
      >
        ×
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const show = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000 }}>
        <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }`}</style>
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
