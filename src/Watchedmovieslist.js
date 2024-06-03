import React from 'react'

export default function WatchedMoviesList({ watched,setWatched }) {

  const removeMovie = (imdbID) => {
    setWatched(prevWatched => prevWatched.filter(movie => movie.imdbID !== imdbID));
  };
  
    return (
      <ul className="list">
        {watched.map((movie) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <WatchedMovie movie={movie} key={movie.imdbID} />
          <button className="btn-add" onClick={() => removeMovie(movie.imdbID)}>❌</button>
        </div>
        
        ))}
      </ul>
    );
  }
  
  function WatchedMovie({ movie }) {
    return (
      <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
            
          </p>
          <p>
            <span>
            {/* <button className="btn-add"onClick={()=>{}}>❌</button> */}
            </span>
          </p>
        </div>
      </li>
    );
  }
  