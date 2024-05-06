import styled from "styled-components";

function MainPage(){
const handleClick = () => {
    console.log('Button clicked');
    };

  const Body = styled.div`
  height: 100vh; 
  width: 100vw;
  `
  const Title = styled.div`
    position: absolute;
    top: 0; /* 상단 정렬 */
    bottom: 50%; /* 하단에서 50%까지 위치 */
    width: 100%; /* 가로 전체 차지 */
    background-color: black;
    h4{
        color: white;
        padding: 8%;
        text-align: center;
        font-size: 35px;
    }
  `
  const SearchContainer = styled.div`
    position: absolute;
    bottom: 0; /* 하단 정렬 */
    top: 50%; /* 하단에서 50%까지 위치 */
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
    justify-content: center;
    padding: 7px 13px;
    border-radius: 20px;
  `;

  const InputButton = styled.button`
  background-color: #e4b940;
  border-radius: 30px;
  color:black;
  margin-left: 10px;
  `
  return (
    <Body>
    <Title><h4>환영합니다</h4></Title>  
    <SearchContainer>
        <h1>📽️Find your movies !</h1>
        <SearchBox>
            <InputBox></InputBox> 
            <InputButton onClick={handleClick}>🔍︎</InputButton>
        </SearchBox>
    </SearchContainer>
    

    </Body>
    // <Container>
    //   <WelcomeBox>
    //     <h1>환영합니다</h1>
    //   </WelcomeBox>
    //   <SearchContainer>
    //     <h1> 📽️ Find your movies ! </h1>
    //     <SearchBox>
    //       <SearchInput />
    //     </SearchBox>
    //   </SearchContainer>
    // </Container>
  )
};

export default MainPage;