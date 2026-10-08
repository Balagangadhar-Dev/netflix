// ==============================================================================
// DRF API SERVICE
// This file communicates with Django REST Framework endpoints:
//   - GET    /api/movies/       (List all movies)
//   - POST   /api/movies/       (Create a new movie)
//   - GET    /api/movies/<id>/  (Retrieve single movie)
//   - PUT    /api/movies/<id>/  (Update movie)
//   - DELETE /api/movies/<id>/  (Delete movie)
// ==============================================================================

const API_BASE_URL = 'http://127.0.0.1:8000/api/movies/';

export const movieApi = {
  // READ: List all movies
  async getAll() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies (Status: ${response.status})`);
    }
    return response.json();
  },

  // READ: Get single movie
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}${id}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie #${id}`);
    }
    return response.json();
  },

  // CREATE: Add new movie
  async create(movieData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = Object.entries(errorData)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
        .join('; ') || 'Failed to create movie';
      throw new Error(message);
    }
    return response.json();
  },

  // UPDATE: Full update (PUT)
  async update(id, movieData) {
    const response = await fetch(`${API_BASE_URL}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = Object.entries(errorData)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
        .join('; ') || 'Failed to update movie';
      throw new Error(message);
    }
    return response.json();
  },

  // DELETE: Remove movie (DELETE)
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok && response.status !== 204) {
      throw new Error(`Failed to delete movie #${id}`);
    }
    return true;
  },
};
