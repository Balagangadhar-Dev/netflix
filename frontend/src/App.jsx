import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetailModal from './components/MovieDetailModal';
import MovieFormModal from './components/MovieFormModal';
import ManageMovies from './components/ManageMovies';
import ConceptGuide from './components/ConceptGuide';
import Toast from './components/Toast';
import { movieApi } from './api';

export default function App() {
  // ==========================================
  // STATE MANAGEMENT (Component API)
  // ==========================================
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Navigation tab: 'browse' | 'manage' | 'concepts'
  const [activeTab, setActiveTab] = useState('browse');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ALL');

  // Modals state
  const [detailModalMovie, setDetailModalMovie] = useState(null);
  const [formModalState, setFormModalState] = useState({
    isOpen: false,
    movie: null,
    isSubmitting: false,
  });

  // Notification Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // ==========================================
  // DRF API INTEGRATION: READ (GET)
  // ==========================================
  const loadMovies = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await movieApi.getAll();
      setMovies(data);
    } catch (err) {
      console.error('Failed to load movies from DRF:', err);
      setApiError(
        'Could not connect to Django REST Framework backend on http://127.0.0.1:8000. Make sure the Django server is running!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Compute unique genres for filters
  const genres = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => {
      if (m.genre) {
        m.genre.split(',').forEach((g) => set.add(g.trim()));
      }
    });
    return Array.from(set).sort();
  }, [movies]);

  // Compute filtered movies based on search term & genre
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        movie.name?.toLowerCase().includes(query) ||
        movie.genre?.toLowerCase().includes(query) ||
        movie.director?.toLowerCase().includes(query) ||
        movie.cast?.toLowerCase().includes(query);

      const matchesGenre =
        selectedGenre === 'ALL' ||
        movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase());

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  // Featured movie for Hero Banner (e.g. first movie or random)
  const featuredMovie = useMemo(() => {
    return movies.length > 0 ? movies[0] : null;
  }, [movies]);

  // ==========================================
  // DRF API INTEGRATION: CREATE (POST) & UPDATE (PUT)
  // ==========================================
  const handleOpenAddModal = () => {
    setFormModalState({
      isOpen: true,
      movie: null,
      isSubmitting: false,
    });
  };

  const handleOpenEditModal = (movie) => {
    setFormModalState({
      isOpen: true,
      movie: movie,
      isSubmitting: false,
    });
  };

  const handleCloseFormModal = () => {
    setFormModalState({
      isOpen: false,
      movie: null,
      isSubmitting: false,
    });
  };

  const handleFormSubmit = async (formData) => {
    setFormModalState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      if (formData.id) {
        // DRF UPDATE (PUT): /api/movies/<id>/
        const updated = await movieApi.update(formData.id, formData);
        setMovies((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
        setToast({
          message: `Movie "${updated.name}" updated successfully via DRF PUT!`,
          type: 'success',
        });
      } else {
        // DRF CREATE (POST): /api/movies/
        const created = await movieApi.create(formData);
        setMovies((prev) => [created, ...prev]);
        setToast({
          message: `Movie "${created.name}" created successfully via DRF POST!`,
          type: 'success',
        });
      }
      handleCloseFormModal();
    } catch (err) {
      console.error('Error saving movie:', err);
      alert(`Save failed: ${err.message}`);
      setFormModalState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // ==========================================
  // DRF API INTEGRATION: DELETE (DELETE)
  // ==========================================
  const handleDeleteMovie = async (movie) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${movie.name}"? This will send a DELETE request to /api/movies/${movie.id}/.`
    );
    if (!confirmed) return;

    try {
      await movieApi.delete(movie.id);
      setMovies((prev) => prev.filter((m) => m.id !== movie.id));
      if (detailModalMovie?.id === movie.id) {
        setDetailModalMovie(null);
      }
      setToast({
        message: `Movie "${movie.name}" deleted successfully via DRF DELETE!`,
        type: 'success',
      });
    } catch (err) {
      console.error('Delete failed:', err);
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div className="netflix-app">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
        totalMovies={movies.length}
      />

      {/* Global Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* API Error Notification if Backend is unreachable */}
      {apiError && (
        <div className="backend-offline-banner">
          <div className="banner-content">
            <strong>⚠️ Django REST API Not Connected:</strong> {apiError}
            <button className="btn-retry" onClick={loadMovies}>
              🔄 Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: BROWSE VIEW (Real Netflix Experience) */}
      {activeTab === 'browse' && (
        <main>
          <HeroBanner
            movie={featuredMovie}
            onPlayTrailer={(m) => setDetailModalMovie(m)}
            onMoreInfo={(m) => setDetailModalMovie(m)}
          />

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            genres={genres}
          />

          {isLoading ? (
            <div className="loading-spinner-wrapper">
              <div className="spinner"></div>
              <p>Loading titles from Django REST Framework...</p>
            </div>
          ) : (
            <MovieList
              movies={filteredMovies}
              onSelectMovie={(m) => setDetailModalMovie(m)}
              onEditMovie={handleOpenEditModal}
              onDeleteMovie={handleDeleteMovie}
              onResetFilters={() => {
                setSearchTerm('');
                setSelectedGenre('ALL');
              }}
            />
          )}
        </main>
      )}

      {/* TAB 2: MANAGE VIEW (Matching manage_movies.html) */}
      {activeTab === 'manage' && (
        <main>
          <ManageMovies
            movies={movies}
            onAddNew={handleOpenAddModal}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteMovie}
          />
        </main>
      )}

      {/* TAB 3: CONCEPT GUIDE (Interactive Teaching Cheatsheet) */}
      {activeTab === 'concepts' && (
        <main>
          <ConceptGuide />
        </main>
      )}

      {/* MODAL 1: Detail & Trailer Modal */}
      <MovieDetailModal
        movie={detailModalMovie}
        onClose={() => setDetailModalMovie(null)}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteMovie}
      />

      {/* MODAL 2: Add / Edit Form Modal */}
      <MovieFormModal
        isOpen={formModalState.isOpen}
        initialMovie={formModalState.movie}
        isSubmitting={formModalState.isSubmitting}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
