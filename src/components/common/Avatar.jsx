export default function Avatar({ name = '', size = 40, src = null, style = {} }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = ['#6c63ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ff8b94'];
  const color = colors[name.charCodeAt(0) % colors.length] || '#6c63ff';

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', ...style }}
      />
    );
  }

  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.36, fontWeight: 600,
        flexShrink: 0,
        ...style,
      }}
    >
      {initials || '?'}
    </div>
  );
}
