export default function RatingStars({ value, onChange, size = 28 }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={() => onChange && onChange(n)}
          style={{
            fontSize: size, cursor: onChange ? 'pointer' : 'default',
            color: n <= value ? '#faad14' : '#d9d9d9',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
