export default function InputField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  disabled = false,
  style = {},
}) {
  return (
    <div style={{ marginBottom: '16px', ...style }}>
      {label && (
        <label
          htmlFor={name}
          style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500, color: '#333' }}
        >
          {label}
          {required && <span style={{ color: '#ff4d4f', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '14px',
          border: `1px solid ${error ? '#ff4d4f' : '#d9d9d9'}`,
          borderRadius: '8px',
          outline: 'none',
          boxSizing: 'border-box',
          background: disabled ? '#f5f5f5' : '#fff',
          color: '#333',
        }}
      />
      {error && <p style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
    </div>
  );
}
