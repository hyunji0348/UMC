import React, { useState, useEffect } from 'react';
import Movie from "./components/movie";
import { movies } from './components/moviedummy';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        {
          movies.results.map((item) => {//data갯수 만큼 돈다.
            return (
              <Movie 
                title = {item.title}
                poster_path= {item.poster_path}
                vote_average= {item.vote_average}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;