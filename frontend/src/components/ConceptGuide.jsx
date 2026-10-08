import React, { useState } from 'react';

/**
 * 🎓 CONCEPT GUIDE & INTERACTIVE CHEATSHEET
 * Beginner-friendly, comprehensive visual notes explaining:
 * 1. Django REST Framework (DRF) CRUD Architecture
 * 2. React Core Topics (Component API, Forms, Events, Lists, Keys, Refs, Fragments)
 * 3. End-to-End Request/Response Lifecycle
 * 4. Interview & Viva Prep Questions
 */
export default function ConceptGuide() {
  const [activeTab, setActiveTab] = useState('drf');
  const [selectedReactTopic, setSelectedReactTopic] = useState('all');

  return (
    <div className="concept-guide-container">
      {/* Header Banner */}
      <div className="concept-header">
        <span className="concept-tagline">BEGINNER FRIENDLY • FULL STACK ARCHITECTURE</span>
        <h2>Netflix Learning Studio: Concept Guide</h2>
        <p>
          Master how <strong>Django REST Framework (DRF)</strong> powers the backend database
          and connects seamlessly to a modern <strong>React frontend</strong>.
        </p>

        {/* Main Category Tabs */}
        <div className="concept-nav-tabs">
          <button
            className={`concept-tab-btn ${activeTab === 'drf' ? 'active' : ''}`}
            onClick={() => setActiveTab('drf')}
          >
            🐍 Django REST Framework (DRF) CRUD
          </button>
          <button
            className={`concept-tab-btn ${activeTab === 'react' ? 'active' : ''}`}
            onClick={() => setActiveTab('react')}
          >
            ⚛️ React Core Concepts (7 Topics)
          </button>
          <button
            className={`concept-tab-btn ${activeTab === 'flow' ? 'active' : ''}`}
            onClick={() => setActiveTab('flow')}
          >
            🔄 End-to-End Fullstack Flow
          </button>
          {/* <button
            className={`concept-tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
            onClick={() => setActiveTab('qa')}
          >
            🎯 Viva & Interview Q&A
          </button> */}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DJANGO REST FRAMEWORK (DRF) CRUD                                  */}
      {/* ========================================================================= */}
      {activeTab === 'drf' && (
        <div className="concept-content animate-fade">
          {/* Card 1: What is DRF & Analogy */}
          <div className="concept-card">
            <div className="card-badge">FOUNDATION</div>
            <h3>1. What is Django REST Framework (DRF)?</h3>
            <p className="concept-lead">
              Traditional Django returns full HTML pages using <code>render(request, 'home.html')</code>.
              DRF changes this: instead of sending HTML, it sends raw <strong>JSON data</strong> over HTTP.
            </p>

            <div className="analogy-box">
              <span className="analogy-icon">🍽️</span>
              <div>
                <strong>The Restaurant Analogy:</strong>
                <ul>
                  <li><strong>Database (SQLite / PostgreSQL):</strong> The Kitchen pantry where food ingredients are stored.</li>
                  <li><strong>DRF Backend (port 8000):</strong> The Waiter taking orders from customers and delivering dishes.</li>
                  <li><strong>React Frontend (port 5175):</strong> The Dining Room table where customers look at the menu, eat, and enjoy the experience.</li>
                  <li><strong>JSON:</strong> The plates and trays used by the waiter to carry the food.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: CRUD Table */}
          <div className="concept-card">
            <div className="card-badge">HTTP & ENDPOINTS</div>
            <h3>2. The DRF CRUD Mapping Table</h3>
            <p>Every database action maps to an HTTP method, endpoint, and HTTP status code:</p>

            <div className="table-responsive">
              <table className="concept-table">
                <thead>
                  <tr>
                    <th>CRUD Action</th>
                    <th>HTTP Method</th>
                    <th>URL Endpoint</th>
                    <th>DRF ViewSet Action</th>
                    <th>Status Code</th>
                    <th>What Happens in Plain English</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge-op op-post">CREATE</span></td>
                    <td><code>POST</code></td>
                    <td><code>/api/movies/</code></td>
                    <td><code>create()</code></td>
                    <td><span className="status-code status-201">201 Created</span></td>
                    <td>Accepts movie JSON in request body, validates it, and inserts a new row in database.</td>
                  </tr>
                  <tr>
                    <td><span className="badge-op op-get">READ (List)</span></td>
                    <td><code>GET</code></td>
                    <td><code>/api/movies/</code></td>
                    <td><code>list()</code></td>
                    <td><span className="status-code status-200">200 OK</span></td>
                    <td>Queries <code>Movie.objects.all()</code>, converts to JSON array, and returns all movies.</td>
                  </tr>
                  <tr>
                    <td><span className="badge-op op-get">READ (Detail)</span></td>
                    <td><code>GET</code></td>
                    <td><code>/api/movies/&lt;id&gt;/</code></td>
                    <td><code>retrieve()</code></td>
                    <td><span className="status-code status-200">200 OK</span></td>
                    <td>Finds a single movie with matching ID and returns its JSON object. Returns <code>404</code> if not found.</td>
                  </tr>
                  <tr>
                    <td><span className="badge-op op-put">UPDATE (Full)</span></td>
                    <td><code>PUT</code></td>
                    <td><code>/api/movies/&lt;id&gt;/</code></td>
                    <td><code>update()</code></td>
                    <td><span className="status-code status-200">200 OK</span></td>
                    <td>Replaces <strong>all fields</strong> of the movie with the incoming JSON data.</td>
                  </tr>
                  <tr>
                    <td><span className="badge-op op-patch">UPDATE (Partial)</span></td>
                    <td><code>PATCH</code></td>
                    <td><code>/api/movies/&lt;id&gt;/</code></td>
                    <td><code>partial_update()</code></td>
                    <td><span className="status-code status-200">200 OK</span></td>
                    <td>Updates only the specified fields (e.g. updating just the <code>rating</code>).</td>
                  </tr>
                  <tr>
                    <td><span className="badge-op op-del">DELETE</span></td>
                    <td><code>DELETE</code></td>
                    <td><code>/api/movies/&lt;id&gt;/</code></td>
                    <td><code>destroy()</code></td>
                    <td><span className="status-code status-204">204 No Content</span></td>
                    <td>Deletes the movie row from the database. Returns an empty body with 204.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 3: Deep Dive into Serializers */}
          <div className="concept-card">
            <div className="card-badge">STEP 1: SERIALIZER</div>
            <h3>3. Serializers: The Translator & Validator</h3>
            <p>
              A <strong>Serializer</strong> works like a bidirectional translator:
            </p>
            <ol className="step-list">
              <li><strong>Serialization (Model → JSON):</strong> Converts complex Python Django Model instances into JSON so React can consume them.</li>
              <li><strong>Deserialization (JSON → Model):</strong> Takes raw JSON from React, validates fields, and converts them back to Django models to save safely.</li>
            </ol>

            <div className="code-block-wrapper">
              <div className="code-header">
                <span>📁 app/serializers.py</span>
                <span className="code-lang">Python (DRF)</span>
              </div>
              <pre className="code-pre">
                <code>{`from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    """
    ModelSerializer automatically inspects the Movie model and generates
    fields, type checkers, and default create()/update() methods.
    """
    class Meta:
        model = Movie
        fields = [
            'id', 'name', 'genre', 'releaseYear',
            'rating', 'duration', 'director',
            'cast', 'description', 'bannerUrl', 'trailer'
        ]

    # Custom Field-level Validation Method:
    # Pattern: def validate_<field_name>(self, value):
    def validate_releaseYear(self, value):
        if value < 1888:
            raise serializers.ValidationError(
                "Release year cannot be earlier than 1888 (the first film in history)."
            )
        return value`}</code>
              </pre>
            </div>

            <div className="explanation-callout">
              <strong>Line-by-line breakdown for students:</strong>
              <ul>
                <li><code>serializers.ModelSerializer</code>: Pre-built DRF class that reduces boilerplate. It automatically creates validators matching Django model fields.</li>
                <li><code>class Meta: model = Movie</code>: Tells DRF which database model to bind to.</li>
                <li><code>fields = [...]</code>: Explicitly declares which columns are exposed in JSON. Never use raw strings unless necessary.</li>
                <li><code>validate_releaseYear(self, value)</code>: Validates that users don't submit invalid data (e.g. year -500). If invalid, DRF automatically sends back HTTP <code>400 Bad Request</code> with an error message!</li>
              </ul>
            </div>
          </div>

          {/* Card 4: Deep Dive into ViewSets & Routers */}
          <div className="concept-card">
            <div className="card-badge">STEP 2: VIEWSETS & ROUTERS</div>
            <h3>4. ViewSets & DefaultRouter</h3>
            <p>
              In traditional Django, you had to write separate views for <code>home</code>, <code>add_movie</code>, <code>edit_movie</code>, and <code>delete_movie</code>.
              With DRF, a single <strong>ModelViewSet</strong> provides all 6 CRUD operations automatically!
            </p>

            <div className="code-block-wrapper">
              <div className="code-header">
                <span>📁 app/api_views.py</span>
                <span className="code-lang">Python (DRF)</span>
              </div>
              <pre className="code-pre">
                <code>{`from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer

class MovieViewSet(viewsets.ModelViewSet):
    """
    Provides: list(), create(), retrieve(), update(), partial_update(), destroy()
    in just 3 lines of code!
    """
    queryset = Movie.objects.all().order_by('-id')
    serializer_class = MovieSerializer`}</code>
              </pre>
            </div>

            <div className="code-block-wrapper" style={{ marginTop: '16px' }}>
              <div className="code-header">
                <span>📁 app/api_urls.py</span>
                <span className="code-lang">Python (DRF Router)</span>
              </div>
              <pre className="code-pre">
                <code>{`from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import MovieViewSet

# DefaultRouter generates all URL patterns automatically:
# GET    /api/movies/       -> list()
# POST   /api/movies/       -> create()
# GET    /api/movies/<id>/  -> retrieve()
# PUT    /api/movies/<id>/  -> update()
# DELETE /api/movies/<id>/  -> destroy()
router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')

urlpatterns = [
    path('', include(router.urls)),
]`}</code>
              </pre>
            </div>
          </div>

          {/* Card 5: CORS Headers */}
          <div className="concept-card">
            <div className="card-badge">STEP 3: SECURITY & CORS</div>
            <h3>5. What is CORS and Why Do We Need It?</h3>
            <div className="analogy-box">
              <span className="analogy-icon">🛡️</span>
              <div>
                <strong>Cross-Origin Resource Sharing (CORS):</strong>
                <p>
                  By default, web browsers enforce a security policy called <strong>Same-Origin Policy</strong>.
                  Because React runs on <code>http://localhost:5175</code> (Origin A) and Django runs on <code>http://127.0.0.1:8000</code> (Origin B),
                  the browser will block React from reading Django's response unless Django sends a special HTTP header:
                </p>
                <div className="code-snippet-inline">
                  <code>Access-Control-Allow-Origin: *</code>
                </div>
              </div>
            </div>

            <div className="code-block-wrapper">
              <div className="code-header">
                <span>📁 netflix/settings.py</span>
                <span className="code-lang">Python (Django Settings)</span>
              </div>
              <pre className="code-pre">
                <code>{`INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',      # 1. Install django-cors-headers
    'app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 2. Place at very top!
    'django.middleware.security.SecurityMiddleware',
    ...
]

# 3. Allow React frontend to make requests:
CORS_ALLOW_ALL_ORIGINS = True`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REACT CORE CONCEPTS (7 TOPICS)                                    */}
      {/* ========================================================================= */}
      {activeTab === 'react' && (
        <div className="concept-content animate-fade">
          {/* Topic Filters */}
          <div className="topic-filter-bar">
            <span>Filter Topic:</span>
            {['all', 'component', 'forms', 'events', 'lists', 'keys', 'refs', 'fragments'].map(
              (topic) => (
                <button
                  key={topic}
                  className={`topic-btn ${selectedReactTopic === topic ? 'active' : ''}`}
                  onClick={() => setSelectedReactTopic(topic)}
                >
                  {topic === 'all' ? 'All 7 Topics' : topic.toUpperCase()}
                </button>
              )
            )}
          </div>

          {/* 1. COMPONENT API */}
          {(selectedReactTopic === 'all' || selectedReactTopic === 'component') && (
            <div className="concept-card">
              <div className="card-badge topic-badge">TOPIC 1 OF 7</div>
              <h3>⚛️ React Component API (Props & State)</h3>
              <p className="concept-lead">
                A <strong>Component</strong> is a reusable, self-contained JavaScript function that returns JSX (HTML-like syntax).
                Components accept inputs called <strong>Props</strong> and can hold dynamic data called <strong>State</strong>.
              </p>

              <div className="comparison-grid">
                <div className="comp-item">
                  <h4>📦 Props (Properties)</h4>
                  <ul>
                    <li>Passed from <strong>Parent to Child</strong>.</li>
                    <li><strong>Read-only (Immutable):</strong> A child can NEVER change its own props directly.</li>
                    <li>Like parameters passed to a function.</li>
                  </ul>
                </div>
                <div className="comp-item">
                  <h4>🧠 State (`useState`)</h4>
                  <ul>
                    <li>Managed <strong>internally</strong> inside the component.</li>
                    <li><strong>Mutable via setter:</strong> Calling <code>setCount()</code> triggers a re-render.</li>
                    <li>Like the component's private memory.</li>
                  </ul>
                </div>
              </div>

              <div className="code-block-wrapper">
                <div className="code-header">
                  <span>📁 frontend/src/components/MovieCard.jsx</span>
                  <span className="code-lang">React JSX</span>
                </div>
                <pre className="code-pre">
                  <code>{`// 1. Props received via Object Destructuring: { movie, onSelect, onEdit, onDelete }
export default function MovieCard({ movie, onSelect, onEdit, onDelete }) {
  // 2. Child uses props to render UI:
  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <img src={movie.bannerUrl} alt={movie.name} />
      <h3>{movie.name}</h3>
      <p>{movie.genre} • {movie.releaseYear}</p>
      
      {/* 3. Child triggers parent callback functions: */}
      <button onClick={(e) => { e.stopPropagation(); onEdit(movie); }}>
        Edit Movie
      </button>
    </div>
  );
}`}</code>
                </pre>
              </div>

              <div className="explanation-callout">
                <strong>Why this is beginner-friendly:</strong>
                <p>
                  Think of Props as a letter mailed to your house: you can read it, but you can't change what the sender wrote.
                  If the child wants to change something in the parent, the parent passes a <strong>callback function</strong> (like <code>onEdit</code>), and the child calls that function!
                </p>
              </div>
            </div>
          )}

          {/* 2. REACT FORMS */}
          {(selectedReactTopic === 'all' || selectedReactTopic === 'forms') && (
            <div className="concept-card">
              <div className="card-badge topic-badge">TOPIC 2 OF 7</div>
              <h3>📝 React Forms & Controlled Components</h3>
              <p className="concept-lead">
                In traditional HTML, an <code>&lt;input&gt;</code> maintains its own text in the DOM.
                In React, we use <strong>Controlled Components</strong>: React State is the single source of truth for all form inputs!
              </p>

              <div className="flow-steps">
                <div className="flow-step">
                  <span className="step-num">1</span>
                  <span>User types a character</span>
                </div>
                <div className="flow-step-arrow">➔</div>
                <div className="flow-step">
                  <span className="step-num">2</span>
                  <span><code>onChange</code> event fires</span>
                </div>
                <div className="flow-step-arrow">➔</div>
                <div className="flow-step">
                  <span className="step-num">3</span>
                  <span><code>setFormData()</code> updates state</span>
                </div>
                <div className="flow-step-arrow">➔</div>
                <div className="flow-step">
                  <span className="step-num">4</span>
                  <span>Input re-renders with <code>value={'{'}formData.name{'}'}</code></span>
                </div>
              </div>

              <div className="code-block-wrapper">
                <div className="code-header">
                  <span>📁 frontend/src/components/MovieFormModal.jsx</span>
                  <span className="code-lang">React JSX</span>
                </div>
                <pre className="code-pre">
                  <code>{`import { useState } from 'react';

export default function MovieForm({ onSubmit }) {
  // 1. Initial State object holding all form fields:
  const [formData, setFormData] = useState({
    name: '',
    genre: 'Action',
    releaseYear: 2024,
  });

  // 2. Generic Change Handler for ANY input field:
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Uses ES6 Computed Property Name [name]
    setFormData(prev => ({
      ...prev,
      [name]: name === 'releaseYear' ? Number(value) : value
    }));
  };

  // 3. Form Submit Handler:
  const handleSubmit = (e) => {
    e.preventDefault(); // 🛑 CRITICAL: Stops browser from reloading page!
    if (!formData.name) return alert("Title is required!");
    onSubmit(formData); // Sends JSON to parent / DRF API
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Controlled Input: value comes from state, onChange updates state */}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Movie Title"
        required
      />
      <button type="submit">Save Movie (DRF POST)</button>
    </form>
  );
}`}</code>
                </pre>
              </div>

              <div className="explanation-callout">
                <strong>Why do we use the generic <code>handleChange</code> pattern?</strong>
                <p>
                  Instead of writing 10 separate handlers (<code>handleNameChange</code>, <code>handleGenreChange</code>, etc.),
                  we give every input a <code>name="..."</code> attribute matching the state key.
                  The expression <code>[name]: value</code> updates only the specific property dynamically!
                </p>
              </div>
            </div>
          )}

          {/* 3. REACT EVENTS */}
          {(selectedReactTopic === 'all' || selectedReactTopic === 'events') && (
            <div className="concept-card">
              <div className="card-badge topic-badge">TOPIC 3 OF 7</div>
              <h3>⚡ React Events (SyntheticEvent)</h3>
              <p className="concept-lead">
                React handles events identically across all browsers using a wrapper called <strong>SyntheticEvent</strong>.
              </p>

              <div className="table-responsive">
                <table className="concept-table">
                  <thead>
                    <tr>
                      <th>HTML Native Syntax</th>
                      <th>React Syntax</th>
                      <th>Key Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>onclick="handleClick()"</code></td>
                      <td><code>onClick={'{'}handleClick{'}'}</code></td>
                      <td>camelCase naming; pass a function <strong>reference</strong>, not a function call!</td>
                    </tr>
                    <tr>
                      <td><code>onsubmit="return false"</code></td>
                      <td><code>e.preventDefault()</code></td>
                      <td>Must explicitly call the method on the event object.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="two-col-grid" style={{ marginTop: '20px' }}>
                <div className="card-sub-box">
                  <h4>1. <code>e.preventDefault()</code></h4>
                  <p>
                    Stops the browser's default action. When a <code>&lt;form&gt;</code> is submitted in standard HTML,
                    the browser tries to send a GET/POST request and <strong>reloads the whole webpage</strong>.
                    In a Single Page Application (SPA), we call <code>e.preventDefault()</code> to keep React alive and send a background <code>fetch()</code> request!
                  </p>
                </div>

                <div className="card-sub-box">
                  <h4>2. <code>e.stopPropagation()</code></h4>
                  <p>
                    Stops <strong>Event Bubbling</strong>.
                    In our Netflix app, clicking a movie card opens the Trailer Modal.
                    However, inside the card there is an "Edit" and "Delete" button.
                    If we click "Delete" without <code>e.stopPropagation()</code>, the click bubbles up to the card and accidentally opens the modal too!
                  </p>
                </div>
              </div>

              <div className="code-block-wrapper" style={{ marginTop: '16px' }}>
                <div className="code-header">
                  <span>Code Demonstration: Event Bubbling Prevention</span>
                  <span className="code-lang">JavaScript</span>
                </div>
                <pre className="code-pre">
                  <code>{`function MovieCard({ movie, onSelect, onDelete }) {
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // 🛡️ Prevents the parent card's onClick from triggering!
    onDelete(movie);
  };

  return (
    <div onClick={() => onSelect(movie)}>
      <h3>{movie.name}</h3>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}`}</code>
                </pre>
              </div>
            </div>
          )}

          {/* 4. REACT LISTS */}
          {(selectedReactTopic === 'all' || selectedReactTopic === 'lists') && (
            <div className="concept-card">
              <div className="card-badge topic-badge">TOPIC 4 OF 7</div>
              <h3>📋 React Lists (Rendering Arrays of Data)</h3>
              <p className="concept-lead">
                In React, we do not use <code>for</code> loops inside JSX. Instead, we use JavaScript's functional
                <strong><code>.map()</code></strong> method to transform an array of movie objects into an array of JSX elements.
              </p>

              <div className="code-block-wrapper">
                <div className="code-header">
                  <span>📁 frontend/src/components/MovieList.jsx</span>
                  <span className="code-lang">React JSX</span>
                </div>
                <pre className="code-pre">
                  <code>{`export default function MovieList({ movies, onSelectMovie }) {
  // 1. Guard clause: Handle empty list gracefully!
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No movies found matching your search!</p>
      </div>
    );
  }

  // 2. Transforming array with .map():
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}      // Unique key prop
          movie={movie}       // Prop passing
          onSelect={onSelectMovie}
        />
      ))}
    </div>
  );
}`}</code>
                </pre>
              </div>

              <div className="explanation-callout">
                <strong>Always handle the empty state:</strong>
                <p>
                  A common beginner mistake is assuming the array always has data.
                  If the user searches for "xyz" and 0 movies match, <code>movies.map()</code> returns an empty array, leaving a blank awkward screen.
                  Always provide a user-friendly empty state message!
                </p>
              </div>
            </div>
          )}

          {/* 5. REACT KEYS */}
          {(selectedReactTopic === 'all' || selectedReactTopic === 'keys') && (
            <div className="concept-card">
              <div className="card-badge topic-badge">TOPIC 5 OF 7</div>
              <h3>🔑 React Keys (Virtual DOM Reconciliation)</h3>
              <p className="concept-lead">
                When rendering lists, React gives a console warning: <em>"Each child in a list should have a unique 'key' prop."</em>
                Why is this so important?
              </p>

              <div className="analogy-box">
                <span className="analogy-icon">🏷️</span>
                <div>
                  <strong>The Coat Check Analogy:</strong>
                  <p>
                    Imagine a cloakroom with 100 coats. If each coat has a unique numbered ticket (ID),
                    the attendant can immediately grab coat #42 without touching the other 99 coats.
                    If there are no tickets, the attendant has to inspect and rearrange every single coat in the room from beginning to end!
                  </p>
                </div>
              </div>

              <div className="comparison-grid" style={{ marginTop: '16px' }}>
                <div className="comp-item comp-good">
                  <h4>✅ DO: Use Stable Database ID</h4>
                  <code>{`<MovieCard key={movie.id} />`}</code>
                  <p style={{ marginTop: '8px', fontSize: '13px' }}>
                    When you delete movie #2, React compares keys, sees that keys #1, #3, #4 haven't changed,
                    and deletes <strong>only</strong> movie #2 from the real DOM. Fast and bug-free!
                  </p>
                </div>

                <div className="comp-item comp-bad">
                  <h4>❌ DON'T: Use Array Index</h4>
                  <code>{`<MovieCard key={index} />`}</code>
                  <p style={{ marginTop: '8px', fontSize: '13px' }}>
                    If you delete item at index 0, item #1 now becomes index 0, item #2 becomes index 1.
                    React gets confused, loses component state (like form inputs or animations), and re-renders the entire list!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. REACT REFS */}
          {(selectedReactTopic === 'all' || selectedReactTopic === 'refs') && (
            <div className="concept-card">
              <div className="card-badge topic-badge">TOPIC 6 OF 7</div>
              <h3>🎯 React Refs (`useRef`)</h3>
              <p className="concept-lead">
                React follows a declarative model (React updates the DOM for you).
                However, sometimes you need an <strong>"escape hatch"</strong> to interact directly with the real HTML DOM node.
                That's what <strong><code>useRef</code></strong> is for!
              </p>

              <div className="card-sub-box">
                <h4>When to use `useRef`:</h4>
                <ul>
                  <li><strong>Focusing an input:</strong> Focusing the search bar when the user presses a button or keyboard shortcut.</li>
                  <li><strong>Controlling media:</strong> Playing/pausing a <code>&lt;video&gt;</code> or resetting an <code>&lt;iframe&gt;</code>.</li>
                  <li><strong>Click Outside Detection:</strong> Closing a modal dialog when clicking anywhere outside of it.</li>
                  <li><strong>Storing mutable values:</strong> Storing a timer ID without causing a component re-render when it updates.</li>
                </ul>
              </div>

              <div className="code-block-wrapper" style={{ marginTop: '16px' }}>
                <div className="code-header">
                  <span>📁 frontend/src/components/SearchBar.jsx</span>
                  <span className="code-lang">React JSX</span>
                </div>
                <pre className="code-pre">
                  <code>{`import { useRef } from 'react';

export default function SearchBar() {
  // 1. Create a Ref container:
  const searchInputRef = useRef(null);

  const handleFocusClick = () => {
    // 2. Access the real DOM element via .current and call native DOM methods:
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  };

  return (
    <div>
      {/* 3. Attach the ref to the JSX element: */}
      <input ref={searchInputRef} placeholder="Search movies..." />
      <button onClick={handleFocusClick}>
        🎯 Focus Input (useRef Demo)
      </button>
    </div>
  );
}`}</code>
                </pre>
              </div>

              <div className="explanation-callout">
                <strong>Golden Rule of `useRef`:</strong>
                <p>
                  Updating <code>state</code> causes a component to re-render.
                  Updating <code>ref.current</code> does <strong>NOT</strong> cause a re-render!
                </p>
              </div>
            </div>
          )}

          {/* 7. REACT FRAGMENTS */}
          {(selectedReactTopic === 'all' || selectedReactTopic === 'fragments') && (
            <div className="concept-card">
              <div className="card-badge topic-badge">TOPIC 7 OF 7</div>
              <h3>🧩 React Fragments (`&lt;&gt;...&lt;/&gt;`)</h3>
              <p className="concept-lead">
                In React, every component must return a <strong>single parent element</strong>.
                Historically, developers wrapped everything in <code>&lt;div&gt;</code> tags.
                This led to <em>"Div Soup"</em> and broke layouts like HTML tables and CSS grids!
              </p>

              <div className="two-col-grid">
                <div className="comp-item comp-bad">
                  <h4>❌ The Problem: Invalid HTML & Broken Layout</h4>
                  <pre className="code-pre" style={{ fontSize: '11px' }}>
                    <code>{`// ❌ A <div> inside a <tr> is invalid HTML!
function ActionButtons() {
  return (
    <div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}`}</code>
                  </pre>
                </div>

                <div className="comp-item comp-good">
                  <h4>✅ The Solution: React Fragment</h4>
                  <pre className="code-pre" style={{ fontSize: '11px' }}>
                    <code>{`// ✅ Leaves zero trace in the final HTML DOM tree!
function ActionButtons() {
  return (
    <>
      <button>Edit</button>
      <button>Delete</button>
    </>
  );
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="explanation-callout" style={{ marginTop: '16px' }}>
                <strong>Short Syntax vs Explicit Syntax:</strong>
                <ul>
                  <li><strong>Short syntax:</strong> <code>&lt;&gt; ... &lt;/&gt;</code> (most common, cannot accept props).</li>
                  <li>
                    <strong>Explicit syntax:</strong> <code>&lt;React.Fragment key={'{'}id{'}'}&gt; ... &lt;/React.Fragment&gt;</code>
                    (used when mapping an array where the fragment itself requires a <code>key</code> prop!).
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: END-TO-END FULLSTACK FLOW                                         */}
      {/* ========================================================================= */}
      {activeTab === 'flow' && (
        <div className="concept-content animate-fade">
          <div className="concept-card">
            <div className="card-badge">LIFECYCLE</div>
            <h3>🔄 The Complete Data Flow: From User Click to Database</h3>
            <p className="concept-lead">
              Follow the journey of a user clicking <strong>"Save Movie"</strong> in our Netflix app:
            </p>

            <div className="timeline-flow">
              <div className="timeline-item">
                <div className="timeline-badge">1</div>
                <div className="timeline-text">
                  <h4>User fills form and clicks "Save Movie"</h4>
                  <p>In <code>MovieFormModal.jsx</code>, <code>handleSubmit(e)</code> triggers. <code>e.preventDefault()</code> stops page reload.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">2</div>
                <div className="timeline-text">
                  <h4>React sends HTTP POST Request with JSON</h4>
                  <p>
                    In <code>src/api.js</code>, <code>fetch('http://127.0.0.1:8000/api/movies/', {'{'} method: 'POST', body: JSON.stringify(formData) {'}'})</code> executes.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">3</div>
                <div className="timeline-text">
                  <h4>CORS Check & URL Routing in Django</h4>
                  <p>
                    <code>CorsMiddleware</code> verifies the request origin.
                    Django's <code>urls.py</code> routes <code>/api/movies/</code> to <code>MovieViewSet.as_view()</code>.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">4</div>
                <div className="timeline-text">
                  <h4>DRF Serializer Validates the Data</h4>
                  <p>
                    <code>MovieSerializer(data=request.data)</code> checks field types and runs <code>validate_releaseYear()</code>.
                    If valid, it calls <code>serializer.save()</code>.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">5</div>
                <div className="timeline-text">
                  <h4>SQLite Database Inserts the Record</h4>
                  <p>Django ORM runs: <code>INSERT INTO app_movie (...) VALUES (...);</code> and generates a new auto-increment ID.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">6</div>
                <div className="timeline-text">
                  <h4>DRF Responds with HTTP 201 Created & JSON</h4>
                  <p>DRF returns the saved movie with its new <code>id</code>.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">7</div>
                <div className="timeline-text">
                  <h4>React Updates State & Re-renders Instantly</h4>
                  <p>
                    In <code>App.jsx</code>, <code>setMovies([created, ...prev])</code> prepends the new movie to state.
                    React diffs the Virtual DOM and smoothly adds the new card to the Netflix grid!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: VIVA & INTERVIEW PREP                                             */}
      {/* ========================================================================= */}
      {activeTab === 'qa' && (
        <div className="concept-content animate-fade">
          <div className="concept-card">
            <div className="card-badge">VIVA / INTERVIEW</div>
            <h3>🎯 Frequently Asked Questions (Instructor & Student Cheat Sheet)</h3>

            <div className="qa-list">
              <div className="qa-item">
                <h4>Q1: What is the difference between a Django View and a DRF ViewSet?</h4>
                <p>
                  A standard Django View returns an <code>HttpResponse</code> or HTML template (via <code>render</code>).
                  A DRF ViewSet returns structured data (JSON/XML) wrapped in a <code>Response()</code> object and handles all CRUD operations (list, create, retrieve, update, destroy) in one unified class.
                </p>
              </div>

              <div className="qa-item">
                <h4>Q2: Why must state in React never be mutated directly (e.g. `movies.push(newMovie)`)?</h4>
                <p>
                  React compares the previous state object with the next state object by reference.
                  If you mutate the array directly with <code>.push()</code>, the memory reference remains unchanged, so React does not know data has changed and <strong>will not re-render the screen</strong>!
                  Always use <code>setMovies([...movies, newMovie])</code> to return a new array copy.
                </p>
              </div>

              <div className="qa-item">
                <h4>Q3: What happens if you forget `e.preventDefault()` inside a form submit?</h4>
                <p>
                  The browser performs its default HTML form action: it submits an HTTP request to the current URL and <strong>reloads the entire webpage</strong>, wiping out all React in-memory state!
                </p>
              </div>

              <div className="qa-item">
                <h4>Q4: Why is using `key={index}` considered an anti-pattern in React lists?</h4>
                <p>
                  Array indices change whenever items are sorted, filtered, or deleted.
                  If you delete item 0, item 1 becomes the new index 0. React believes index 0 never left and reuses its DOM node, causing state corruption and rendering bugs.
                  Always use permanent, unique database IDs (like <code>key={movie.id}</code>).
                </p>
              </div>

              <div className="qa-item">
                <h4>Q5: When would you choose `useRef` over `useState`?</h4>
                <p>
                  Use <code>useState</code> when changes to the data should be visible on screen (re-render the UI).
                  Use <code>useRef</code> when you want to imperatively access DOM elements (focusing inputs, measuring size, scrolling) or store mutable values without triggering a re-render.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
