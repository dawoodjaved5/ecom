import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search for products..." }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-16 py-5 text-lg rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 bg-white/60 backdrop-blur-md shadow-2xl transition-all duration-300"
          />
          <button
            type="button"
            onClick={clearSearch}
            className={`absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-opacity duration-200 ${searchQuery ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            tabIndex={-1}
            aria-label="Clear search"
          >
            <X size={22} />
          </button>
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
