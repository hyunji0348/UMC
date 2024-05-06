import {useNavigate} from 'react-router-dom'
import styled from "styled-components";

function ErrorPage(){
    let navigate = useNavigate()
    
    const Body = styled.div`
    color: white;
    `
    const Title = styled.div`
    height: 100vh; 
    width: 100vw;
    z-index: 2;
    background-color: #2e3263;
    position: absolute;
    top: 0; 
    bottom: 100%; 
    width: 100%; 
    display: flex;
    flex-direction: column;
    justify-content: center; /* 수직 가운데 정렬 */
    align-items: center; /* 수평 가운데 정렬 */
    
    h4:first-child{
        text-align: center;
        font-size: 50px;
        margin-bottom: 0;
    }
    h4 {
        margin: 10px;
        text-align: center;
        font-size: 20px;
        font-style: italic; 
    }
    `;
    const ReturnBtn = styled.button`
        background-color: #2e3263;
        color: white;
        font-size: 30px;
    `;

  return (
    <Body>
        <Title><h4>Oops!</h4> 
        <h4>예상치 못한 에러가 발생했습니다; Ĭ ^ Ĭ </h4>
        <h4>Not found </h4>
        <ReturnBtn onClick={ ()=>{navigate('/mainpage') }}>메인으로 이동하기</ReturnBtn>
        </Title> 
    </Body>
  )
};

export default ErrorPage;