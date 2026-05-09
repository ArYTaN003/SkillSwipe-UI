const variants = {
  primary: { background: '#6c63ff', color: '#fff', border: 'none' },
  secondary: { background: '#f0eeff', color: '#6c63ff', border: '1px solid #6c63ff' },
  danger: { background: '#ff4d4f', color: '#fff', border: 'none' },
  ghost: { background: 'transparent', color: '#6c63ff', border: '1px solid #e0e0e0' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  style = {},
}) {
  const padding = size === 'sm' ? '6px 14px' : size === 'lg' ? '12px 28px' : '9px 20px';
  const fontSize = size === 'sm' ? '13px' : size === 'lg' ? '16px' : '14px';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        padding,
        fontSize,
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontWeight: 500,
        transition: 'opacity 0.2s',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
