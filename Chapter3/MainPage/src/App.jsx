import React, { useState, useEffect } from 'react';
import Movie from "./components/movie.jsx";
import {movies} from './api.jsx';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <div class="navbar">
        <span><Link to="/popular">popular </Link></span>
        <span><Link to="/nowplaying">nowplaying </Link></span>
        <span><Link to="/toprated">toprated </Link></span>
        <span><Link to="/popular">popular </Link></span>
      </div>

              
      <Routes>
        <Route path="/" element={      
        <div className="app-container">
        {
          movies.results.map((element) => {//api의 result멤버의 data갯수 만큼 돈다.
            return (
              <div>
                <Movie 
                  title = {element.title}
                  poster_path= {element.poster_path}
                  vote_average= {element.vote_average}
                />
              </div>
            )
          })
        }
      </div>}/>
          <Route path="/popular" element={<div>popular페이지</div>}/>
          <Route path="/nowplaying" element={<div>nowplaying페이지</div>}/>
          <Route path="/toprated" element={<div>toprated페이지</div>}/>
          <Route path="/popular" element={<div>upcoming페이지</div>}/>
        </Routes> 

        

    </div>
  );
}

export default App;