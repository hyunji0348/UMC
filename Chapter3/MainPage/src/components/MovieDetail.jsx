const IMG_BASE_URL = "http://image.tmdb.org/t/p/w300/";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from 'react-router-dom' 	
import { useEffect, useState } from 'react';
import axios from 'axios';

function DetailPage() {
    const {state} = useLocation();	
    const {title,
        poster_path,
        backdrop_path,
        vote_average,
        release_date,
        overview} = state;

    const navigate = useNavigate();

    const Body = styled.div`
    background-color: #0d0e12;
    `
    const InfoBody = styled.div`
    background-image: url(${IMG_BASE_URL + backdrop_path});
    background-color: rgba(0, 0, 0, 0.85); /* 배경 이미지의 투명도를 조절합니다. */
    background-blend-mode: multiply; /* 배경 이미지와 배경 색상을 혼합합니다. */
    background-size: cover;
    background-position: center;
    width: 100vw;
    color: white;
    display: flex;
    padding: 150px 0 100px 0; // 위150 아래100 여유
    @media (max-width: 768px) { /* 화면 너비가 768px 이하일 때 */
        flex-direction: column;
        background-image: none;
        background-color: #0d0e12;
        padding: 0; 
    }
    `;
    const ImgContainer = styled.div`
    width: 40%; /* 리스트 너비 조정 */
    margin: 10px; 
    display: flex;
    order: 1;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) { /* 화면 너비가 768px 이하일 때 */
        margin: 80px 0 0 10%;
    }
    `;
    const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    order: 2;
    margin: auto; 
    width: 40%;
    justify-content: flex-start; /* 왼쪽 정렬 */
    align-items: flex-start; /* 수직 왼쪽 정렬 */

    @media (max-width: 768px) { /* 화면 너비가 768px 이하일 때 */
        margin: 0 0 0 10%;
    }
    `;
    const Rate = styled.div`
    display: grid;
    `; // 왜 이거 지우면 오류뜰까

    const CastInfo = styled.div`
    display: flex;
    flex-wrap: wrap; /* 가로로 나열되게 하며, 공간이 부족하면 다음 줄로 넘어감 */
    font-size: 10px;
    margin: 50px 0px;
    color: white; 
    justify-content: center;
    margin: 5%;

    .castContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .cast {
        margin: 20px;
        text-align: center;
    }

    .cast img {
        width: 70px; /* 프로필 이미지 너비 */
        height: 100px; /* 프로필 이미지 높이 */
        border-radius: 50%; /* 원형으로 만들기 */
        object-fit: cover; /* 이미지가 요소의 크기에 맞게 조정 */
    }

    p {
        margin: 0;
    }
    `;
    // overview에 내용이 있어 true값이면 요약내용 그대로 저장. NUll값이라 false면 오류 메시지 출력
    let preview = overview ? overview : "TMDB에서 제공하는 상세 줄거리 정보가 없습니다." ;
    


    // -----배우들 api데이터 가져오는 코드----- //
    const [casts, setCasts] = useState([]); // 출연 배우들 정보 저장 state
    // // 현재 url정보에서 영화 id가져오기
    // const location = useLocation();
    // const pathname = location.pathname; // 현재 url경로를 pathname변수에 저장 ex) /movie/240
    // const parts = pathname.split('/');  // '/'을 기준으로 분할한 배열 parts 생성
    // const id = parts[parts.length - 1]; // 배열의 마지막 요소 가져오기 --> 해당 영화의 id번호
    let {id} = useParams();

    const tmdbCast = axios.create({ // axios객체 생성
      baseURL: 'https://api.themoviedb.org/3', 
      params: {
        api_key: 'aff0ce6bc311a8cd3b800faa1f64a7cf', // TMDB API 키
        language: 'ko-KR' // 기본 언어 설정
      }
    });
    // 영화배우들 api데이터 가져와서 casts에 저장
    useEffect(() => { 
        tmdbCast.get(`/movie/${id}/credits`)
        .then(result => { // API 호출 결과가 result에 저장됨
          setCasts(result.data.cast);
        })
        .catch(error => { // 오류 발생시 처리
          console.error('Error:', error);
        });
      }, ); 



    return (
        // 창 아무곳이나 클릭시 뒤로가기
        <Body onClick={ () => {navigate(-1)} }> 
            <InfoBody>
                <ImgContainer><img src={IMG_BASE_URL + poster_path} alt='포스터'/></ImgContainer>
                <TextContainer>
                    <h2>{title}</h2>
                    <Rate><h4>평점 {'⭐'.repeat(Math.floor(vote_average))}</h4></Rate>
                    <h4>개봉일 {release_date}</h4>
                    <h4>줄거리</h4>
                    <p>{preview}</p>
                </TextContainer>
            </InfoBody>
            <CastInfo>
                <h1>출연진 및 제작진</h1>
                <div className="castContainer">
                    {casts.map((element, index) => (
                        <div key={index} className="cast">
                            <img src={element.profile_path ?  // 프로필 이미지가 없을경우 기본 이미지 출력
                            IMG_BASE_URL + element.profile_path : 
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'} alt='이미지 없음'/>
                            <p>{element.name}</p>
                            <p>{element.known_for_department}</p>
                        </div>
                    ))}
                </div>
            </CastInfo>
        </Body>
    )
  }
  
export default DetailPage;