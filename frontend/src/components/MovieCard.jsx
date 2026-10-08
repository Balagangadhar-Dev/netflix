import React from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. Component API:
 *    - Child component receiving data and callback functions via Props
 *    - Destructuring props: `{ movie, onSelect, onEdit, onDelete }`
 * 2. React Events:
 *    - `onClick` event triggers parent's `onSelect(movie)`
 *    - `e.stopPropagation()` stops event bubbling (prevents card click when clicking action buttons)
 * 3. React Fragments:
 *    - Grouping meta badges without wrapper tags
 */
export default function MovieCard({ movie, onSelect, onEdit, onDelete }) {
  const handleEditClick = (e) => {
    e.stopPropagation(); // ⚡ Prevents card's onClick from triggering
    onEdit(movie);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // ⚡ Prevents card's onClick from triggering
    onDelete(movie);
  };

  return (
    <div
      className="movie-card"
      onClick={() => onSelect(movie)}
      title={`Click to view details & trailer for ${movie.name}`}
    >
      <div className="card-media-wrapper">
        <img
          src={movie.bannerUrl}
          alt={movie.name}
          className="card-poster"
          loading="lazy"
          onError={(e) => {
            // Fallback image if bannerUrl breaks
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="card-overlay">
          <div className="card-quick-actions">
            <button
              className="action-icon-btn edit-btn"
              onClick={handleEditClick}
              title="Edit Movie (DRF PUT)"
            >
              ✏️
            </button>
            <button
              className="action-icon-btn delete-btn"
              onClick={handleDeleteClick}
              title="Delete Movie (DRF DELETE)"
            >
              🗑️
            </button>
          </div>
          <span className="card-play-hint">▶ View Trailer</span>
        </div>
      </div>

      <div className="card-details">
        <h3 className="card-title">{movie.name}</h3>
        <div className="card-meta">
          {/* React Fragment Demo */}
          <>
            <span className="card-genre">{movie.genre}</span>
            <span className="card-year">{movie.releaseYear}</span>
            <span className="card-rating">⭐ {movie.rating}</span>
          </>
        </div>
      </div>
    </div>
  );
}
