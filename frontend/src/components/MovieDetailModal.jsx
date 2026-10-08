import React, { useEffect, useRef } from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. React Refs (`useRef`):
 *    - `modalContentRef` is attached to the modal dialog card to detect clicks outside
 *      and dismiss the modal cleanly.
 * 2. React Events & Lifecycle:
 *    - Window keyboard event listener for `Escape` key inside `useEffect`.
 *    - Click event on the modal backdrop (`onClick={handleBackdropClick}`).
 * 3. React Fragments:
 *    - `<React.Fragment>` groups badges and director/cast pairs without adding cluttering <div>s.
 * 4. Component API:
 *    - Controlled modal visibility via `movie` prop.
 */
export default function MovieDetailModal({
  movie,
  onClose,
  onEdit,
  onDelete,
}) {
  const modalContentRef = useRef(null);

  // Close modal when Escape key is pressed
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movie, onClose]);

  if (!movie) return null;

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container" ref={modalContentRef}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Banner / Video Section */}
        <div className="modal-media-header">
          {movie.trailer && movie.trailer.includes('youtube.com') ? (
            <div className="video-responsive">
              <iframe
                src={`${movie.trailer}?autoplay=1&mute=0`}
                title={`${movie.name} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={movie.bannerUrl}
              alt={movie.name}
              className="modal-banner-img"
            />
          )}
        </div>

        <div className="modal-body">
          <div className="modal-title-row">
            <h1 className="modal-title">{movie.name}</h1>
            <div className="modal-actions">
              <button
                className="btn-edit"
                onClick={() => {
                  onClose();
                  onEdit(movie);
                }}
                title="Edit this movie (DRF PUT)"
              >
                ✏️ Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => {
                  onDelete(movie);
                }}
                title="Delete this movie (DRF DELETE)"
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          <div className="modal-metadata">
            {/* React Fragment demo */}
            <React.Fragment>
              <span className="badge badge-year">📅 {movie.releaseYear}</span>
              <span className="badge badge-rating">⭐ {movie.rating}</span>
              <span className="badge badge-duration">⏱ {movie.duration}</span>
              <span className="badge badge-genre">🎬 {movie.genre}</span>
            </React.Fragment>
          </div>

          <div className="modal-info-grid">
            <div className="info-main">
              <h3>Description</h3>
              <p className="modal-description">{movie.description}</p>
            </div>

            <div className="info-sidebar">
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
              <p>
                <strong>Cast:</strong> {movie.cast}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
