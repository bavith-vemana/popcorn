import React from 'react';
import { useState,useEffect,useLayoutEffect } from "react";
import StarRating from "./StarRating";

export default function Moviedetails({selectedId,onCloseMovie,handleAdd,KEY})
{
    

  useEffect(()=>{
    const fun =(e)=>{
      if(e.code === "Escape")
      {
        onCloseMovie();
      }
    }
    document.addEventListener("keydown",fun);
    return ()=>{
      document.removeEventListener("keydown",fun);
    }
  },[onCloseMovie])
  const [movie,setMovie] = useState({});
  const {
    Title : title,
    Poster : poster,
    Runtime : runtime,
    imdbRating,
    Plot,
    Released : released,
    Actors : actors,
    Director,
    Genre : genre,
    Year
  }=movie;


  useLayoutEffect(()=>{
    document.title=title

    return ()=>{
      document.title="UsePopcorn"
    }
  },[title])
  

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);
      setMovie(data);
      // Process the data as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  fetchData();
}, [selectedId]);

  return <div className="details">
    <header>
    <button className="btn-back" onClick={()=>onCloseMovie()}>🔙</button>
    <img src={poster} alt = {`poster of ${title}`}/>
    <div className="details-overview">
      <h2>{title}</h2>
      <p>
        {released}&bull;{runtime}
      </p>
      <p>
        Genre : {genre}
      </p>
      <p>
        <span>⭐️</span>{imdbRating}
      </p>
    </div>
    </header>
    <section>
      <div className="rating" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <StarRating maxRating={5} size={30}/>
      <button className="btn-add" onClick={()=>{handleAdd(selectedId,title,Year,poster,runtime,imdbRating,10)}}>+ Add to Watched list</button>
      </div>
      <p><em>{Plot}</em></p>
      <p>Actors   : {actors}</p>
      <p>Director : {Director}</p>
    </section>
  </div>
}
