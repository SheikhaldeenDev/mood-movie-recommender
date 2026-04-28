import { useState } from "react";
import "./App.css";

const moodSearchTerms = {
  Happy: "comedy",
  Sad: "drama",
  Scared: "horror",
  Romantic: "romance",
  Excited: "action",
  Thoughtful: "science fiction",
  Cozy: "family"
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMovies(mood) {
    setLoading(true);

    const searchTerm = moodSearchTerms[mood];
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results.slice(0, 6));
    setLoading(false);
  }

  return (
    <main className="app">
      <h1>🎬 Mood Movie Recommender</h1>
      <p>Pick your vibe and get real movies.</p>

      <div className="mood-buttons">
        {Object.keys(moodSearchTerms).map((mood) => (
          <button key={mood} onClick={() => getMovies(mood)}>
            {mood}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average.toFixed(1)}</p>
            <p>{movie.overview.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;