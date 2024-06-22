import {Link} from 'react-router-dom'
import styled from "styled-components"
import { useState } from 'react';

const NavbarContainer = styled.div`
    background-color: #121054; /* 배경색 */
    position: fixed; /* 화면 상단에 고정 */
    top: 0;
    width: 100%; /* 전체 너비로 설정 */
    height: 55px; 
    padding: 0px 15px;
    z-index: 2;
    color: white; 

    .mainpage { // UMC Movie(홈 버튼) 디자인
        color: white;
        padding-top: 15px;
        float: left; // 텍스트용
    }
    
    .mainpage:hover{
        cursor: pointer;
        font-weight: bold;
    }
`;

const NavbarContent = styled.div`
    padding-right: 20px; 
    padding-top: 15px;
    float: right; // 전체 그룹용
    
    a {
        color: white;
        margin: 0px 10px;
    }

    a:hover {
        cursor: pointer;
        font-weight: bold;
    }

    @media (max-width: 768px) { /* 화면 너비가 768px 이하일 때 */
        display: none; /* 링크 숨기기 */
    }
`;


// 사이드바 컨테이너 스타일 정의
const SidebarContainer = styled.div`
    position: fixed; /* 화면 오른쪽에 고정하여 스크롤 시에도 항상 보이게 설정 */
    top: 0; /* 왜 이게 없어도 navbar바로 밑에 안 생기는지 모르겠음*/
    right: ${({ isOpenCss }) => (isOpenCss ? '0' : '-290px')}; /* isOpen 상태에 따라 사이드바를 오른쪽에서 나타나게 하거나 숨김 */
    width: 250px; 
    height: 100%; 
    background-color: #121054; 
    transition: right 0.3s ease-in-out; // 애니메이션
    z-index: 1; 
    padding: 50px 20px; 
`;

// 사이드바 내용 스타일 정의
const SidebarContent = styled.div`
    text-align: left; /* 텍스트 왼쪽 정렬 */
    
    a {
        display: block; /* 링크를 블록 요소로 설정하여 세로로 쌓이게 함 */
        color: white;
        margin: 20px 0; /* 링크 사이에 세로 여백 설정 */
    }

    a:hover {
        cursor: pointer; 
        font-weight: bold; 
    }
`;

// 햄버거 메뉴 버튼 스타일 정의
const Burger = styled.div`
    display: none; // 기본설정은 안 보이게 
    color: white;

    @media (max-width: 768px) { 
        display: block; /* 햄버거 메뉴 버튼을 표시 */
        position: fixed; /* 화면 상단에 고정하여 스크롤 시에도 항상 보이게 설정 */
        top: 15px;
        right: 20px; 
        cursor: pointer; 
        z-index: 3; 
    }
`;


function Navbar(){ 
    let [login, setLogin] = useState(false); // 로그인/로그아웃 상태
    let [isOpen, setIsOpen] = useState(false); // 사이드바 열림/닫힘 상태

    return (
        <>
        {/* 햄버거 메뉴 버튼 클릭 시 사이드바 열림/닫힘 상태를 토글 */}
        <Burger onClick={() => setIsOpen(!isOpen)}>
            <div>☰</div>
        </Burger>

        {/* 상단 네비게이션 바 컨테이너 */}
        <NavbarContainer>
            <Link to="/" className='mainpage'>UMC Movie</Link>
            <NavbarContent>
                {/* {
                    login ?  <Link to="/signup" onClick={()=>setLogin(false)}>로그아웃 </Link> :
                    <Link to="/mainpage" onClick={()=>setLogin(true)}>로그인 </Link>
                } */}
                <Link to="/signup">회원가입</Link>
                <Link to="/Login">로그인</Link>
                <Link to="/popular">Popular</Link>
                <Link to="/nowplaying">Now Playing</Link>
                <Link to="/toprated">Top Rated</Link>
                <Link to="/upcoming">UpComing</Link>
            </NavbarContent>
        </NavbarContainer>

        {/* 사이드바 컨테이너 */}
        <SidebarContainer isOpenCss={isOpen}> {/*css에 isOpenCss값 전달*/}
            <SidebarContent onClick={() => setIsOpen(!isOpen)}> {/*링크 누르면 사이드바 닫힘*/}
                <Link to="/signup">회원가입</Link>
                <Link to="/Login">로그인</Link>
                <Link to="/popular">Popular</Link>
                <Link to="/nowplaying">Now Playing</Link>
                <Link to="/toprated">Top Rated</Link>
                <Link to="/upcoming">UpComing</Link>
            </SidebarContent>
        </SidebarContainer>
        </>
    )
}
export default Navbar;