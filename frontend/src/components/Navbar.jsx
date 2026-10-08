import React from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. Component API:
 *    - Functional Component receiving props via object destructuring: ({ activeTab, onTabChange, onOpenAddModal })
 *    - Default prop values / fallback values
 * 2. React Events:
 *    - onClick event handlers on navigation links and action buttons
 * 3. React Fragments:
 *    - Using <> ... </> to group right-aligned action buttons without redundant wrapper divs
 */
export default function Navbar({
  activeTab = 'browse',
  onTabChange,
  onOpenAddModal,
  totalMovies = 0,
}) {
  return (
    <nav className="netflix-navbar">
      <div className="navbar-left">
        <div className="brand-logo" onClick={() => onTabChange('browse')}>
          NETFLIX
        </div>
        <ul className="nav-links">
          <li
            className={activeTab === 'browse' ? 'active' : ''}
            onClick={() => onTabChange('browse')}
          >
            Browse
          </li>
          <li
            className={activeTab === 'manage' ? 'active' : ''}
            onClick={() => onTabChange('manage')}
          >
            Manage Content ({totalMovies})
          </li>
          <li
            className={activeTab === 'concepts' ? 'active' : ''}
            onClick={() => onTabChange('concepts')}
          >
            📘 Concept Guide
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* React Fragment (<>...</>) allows grouping multiple elements */}
        <>
          <button
            className="btn-primary-action"
            onClick={onOpenAddModal}
            title="Create a new movie via DRF POST"
          >
            + Add Movie
          </button>
          <div className="profile-pill">
            <span className="profile-avatar">🍿</span>
            <span className="profile-name">Demo</span>
          </div>
        </>
      </div>
    </nav>
  );
}
