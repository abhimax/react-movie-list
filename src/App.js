import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoveHandler = async () => {
    setIsLoading(true);
    setError(null);
    try{
      const respond = await fetch("https://swapi.dev/api/films");
      if(!respond.ok){
        throw new Error('Something is wrong!');
      }
      const data = await respond.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
      
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);

  };
  
  let content = <p>No Movies found!</p>;
  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }
  if(error){
    content = <p>Something went wrong!</p>
  }
  if(isLoading){
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoveHandler}>Fetch Movies</button>
      </section>
      <section>
        { content }
      </section>
    </React.Fragment>
  );
}

export default App;
