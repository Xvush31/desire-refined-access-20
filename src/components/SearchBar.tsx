
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-md">
      <Input
        type="search"
        placeholder="Rechercher..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-10 w-full bg-secondary/50 border-none"
      />
      <button 
        type="submit"
        className="absolute right-2 p-2 text-muted-foreground hover:text-foreground"
        aria-label="Rechercher"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
