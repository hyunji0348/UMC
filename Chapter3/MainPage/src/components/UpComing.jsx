import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from './movie.jsx';

function UpComing(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=aff0ce6bc311a8cd3b800faa1f64a7cf&language=en-US&page=1'
      )
      .then((result) => {
        // API 호출 결과를 상태로 설정
        setMovies(result.data.results);
      })
      .catch((error) => {
        console.error('Error fetching popular movies:', error);
      });
  }, []); // useEffect가 최초 한 번만 호출되도록 빈 배열을 두 번째 인자로 전달

  return (
    <div className="app-container">
      {movies.map((element) => (
        <div className="element-container" key={element.id}>
          <Movie
            title={element.title}
            poster_path={element.poster_path}
            vote_average={element.vote_average}
          />
        </div>
      ))}
    </div>
  );
}

export default UpComing;
