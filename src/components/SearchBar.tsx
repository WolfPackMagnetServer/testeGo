import React from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar...",
}) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
