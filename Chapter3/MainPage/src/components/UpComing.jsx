import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from './movie.jsx';
import styled from "styled-components";

const Pagination = styled.div`
  color: white;
  font-weight: bold;
  font-size: 23px;
  text-align: center; /* 가운데 정렬 */
  padding: 0 0 70px 0;
  span{
    margin: 50px;
  }
  span:last-child {
    cursor: pointer;
  }

  /* 활성화된 이전 페이지 버튼의 스타일 */
  .enabled {
    cursor: pointer;
    color: white;
  }
  
  /* 비활성화된 이전 페이지 버튼의 스타일 */
  .disabled {
    cursor: Default;
    color: grey;
  }
`;

function UpComing(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [disabled, setDisabled] = useState(false); // 이전 페이지 버튼의 활성화 여부 상태

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'aff0ce6bc311a8cd3b800faa1f64a7cf';
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KO&page=${page}`;
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    fetchMovies();

    // 페이지가 1이면 true로 버튼 비활성화/ 아니면 false
    setDisabled(page === 1);
  }, [page]);

  const handlePreviousPage = () => {
    if(page > 1)
      setPage(page-1); // 페이지를 1페이지 미만으로 내려가지 않도록 설정
  };

  const handleNextPage = () => {
    setPage(page+1); // 다음 페이지로 이동
  };

  return (
    <div>
      <div className="app-container">      
        {movies.map((element) => (
          <div className="element-container" key={element.id}>
            <Movie
              id={element.id}
              title={element.title}
              poster_path={element.poster_path}
              backdrop_path={element.backdrop_path}
              vote_average={element.vote_average}
              release_date={element.release_date}
              overview={element.overview}
            />
          </div>
        ))}
      </div>
        <Pagination>
          <span className={disabled ? "disabled" : "enabled"} onClick={handlePreviousPage}>＜</span>
          <span>{page}</span>
          <span onClick={handleNextPage}>＞</span>
      </Pagination>
    </div>
  );
}

export default UpComing;
