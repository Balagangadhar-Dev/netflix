# 🎬 Netflix Fullstack Project: DRF CRUD & React Core Topics
> **Instructor & Student Guide**  
> Complete teaching manual for Django REST Framework (DRF) APIs and React frontend fundamentals.

---

## 📌 Architecture Overview

```
┌─────────────────────────────────┐           HTTP JSON (REST)          ┌──────────────────────────────────┐
│         REACT FRONTEND          │ ◄─────────────────────────────────► │         DJANGO REST (DRF)        │
│  (Vite + React 19 @ port 5173)  │      GET, POST, PUT, DELETE         │    (Django 6.0 @ port 8000)      │
└────────────────┬────────────────┘                                     └────────────────┬─────────────────┘
                 │                                                                       │
        React Core Topics:                                                      DRF Architecture:
        • Component API                                                         • Serializers (ModelSerializer)
        • React Forms                                                           • ViewSets (ModelViewSet)
        • React Events                                                          • Routers (DefaultRouter)
        • React Lists                                                           • CORS Headers
        • React Keys                                                            • SQLite Database
        • React Refs
        • React Fragments
```

---

## 🚀 Quick Start Guide (How to Run Both Servers)

### 1. Start the Django REST Framework Backend
Open Terminal 1:
```bash
cd /Users/bala/Documents/ait/netflix
source ../demo/bin/activate
python manage.py runserver 8000
```
- **Browsable API URL:** [http://127.0.0.1:8000/api/movies/](http://127.0.0.1:8000/api/movies/)
- **Admin Panel:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

### 2. Start the React Frontend
Open Terminal 2:
```bash
cd /Users/bala/Documents/ait/netflix/frontend
npm run dev
```
- **React App URL:** [http://localhost:5175](http://localhost:5175)

---

## 🐍 PART 1: Django REST Framework (DRF) CRUD Operations

### 1. Why DRF instead of standard Django Templates?
- **Traditional Django (`render()`):** The server generates the full HTML string and sends it to the browser. Every click reloads the entire page.
- **Django REST Framework (DRF):** The server sends pure, raw **JSON** data. The React frontend consumes that JSON and dynamically updates only the parts of the screen that changed.

### 2. The CRUD HTTP Mapping Table
Show this table to your students first. It maps HTTP verbs to database actions:

| Operation | HTTP Method | URL Endpoint | DRF Action | Success Status | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CREATE** | `POST` | `/api/movies/` | `create()` | `201 Created` | Adds a new movie |
| **READ** | `GET` | `/api/movies/` | `list()` | `200 OK` | Retrieves all movies |
| **READ** | `GET` | `/api/movies/<id>/` | `retrieve()` | `200 OK` | Retrieves one movie by ID |
| **UPDATE** | `PUT` | `/api/movies/<id>/` | `update()` | `200 OK` | Replaces all fields of a movie |
| **UPDATE** | `PATCH` | `/api/movies/<id>/` | `partial_update()` | `200 OK` | Updates only specific fields |
| **DELETE** | `DELETE` | `/api/movies/<id>/` | `destroy()` | `204 No Content` | Removes movie from database |

---

### 3. Step 1: DRF Serializer (`app/serializers.py`)
Explain serializers using this analogy: **"A Serializer is a Translator and a Security Guard."**
- **Translator:** Translates complex Django Model instances into Python dictionaries that easily serialize to JSON (and vice versa).
- **Security Guard:** Validates user inputs (e.g. ensuring `releaseYear >= 1888` and required fields are present).

```python
from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            'id', 'name', 'genre', 'releaseYear',
            'rating', 'duration', 'director',
            'cast', 'description', 'bannerUrl', 'trailer'
        ]

    # Custom Field Validation Example:
    def validate_releaseYear(self, value):
        if value < 1888:
            raise serializers.ValidationError("Year cannot be earlier than 1888.")
        return value
```

---

### 4. Step 2: DRF ViewSet (`app/api_views.py`)
Show how `ModelViewSet` implements all 6 operations in just 4 lines of code:

```python
from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer

class MovieViewSet(viewsets.ModelViewSet):
    """
    Handles GET (list & detail), POST (create), 
    PUT/PATCH (update), and DELETE (destroy) automatically!
    """
    queryset = Movie.objects.all().order_by('-id')
    serializer_class = MovieSerializer
```

> **Teaching Tip:** If students ask *"How does it know what to do?"*, show them `MovieListCreateAPIView` and `MovieDetailAPIView` in [app/api_views.py](file:///Users/bala/Documents/ait/netflix/app/api_views.py) which exposes the underlying `def get()`, `def post()`, `def put()`, and `def delete()` methods.

---

### 5. Step 3: Routers & URLs (`app/api_urls.py`)
Routers eliminate repetitive `path()` definitions:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import MovieViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')

urlpatterns = [
    path('', include(router.urls)),
]
```

---

### 6. Step 4: CORS Configuration (`netflix/settings.py`)
Explain why **CORS (Cross-Origin Resource Sharing)** is essential:
- Browser security blocks React (`http://localhost:5173`) from requesting data from Django (`http://127.0.0.1:8000`) unless Django explicitly permits it.
- We add `'corsheaders'` to `INSTALLED_APPS`, `'corsheaders.middleware.CorsMiddleware'` to `MIDDLEWARE`, and set `CORS_ALLOW_ALL_ORIGINS = True`.

---

## ⚛️ PART 2: React Core Concepts Breakdown

Here are the 7 core topics with brief notes and code examples matching the Netflix application:

---

### 1. Component API
- **Concept:** Components are independent, reusable pieces of UI. They receive inputs called **Props** (short for properties) and can maintain internal **State**.
- **Data Flow:** Data flows **unidirectionally** (downwards from parent to child). To pass changes back up, parents pass **callback functions** as props.
- **Code Example in Netflix app (`MovieCard.jsx`):**
  ```jsx
  // Child component receives props via object destructuring
  export default function MovieCard({ movie, onSelect, onEdit, onDelete }) {
    return (
      <div className="movie-card" onClick={() => onSelect(movie)}>
        <h3>{movie.name}</h3>
        <button onClick={() => onEdit(movie)}>Edit</button>
      </div>
    );
  }
  ```
- **Student Note:** Never modify props directly! Props are read-only (`immutable`).

---

### 2. React Forms (Controlled Components)
- **Concept:** In vanilla HTML, form inputs hold their own internal state. In React, we use **Controlled Components**, meaning the form element's value is controlled by React `useState`.
- **Why Controlled Forms?**
  1. Single source of truth.
  2. Instant validation (e.g. disabling submit if title is blank).
  3. Easy to pre-fill when editing a movie.
- **Code Example in Netflix app (`MovieFormModal.jsx`):**
  ```jsx
  const [formData, setFormData] = useState({ name: '', genre: 'Action' });

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <input
      name="name"
      value={formData.name}      // Controlled value
      onChange={handleChange}    // Update state on keystroke
    />
  );
  ```

---

### 3. React Events
- **Concept:** React wraps native browser events in a cross-browser abstraction called `SyntheticEvent`.
- **Syntax Differences from HTML:**
  - CamelCase naming: `onClick` instead of `onclick`, `onSubmit` instead of `onsubmit`.
  - Pass a function reference: `onClick={handleClick}`, NOT `onClick="handleClick()"`.
- **Key Methods to Teach:**
  1. `e.preventDefault()`: Prevents browser default behavior (e.g., stops `<form>` submit from reloading the page).
  2. `e.stopPropagation()`: Stops **event bubbling** up the DOM tree (e.g., clicking the "Delete" icon on a movie card does NOT trigger the card's `onSelect` modal popup).
- **Code Example in Netflix app (`MovieCard.jsx` & `MovieFormModal.jsx`):**
  ```jsx
  const handleSubmit = (e) => {
    e.preventDefault(); // 🛑 Stop page reload!
    onSubmit(formData);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // 🛑 Don't open detail modal when deleting!
    onDelete(movie);
  };
  ```

---

### 4. React Lists
- **Concept:** To render multiple items from an array, use the standard JavaScript `.map()` method to transform each object into a JSX element.
- **Always handle empty states:** What happens when there are 0 movies found? Show a helpful fallback UI instead of a blank screen.
- **Code Example in Netflix app (`MovieList.jsx`):**
  ```jsx
  {movies.length === 0 ? (
    <p>No movies found!</p>
  ) : (
    movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))
  )}
  ```

---

### 5. React Keys
- **Concept:** The `key` prop is a special string attribute that React requires when rendering lists.
- **Why Keys Matter (Virtual DOM Reconciliation):**
  - When a list changes (items reordered, deleted, or inserted), React compares keys in the new Virtual DOM with keys in the old Virtual DOM.
  - If a key matches, React reuses the existing DOM node instead of destroying and recreating it.
- **Rule of Thumb:**
  - ✅ **DO:** Use unique, permanent IDs from the database (`key={movie.id}`).
  - ❌ **DON'T:** Use array indices (`key={index}`) if the list can be filtered, sorted, or items deleted. Using index causes UI state bugs and sluggish rendering!

---

### 6. React Refs (`useRef`)
- **Concept:** `useRef` returns a mutable ref object whose `.current` property can reference a real HTML DOM node directly.
- **When to use Refs:**
  - Focusing an input automatically (`inputRef.current.focus()`).
  - Triggering media playback on `<video>` or `<iframe>`.
  - Measuring DOM dimensions or detecting clicks outside a modal.
- **Refs vs State:** Changing a ref's `.current` does **NOT** trigger a component re-render.
- **Code Example in Netflix app (`SearchBar.jsx` & `MovieFormModal.jsx`):**
  ```jsx
  const searchInputRef = useRef(null);

  const focusSearch = () => {
    // Directly focus the input element!
    searchInputRef.current.focus();
  };

  return <input ref={searchInputRef} type="text" />;
  ```

---

### 7. React Fragments
- **Concept:** A React component can only return **one single root JSX element**. Traditionally, developers wrapped elements in unnecessary `<div>` containers.
- **Why Fragments?**
  1. Avoids "div soup" (unnecessary DOM nodes).
  2. Keeps CSS layout intact (especially CSS Grid, Flexbox, and HTML `<table>` elements where extra `<div>` tags break valid markup).
- **Syntax:**
  - Short syntax: `<> ... </>`
  - Explicit syntax: `<React.Fragment key={id}> ... </React.Fragment>` (used when you need to pass a `key` prop in a loop).
- **Code Example in Netflix app (`ManageMovies.jsx` & `Navbar.jsx`):**
  ```jsx
  // Inside a table cell or list:
  <td>
    <React.Fragment>
      <button onClick={() => onEdit(movie)}>Edit</button>
      <button onClick={() => onDelete(movie)}>Delete</button>
    </React.Fragment>
  </td>
  ```

---

## 💻 Step-by-Step Lecture Plan (For the Instructor)

| Time | Phase | Classroom Activity |
| :--- | :--- | :--- |
| **00 - 15 min** | **Intro & Architecture** | Review what was built previously (Django templates). Introduce DRF: Model -> Serializer -> ViewSet -> JSON. |
| **15 - 30 min** | **DRF CRUD in Action** | Open `http://127.0.0.1:8000/api/movies/` in the browser. Show students the live DRF Browsable API. Test creating a movie via POST and retrieving via GET. |
| **30 - 45 min** | **React Setup & Component API** | Open `frontend/src/App.jsx` and `components/MovieCard.jsx`. Explain how Props flow down and Events flow up. |
| **45 - 60 min** | **React Lists & Keys** | Open `components/MovieList.jsx`. Explain `.map()` and demonstrate why `key={movie.id}` is critical. |
| **60 - 75 min** | **React Forms & Events** | Open `components/MovieFormModal.jsx`. Walk through `useState`, controlled inputs, `e.preventDefault()`, and form submission sending a POST/PUT request to DRF. |
| **75 - 85 min** | **React Refs & Fragments** | Demonstrate clicking the **"🎯 Focus Input (useRef Demo)"** button in the search bar. Show `<React.Fragment>` in table rows. |
| **85 - 90 min** | **Q&A & In-App Concept Guide** | Switch to the **📘 Concept Guide** tab in the running app to review key interview questions with students! |

---

## 🧪 Testing the API Suite
You can demonstrate backend automated testing to students by running:
```bash
source ../demo/bin/activate
python manage.py test app
```
All 6 CRUD tests (`CREATE`, `READ list`, `READ detail`, `UPDATE PUT`, `UPDATE PATCH`, `DELETE`) execute in ~0.02s!
