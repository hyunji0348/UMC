import styled from "styled-components";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from './movie.jsx';
import useDebounce from './Debounce.jsx';

const Body = styled.div`
  height: 100%; 
  width: 100%;
`;
const Title = styled.div`
  position: absolute;
  top: 0; /* 상단 정렬 */
  bottom: 50%; /* 하단에서 50%까지 위치 */
  width: 100%; /* 가로 전체 차지 */
  background-color: black;
  h4{
      color: white;
      padding: 150px 10px;
      text-align: center;
      font-size: 35px;
  }
`;
const SearchContainer = styled.div`
  position: absolute;
  top: 40%; /* 하단에서 50%까지 위치 */
  width: 100%; /* 가로 전체 차지 */
  padding-top: 30px;
  background-color: #21224a;
  h1{
      text-align: center;
      font-size: 35px;
      color: white;
  }
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
`;

const InputBox = styled.input`
  padding-left: 100px;
  width: 25%;
  padding: 7px 13px;
  border-radius: 20px;
`;

const InputButton = styled.button`
  background-color: #e4b940;
  border-radius: 30px;
  color:black;
  margin-left: 10px;
`
const SearchResult = styled.div`
  background-color: #1e2039;
  color: white;
  margin: 50px 10%;
  height: 700px; /* 스크롤 가능 영역의 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */

  p{ // 로딩창 메시지
    font-size: 23px;
    font-weight: bold;
  }

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-track {
    background: #1e2039; /* Scrollbar track color */
  }
  &::-webkit-scrollbar-thumb {
    background: #b2b4dc; /* Scrollbar thumb color */
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Scrollbar thumb color on hover */
  }
`;
function MainPage(){
  const [movies, setMovies] = useState([]); // 영화 검색 결과 저장
  const [content, setContent] = useState(""); // 사용자가 입력한 검색어 
  const [isContent, setIsContent] = useState(false); // 영화 검색 유무
  const [isLoading, setIsLoading] = useState(false); // 로딩상태 유무

  const tmdbClient = axios.create({ // axios객체 생성
    baseURL: 'https://api.themoviedb.org/3', 
    params: {
      api_key: 'aff0ce6bc311a8cd3b800faa1f64a7cf', // TMDB API 키
      language: 'ko-KR' // 기본 언어 설정
    }
  });

  // 200ms동안 새로 변경되지 않은 content를 debouncedSearchText에 저장
  const debouncedSearchText = useDebounce(content, 200); 

  useEffect(() => { 
    if (debouncedSearchText) { // 검색창에 입력값이 있다면
      setIsLoading(true); // 입력이 들어왔지만 데이터는 가져오지 못 한 상태
      tmdbClient.get('/search/movie', {
        params: {
          query: debouncedSearchText,
          page: 1
        }
      })
      .then(result => { // API 호출 결과가 result에 저장됨
        setMovies(result.data.results);
        setIsLoading(false); // 데이터가 도착해 더는 로딩창을 띄울 필요가 없음
      })
      .catch(error => { // 오류 발생시 처리
        console.error('Error:', error);
        setIsLoading(false);
      });
    }
  }, [debouncedSearchText]); // useDebounce로 인해 200ms마다 변경된 debouncedSearchText가 변경될 때마다 이 useEffect가 실행

  const handleContent = (e) => {
    const value = e.target.value;
    setContent(value); 
    setIsContent(value.trim() !== ""); // 입력이 있으면 isContent를 true로 설정
  };


  return (
    <Body>
    <Title><h4>환영합니다</h4></Title>  
    <SearchContainer>
        <h1>📽️Find your movies !</h1>
        <SearchBox> 
            <InputBox onChange={handleContent} value={content}></InputBox> 
            <InputButton onClick={handleContent} value={content}>🔍︎</InputButton>
        </SearchBox>
        {isContent && ( // isContent가 true면 <SearchResult> 출력, false면 이후의 값 반환 X
        <SearchResult>
          <div className="app-container">
          {isLoading ? (<p>데이터를 받아오는 중 입니다..</p>) : // 로딩 상태가 참이면 로딩창 출력, 아니면 영화 데이터를 출력
          (movies.map((element) => (
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
          )))
          }
          </div>
        </SearchResult>
        )}
    </SearchContainer>
    </Body>
  )
};

export default MainPage;