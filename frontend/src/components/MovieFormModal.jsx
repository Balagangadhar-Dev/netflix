import React, { useState, useEffect, useRef } from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. React Forms:
 *    - Controlled Components: All input fields derive their values from React state (`formData`),
 *      making React the "single source of truth".
 *    - Generic `handleChange` handler updates state based on `e.target.name` and `e.target.value`.
 *    - Form validation before submission.
 * 2. React Events:
 *    - `onSubmit`: Captures form submission.
 *    - `e.preventDefault()`: Prevents default browser full-page reload on submit.
 *    - `onChange`: Captures input keystrokes and selections.
 * 3. React Refs (`useRef`):
 *    - `firstInputRef`: Automatically sets browser focus to the "Movie Title" input
 *      whenever this modal is opened.
 * 4. React Fragments:
 *    - Using `<React.Fragment>` to organize paired form fields into responsive grids.
 * 5. Component API:
 *    - Props: `{ isOpen, onClose, onSubmit, initialMovie, isSubmitting }`
 */

const DEFAULT_FORM_STATE = {
  name: '',
  genre: 'Action',
  releaseYear: new Date().getFullYear(),
  rating: '8.5',
  duration: '130 mins',
  director: '',
  cast: '',
  description: '',
  bannerUrl: '',
  trailer: '',
};

export default function MovieFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialMovie = null,
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [formError, setFormError] = useState('');

  // 🔍 REACT REF: Auto-focus first input field when modal opens
  const firstInputRef = useRef(null);

  // Sync form state when editing an existing movie or creating a new one
  useEffect(() => {
    if (initialMovie) {
      setFormData(initialMovie);
    } else {
      setFormData(DEFAULT_FORM_STATE);
    }
    setFormError('');

    // Focus input after modal mounts
    if (isOpen) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [initialMovie, isOpen]);

  if (!isOpen) return null;

  const isEditing = Boolean(initialMovie && initialMovie.id);

  // ⚡ REACT EVENT: Generic onChange for controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'releaseYear' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  // ⚡ REACT EVENT: onSubmit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // 🛑 Stops traditional HTTP POST / page refresh!

    // Client-side validation
    if (!formData.name.trim()) {
      setFormError('Movie title is required.');
      return;
    }
    if (!formData.bannerUrl.trim()) {
      setFormError('Banner URL is required (image for the poster).');
      return;
    }
    if (formData.releaseYear < 1888) {
      setFormError('Release year must be 1888 or later.');
      return;
    }

    setFormError('');
    onSubmit(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container form-modal-container">
        <div className="form-modal-header">
          <h2>{isEditing ? '✏️ Edit Movie (DRF PUT)' : '✨ Add New Movie (DRF POST)'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {formError && <div className="form-alert-error">{formError}</div>}

        {/* ⚡ REACT FORMS & EVENTS: <form onSubmit={handleSubmit}> */}
        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-grid">
            {/* Title */}
            <div className="form-group full-width">
              <label htmlFor="movie-name">Movie Title *</label>
              <input
                ref={firstInputRef} // React Ref attached here!
                id="movie-name"
                name="name"
                type="text"
                placeholder="e.g. Stranger Things, RRR, Inception"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* React Fragment grouping 2 related columns */}
            <React.Fragment>
              <div className="form-group">
                <label htmlFor="movie-genre">Genre *</label>
                <select
                  id="movie-genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                >
                  <option value="Action">Action</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Drama">Drama</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Romance">Romance</option>
                  <option value="Horror">Horror</option>
                  <option value="Crime">Crime</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="movie-year">Release Year *</label>
                <input
                  id="movie-year"
                  name="releaseYear"
                  type="number"
                  min="1888"
                  max="2035"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  required
                />
              </div>
            </React.Fragment>

            {/* Rating & Duration */}
            <React.Fragment>
              <div className="form-group">
                <label htmlFor="movie-rating">Rating (e.g. 8.8, U/A)</label>
                <input
                  id="movie-rating"
                  name="rating"
                  type="text"
                  placeholder="e.g. 8.9"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="movie-duration">Duration</label>
                <input
                  id="movie-duration"
                  name="duration"
                  type="text"
                  placeholder="e.g. 2h 30m or 150 mins"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </React.Fragment>

            {/* Director & Cast */}
            <div className="form-group">
              <label htmlFor="movie-director">Director</label>
              <input
                id="movie-director"
                name="director"
                type="text"
                placeholder="e.g. S.S. Rajamouli"
                value={formData.director}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="movie-cast">Cast</label>
              <input
                id="movie-cast"
                name="cast"
                type="text"
                placeholder="e.g. Prabhas, Rana Daggubati"
                value={formData.cast}
                onChange={handleChange}
              />
            </div>

            {/* Banner URL & Trailer URL */}
            <div className="form-group full-width">
              <label htmlFor="movie-banner">Poster / Banner Image URL *</label>
              <input
                id="movie-banner"
                name="bannerUrl"
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.bannerUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="movie-trailer">YouTube Trailer Embed URL</label>
              <input
                id="movie-trailer"
                name="trailer"
                type="url"
                placeholder="https://www.youtube.com/embed/..."
                value={formData.trailer}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label htmlFor="movie-desc">Description</label>
              <textarea
                id="movie-desc"
                name="description"
                rows="3"
                placeholder="Brief synopsis of the film..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-action"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Saving...'
                : isEditing
                ? 'Update Movie (PUT)'
                : 'Create Movie (POST)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
