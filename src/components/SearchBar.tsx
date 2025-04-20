
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-muted border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-esports-purple"
        />
      </div>
    </form>
  );
};

export default SearchBar;
