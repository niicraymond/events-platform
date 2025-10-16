function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  