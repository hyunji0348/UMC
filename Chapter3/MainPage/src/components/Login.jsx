import styled from "styled-components"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
color:white;
font-size: 20px;
width: 100vw;
height: 100vh;
`;
const InputContainer = styled.div`
position: absolute;
top: 10%; /* 상단 정렬 */
width: 100%; /* 가로  */
display: flex;
flex-direction: column;
align-items: center;
input{
    width: 400px;
    padding: 14px 15px;
    border-radius: 30px;
    margin: 6px;
};
button{
    width: 400px;
    padding: 10px;
    border-radius: 30px;
    margin: 30px;
};
.error{
    color: red;
    font-size: 15px;
    padding: 5px;
};
.isIdCheck {
    display: inline;
    padding: 20px;
    span{
        padding: 25px;
    }
  };
`;
function Login() {
    const navigate = useNavigate(); // useHistory는 구버전

    // 입력값 관리 state-
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 에러문구 관리 state
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 유효성 검사 state
    const [idValid, setIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const [notAllow, setnotAllow] = useState(true); // 제출버튼 상태

    // 아이디 유효성 검사
    const handleId = (e) => {
        setId(e.target.value);

        if (e.target.value == '') { // 입력값이 없을 때
            setIdError('아이디를 입력해주세요!');
            setIdValid(false);
        }else { // 입력값이 문자열인 경우
            setIdError('');
            setIdValid(true);
        }
    }

    // 비밀번호 유효성 검사
    const handlePassword = (e) => {
        setPassword(e.target.value);

        if(!isNaN(e.target.value)){
            setPasswordError("비밀번호는 문자열이어야 합니다.")
            setPasswordValid(false);
        }else if(e.target.value.length < 4){
            setPasswordError("최소 4자리 이상 입력해주세요.")
            setPasswordValid(false);
        }else if(e.target.value.length > 12){
            setPasswordError("최대 12자리까지 입력 가능합니다.")
            setPasswordValid(false);
        }else if(!validatePassword(e.target.value)){
            setPasswordError("비밀번호는 영어, 숫자, 특수문자를 포함해주세요.")
            setPasswordValid(false);
        }
        else{
            setPasswordError("")
            setPasswordValid(true);
        }
    }
    // 비밀번호 유효성 검사 함수
    function validatePassword(password) {
        // 숫자, 영어, 특수문자가 각각 한 글자 이상 포함되어야 함
        var hasNumber = /\d/.test(password);
        var hasLetter = /[a-zA-Z]/.test(password);
        var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        // 모든 조건을 만족하는지 확인
        var isValid = hasNumber && hasLetter && hasSpecialChar;

        return isValid;
    }
    
    useEffect(() => {
        if(idValid && passwordValid){
            setnotAllow(false); // 조건을 만족할 경우 제출버튼 활성화
            return;
        } 
        setnotAllow(true);
    }, // 각 항목의 Valid값들이 변경될 때마다 useEffect실행됨
    [idValid, passwordValid]);
    
    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // 필수!! 폼 요소의 기본 동작인 페이지 전환/새로고침 방지 
        // 폼 데이터 콘솔 출력
        console.log({
            id,
            password
        });
        alert("로그인 완료");
        // MainPage로 이동
        navigate('/');
    }
    return (
        <Form method="post" onSubmit={handleSubmit}>
            <InputContainer>
            <h3 id="title">로그인 페이지</h3>

            <input type="text" value={id} 
                onChange={handleId}
                placeholder="아이디를 입력해주세요"/>
            <div className="error">{idError}</div>

            <input type="password" value={password} 
                onChange={handlePassword}
                placeholder="비밀번호를 입력해주세요"/>
            <div className="error">{passwordError}</div>

            <button disabled={notAllow}>제출하기</button> 
            </InputContainer> 
        </Form> 
        // button 요소의 기본타입이 submit. 평범한 버튼 만드려면 type="button 속성명시 
    )
}

export default Login;