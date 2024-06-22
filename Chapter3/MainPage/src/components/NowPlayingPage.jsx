import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from './movie.jsx';
import styled from "styled-components";

const LoadingSpinner = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 300px;
background-color: #22254B;

.spinner {
  width: 40px;
  height: 40px;
  border: 5px solid #3498db;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.ex-box {
  padding: 10px;
  border: 1px solid black;
}
`;

function NowPlaying(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setIsLoading(true); // 로딩 상태 활성화

    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=aff0ce6bc311a8cd3b800faa1f64a7cf&language=ko-KO&page=${page}`
      )
      .then((result) => {
        // API 호출 결과를 상태로 설정
        setMovies([...movies, ...result.data.results]); // 원래 데이터에 새로 불러운 페이지 데이터 추가
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error', error);
        setIsLoading(false);
      });
    }, [page]);  // 페이지 상태가 바뀔 때마다 api 불러오는 함수 재실행

  // 스크롤 이벤트를 감지해서 handleScroll함수 실행
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){// true일 경우 스크롤이 맨 아래에 도달함
        setPage(page + 1);}
    };
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
    // 컴포넌트가 언마운트될 때(page바뀔때) 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]); // page가 변경될 때만 이 effect를 재실행
  
  // window.addEventListener('scroll', handleScroll); // --> 계속 재랜더링되는 이유??
  // return () => window.removeEventListener('scroll', handleScroll); // 생성된 이벤트리스너 제거
  

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
          {isLoading &&  // 로딩중일 경우만 표시
          <LoadingSpinner>
            <div className="spinner"></div>
          </LoadingSpinner>
          }
        </div>
      </div>
    );
  }
  

export default NowPlaying;
