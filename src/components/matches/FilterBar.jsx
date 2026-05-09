import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';

export default function FilterBar({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '24px', alignItems: 'flex-end' }}>
      <InputField
        name="query"
        label="Search users by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. Alice…"
        style={{ flex: 1, marginBottom: 0 }}
      />
      <Button type="submit" style={{ marginBottom: '16px' }}>Search</Button>
      {query && (
        <Button variant="ghost" onClick={() => { setQuery(''); onSearch(''); }} style={{ marginBottom: '16px' }}>
          Clear
        </Button>
      )}
    </form>
  );
}
