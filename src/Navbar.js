import React from 'react';



export default function Navbar({query,setQuery,movies}) {
    return (
      <nav className="nav-bar">
        <Logo />
        <Search  query={query} setQuery={setQuery}/>
        <NumResults movies={movies} />
      </nav>
    );
  }
  
  function Logo() {
    return (
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    );
  }
  
  function Search({query, setQuery}) {
  
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  
  function NumResults({ movies }) {
    return (
      <p className="num-results">
        {/* Found <strong>{(movies && movies.lengt)h}</strong> results */}
        <strong>{movies == null ? '0' : movies.length } Results</strong>
  
      </p>
    );
  }
