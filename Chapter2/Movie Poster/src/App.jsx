import React, { useState, useEffect } from 'react';
import Movie from "./components/movie";
import Description from "./components/description";
import {movies} from './api.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        {
          movies.results.map((element) => {//api의 result멤버의 data갯수 만큼 돈다.
            return (
              <Movie 
                title = {element.title}
                poster_path= {element.poster_path}
                vote_average= {element.vote_average}
              />
              <Description/>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;