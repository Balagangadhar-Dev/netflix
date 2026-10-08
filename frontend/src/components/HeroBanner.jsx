import React from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. Component API:
 *    - Passing data downward via Props (`movie`, `onPlayTrailer`, `onMoreInfo`)
 *    - Graceful fallback when prop is undefined or null
 * 2. React Events:
 *    - onClick handlers for triggering actions
 * 3. React Fragments:
 *    - Grouping meta details without introducing unnecessary layout containers
 */
export default function HeroBanner({ movie, onPlayTrailer, onMoreInfo }) {
  if (!movie) {
    return (
      <header className="hero-banner hero-banner-fallback">
        <div className="hero-content">
          <h1 className="hero-title">Netflix Learning Studio</h1>
          <p className="hero-description">
            Connecting Django REST Framework CRUD APIs with a modern React Frontend.
          </p>
        </div>
      </header>
    );
  }

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0.1) 0%, rgba(20,20,20,0.85) 75%, #141414 100%), url(${movie.bannerUrl})`,
  };

  return (
    <header className="hero-banner" style={backgroundStyle}>
      <div className="hero-content">
        <div className="hero-badge">FEATURED TITLE</div>
        <h1 className="hero-title">{movie.name}</h1>

        <div className="hero-meta">
          {/* React Fragment demo */}
          <>
            <span className="hero-rating">⭐ {movie.rating}</span>
            <span className="hero-year">{movie.releaseYear}</span>
            <span className="hero-duration">{movie.duration}</span>
            <span className="hero-genre">{movie.genre}</span>
          </>
        </div>

        <p className="hero-description">{movie.description}</p>

        <div className="hero-buttons">
          <button
            className="btn-play"
            onClick={() => onPlayTrailer(movie)}
          >
            ▶ Play Trailer
          </button>
          <button
            className="btn-more-info"
            onClick={() => onMoreInfo(movie)}
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </header>
  );
}
