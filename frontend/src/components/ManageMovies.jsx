import React from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. React Lists:
 *    - Rendering a tabular list of data using `movies.map()`.
 *    - Providing an empty state row when no records exist.
 * 2. React Keys:
 *    - `key={movie.id}` on the `<tr>` element.
 *    - Why Keys Matter in Tables: When deleting row #3, React compares keys and removes
 *      only the 3rd <tr> element rather than recalculating the entire table DOM tree!
 * 3. React Fragments:
 *    - `<React.Fragment>` used to group action buttons (`Edit` and `Delete`) cleanly without
 *      introducing superfluous wrapper tags that might break CSS table display.
 * 4. React Events:
 *    - `onClick={() => onEdit(movie)}`
 *    - `onClick={() => onDelete(movie)}`
 * 5. Component API:
 *    - Props: `{ movies, onAddNew, onEdit, onDelete }`
 */
export default function ManageMovies({
  movies,
  onAddNew,
  onEdit,
  onDelete,
}) {
  return (
    <div className="manage-container">
      <div className="manage-header">
        <div>
          <h2 className="manage-title">Manage Content</h2>
          <p className="manage-subtitle">
            Perform DRF API CRUD operations (Create, Read, Update, Delete)
          </p>
        </div>
        <button className="btn-primary-action" onClick={onAddNew}>
          + Add Movie
        </button>
      </div>

      <div className="table-responsive">
        <table className="manage-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty">
                  No movies found. Click "+ Add Movie" to create one!
                </td>
              </tr>
            ) : (
              /* REACT LISTS & REACT KEYS DEMO */
              movies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <img
                      src={movie.bannerUrl}
                      alt={movie.name}
                      className="table-poster-thumb"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=150&q=80';
                      }}
                    />
                  </td>
                  <td>
                    <div className="table-movie-title">{movie.name}</div>
                    <div className="table-movie-director">Dir: {movie.director || 'N/A'}</div>
                  </td>
                  <td>
                    <span className="table-genre-badge">{movie.genre}</span>
                  </td>
                  <td>{movie.releaseYear}</td>
                  <td>⭐ {movie.rating}</td>
                  <td>
                    {/* REACT FRAGMENT DEMO: Grouping actions without extra div wrapper */}
                    <React.Fragment>
                      <button
                        className="btn-table-edit"
                        onClick={() => onEdit(movie)}
                        title="Edit via DRF PUT"
                      >
                        Edit
                      </button>
                      <button
                        className="btn-table-delete"
                        onClick={() => onDelete(movie)}
                        title="Delete via DRF DELETE"
                      >
                        Delete
                      </button>
                    </React.Fragment>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
