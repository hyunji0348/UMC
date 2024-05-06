import {Link} from 'react-router-dom'
import styled from "styled-components"
import { useState } from 'react';

function Navbar(){ 
    let [login, setLogin] = useState(false);

    const NavbarContainer = styled.div`
    background-color: #121054; /* 배경색 */
    position: fixed; /* 화면 상단에 고정 */
    top: 0;
    width: 100%; /* 전체 너비로 설정 */
    z-index: 1;
    `;

    const Span = styled.div`
    color: white; 
    text-align: right;
    padding: 15px;
    a {
        color: white;
        margin: 0px 10px;
        }
    
        a:hover {
        cursor: pointer;
        font-weight: bold;
        transform: scale(1.1);
        }

        a:first-child{
        float: left;
        }
    `;
    return (
        <NavbarContainer>
        <Span><Link to="/mainpage">UMC Movie</Link>
        {
            login ?  <Link to="/signup" onClick={() => setLogin(false)}>로그아웃 </Link> :
            <Link to="/signup" onClick={() => setLogin(true)}>로그인 </Link>
        }
        <Link to="/popular">Popular</Link>
        <Link to="/nowplaying">Now Playing</Link>
        <Link to="/toprated">Top Rated</Link>
        <Link to="/popular">UpComing</Link></Span>
        </NavbarContainer>
    )
}
export default Navbar;