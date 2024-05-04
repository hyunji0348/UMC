import React, { useState, useEffect } from 'react';
import Movie from "./components/movie";
import Description from "./components/description";
import {movies} from './api.jsx';
import './App.css';

function App() {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  return (
    <div className="App">
      <div className="app-container">
        {
          movies.results.map((element) => {//api의 result멤버의 data갯수 만큼 돈다.
            return (
              <div className="element-container"
              onMouseEnter={() => setHoveredMovie(element.title)} // 마우스가 Movie 위에 올라갔을 때 해당 Movie의 title을 상태에 업데이트
              onMouseLeave={() => setHoveredMovie(null)} // 마우스가 Movie를 벗어났을 때 상태를 초기화>
              >
                <Movie 
                  title = {element.title}
                  poster_path= {element.poster_path}
                  vote_average= {element.vote_average}
                />
                {hoveredMovie === element.title && ( 
                  <Description
                    title = {element.title}
                    overview = {element.overview}
                  />
                )}  
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;