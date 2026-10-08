import React from 'react';
import MovieCard from './MovieCard';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. React Lists:
 *    - Transforming arrays of data into arrays of JSX elements using `.map()`.
 *    - Conditional rendering when the list is empty (`movies.length === 0`).
 * 2. React Keys:
 *    - Every child in a list MUST have a unique `key` prop (e.g. `key={movie.id}`).
 *    - Why Keys Matter:
 *      * React uses keys to identify which items have changed, been added, or removed.
 *      * Using a stable database ID (`movie.id`) ensures React reconciles the DOM efficiently.
 *      * Warning: Using array index (`key={index}`) is an anti-pattern when items can be
 *        reordered, filtered, or deleted, because it causes re-render bugs and performance loss!
 * 3. Component API:
 *    - Passing props (`movie`, `onSelect`, `onEdit`, `onDelete`) to child `MovieCard` components.
 */
export default function MovieList({
  movies,
  onSelectMovie,
  onEditMovie,
  onDeleteMovie,
  onResetFilters,
}) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎬</div>
        <h3>No Movies Found</h3>
        <p>No titles matched your search query or filter criteria.</p>
        <button className="btn-secondary" onClick={onResetFilters}>
          Clear Search & Filters
        </button>
      </div>
    );
  }

  return (
    <section className="movie-list-section">
      <div className="section-header">
        <h2 className="section-title">Trending & Recommended</h2>
        <span className="section-count">{movies.length} titles</span>
      </div>

      <div className="movie-grid">
        {/* REACT LISTS & REACT KEYS DEMO */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id} // 🔑 CRUCIAL: Unique, stable key from DRF id
            movie={movie}
            onSelect={onSelectMovie}
            onEdit={onEditMovie}
            onDelete={onDeleteMovie}
          />
        ))}
      </div>
    </section>
  );
}
