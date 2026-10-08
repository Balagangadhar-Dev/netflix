import React, { useRef } from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. React Refs (`useRef`):
 *    - `searchInputRef = useRef(null)` creates a mutable reference object whose `.current` property
 *      points directly to the actual HTML <input> DOM element.
 *    - Used here for programmatic focus (`searchInputRef.current.focus()`)!
 * 2. React Forms & Controlled Inputs:
 *    - Value is driven by React state (`searchTerm`)
 *    - Any change triggers `onChange`, synchronizing the UI with state.
 * 3. React Events:
 *    - `onChange` captures synthetic input change events.
 *    - `onKeyDown` handles keyboard shortcuts (e.g. Escape to clear search).
 * 4. React Fragments:
 *    - Grouping genre filter buttons cleanly.
 */
export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  genres = [],
}) {
  // 🔍 REACT REF DEMO:
  const searchInputRef = useRef(null);

  const handleFocusClick = () => {
    // Directly accessing the underlying DOM node using the ref!
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  };

  const handleClear = () => {
    onSearchChange('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    // ⚡ REACT EVENT DEMO: Keyboard events
    if (event.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="search-section">
      <div className="search-bar-wrapper">
        <span className="search-icon">🔍</span>
        <input
          ref={searchInputRef} // Attaching the React Ref to the DOM input
          type="text"
          className="search-input"
          placeholder="Search by title, genre, director, or cast... (Press Esc to clear)"
          value={searchTerm} // Controlled Input
          onChange={(e) => onSearchChange(e.target.value)} // React Event
          onKeyDown={handleKeyDown} // React Event
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search"
          >
            ✕
          </button>
        )}
        <button
          type="button"
          className="ref-focus-btn"
          onClick={handleFocusClick}
          title="Demonstrates React useRef by imperatively calling .focus() on the DOM input"
        >
          🎯 Focus Input (useRef Demo)
        </button>
      </div>

      {/* Genre Filter Pills */}
      <div className="genre-pill-list">
        <button
          className={`genre-pill ${selectedGenre === 'ALL' ? 'active' : ''}`}
          onClick={() => onGenreChange('ALL')}
        >
          All Genres
        </button>
        {genres.map((genre) => (
          // React Fragment demo: can also wrap inside Fragment if needed
          <React.Fragment key={genre}>
            <button
              className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => onGenreChange(genre)}
            >
              {genre}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
