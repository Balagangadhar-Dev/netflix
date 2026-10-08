import React, { useEffect } from 'react';

/**
 * 🎓 CONCEPTS COVERED:
 * 1. Component API:
 *    - Props: `{ message, type, onClose }`
 * 2. React Lifecycle / Effects:
 *    - Auto-dismissing timer via `useEffect` with cleanup
 * 3. React Events:
 *    - `onClick={onClose}` to dismiss immediately
 */
export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-notification toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
