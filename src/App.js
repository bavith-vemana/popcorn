import { useState,useEffect,useLayoutEffect } from "react";
import StarRating from "./StarRating";
import Navbar from "./Navbar.js";
import Moviedetails from "./Moviedetails.js";
import Watchedsummary from "./Watchedsummary.js";
import Watchedmovieslist from './Watchedmovieslist.js'
import Movielist from "./Movielist.js";
import { useMovies } from "./useMovies.js";


const KEY= 'f84fc31d';

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([
    {
      imdbID: "id",
      Title: "sample",
      Year: 2014,
      Poster: "poster",
      runtime: 58,
      imdbRating: 3,
      userRating: 3,
    }
  ]
    // JSON.parse(localStorage.getItem("Watched"))
  );
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const onSelectMovie = (id) => {
    setSelectedId(id);
  };

  const onCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAdd = (id, title, year, poster, runtime, ImdbRating, UserRating) => {
    const newWatchMovie = {
      imdbID: id,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(ImdbRating),
      userRating: Number(UserRating),
    };
    setWatched([...watched, newWatchMovie]);
  };

  useEffect(() => {
    localStorage.setItem("Watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />

      <Main>
        <Box>
          {isLoading && <p className="loader">Loading</p>}
          {error && <Error message={error} />}
          {!isLoading && !error && <Movielist movies={movies} onSelectMovie={onSelectMovie} />}
        </Box>

        <Box>
          {selectedId ? (
            <Moviedetails selectedId={selectedId} onCloseMovie={onCloseMovie} handleAdd={handleAdd} KEY={KEY} />
          ) : (
            <>
              <Watchedsummary watched={watched} />
              <Watchedmovieslist watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Error({ message }) {
  return <p>💀{message}</p>;
}


function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}
