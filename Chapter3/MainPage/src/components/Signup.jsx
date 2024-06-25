import styled from "styled-components"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    margin: 5px;
};
button{
    width: 400px;
    padding: 10px;
    border-radius: 30px;
    margin: 10px;
};
.error{
    color: red;
    font-size: 15px;
    padding: 5px;
};
.isIdCheck {
    padding: 5%;
    span{
        padding: 25px;
        font-size: 20px;
        @media (max-width: 768px) { // 화면 너비가 768px 이하일 때
            padding: 10px;
            display: flex;
        }
    }
  };
`;
function Signup() {
    const navigate = useNavigate(); // useHistory는 구버전

    // 입력값 관리 state
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    // 에러문구 관리 state
    const [nameError, setNameError] = useState('');
    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    // 유효성 검사 state
    const [nameValid, setNameValid] = useState(false);
    const [idValid, setIdValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [ageValid, setAgeValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCheckValid, setPasswordCheckValid] = useState(false);

    const [notAllow, setnotAllow] = useState(true); // 제출버튼 상태
    // const [serverError, setServerError] = useState(''); // 서버 오류 메시지 state 추가

    // 이름 유효성 검사
    const handleName = (e) => {
        setName(e.target.value); // 이게 아마 밑에 if문보다 늦게 처리되는것 같음 
                                 // --> e.target.value대신 {name}써도 즉각 반영이 안 됨 

        if (e.target.value == '') { // 입력값이 없을 때
            setNameError('이름을 입력해주세요!');
            setNameValid(false);
        } else if (!isNaN(e.target.value)) { // 입력값이 숫자일 때
            setNameError('이름은 문자열이어야 합니다.');
            setNameValid(false);
        } else { // 입력값이 문자열인 경우
            setNameError('');
            setNameValid(true);
        }
    }

    // 아이디 유효성 검사
    const handleId = (e) => {
        setId(e.target.value);

        if (e.target.value == '') { // 입력값이 없을 때
            setIdError('아이디를 입력해주세요!');
            setIdValid(false);
        }else { // 입력값이 들어올 경우
            setIdError('');
            setIdValid(true);
        }
    }
    
    // 이메일 유효성 검사
    const handleEmail = (e) => {
        setEmail(e.target.value);

        if (e.target.value == '') { // 입력값이 없을 때
            setEmailError('이메일을 입력해주세요!');
            setEmailValid(false);
        }else if(e.target.value.includes('@')){
            let emailId = e.target.value.split('@')[0];
            let emailServer = e.target.value.split('@')[1];
            if(emailId === "" || emailServer === ""){
                setEmailError("이메일 형식에 맞게 다시 입력해주세요!");
                setEmailValid(false);
                }
            else if(!isNaN(emailId)){ // 이메일아이디가 문자열이 아닐시
                setEmailError("이메일 형식에 맞게 다시 입력해주세요!");
                setEmailValid(false);
            }
            else{
                setEmailError("");
                setEmailValid(true);  
            }
        }else{ // 이메일에 @가 포함되지 않음
            setEmailError("이메일 형식에 맞게 다시 입력해주세요!");
            setEmailValid(false);
        }
    }
    
    // 나이 유효성 검사
    const handleAge = (e) => {
        setAge(e.target.value);

        if(e.target.value === ""){
            setAgeError("나이를 입력해주세요!");
            setAgeValid(false);
        }else if(isNaN(e.target.value)){
            setAgeError("나이는 숫자로 입력해주세요!")
            setAgeValid(false);
        }else if(parseInt(e.target.value) < 0){
            setAgeError("나이는 양수여야 합니다!")
            setAgeValid(false);
        }else if(parseFloat(e.target.value) !== parseInt(e.target.value)){
            setAgeError("나이는 실수로 입력해주세요!")
            setAgeValid(false);
        }else if(parseInt(e.target.value) < 19){
            setAgeError("19세 이상만 사용 가능합니다!")
            setAgeValid(false);
        }else{
            setAgeError("")
            setAgeValid(true);
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
    
    // 비밀번호확인 유효성 검사
    const handlePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);

        if(password !== e.target.value){
            setPasswordCheckError("비밀번호가 일치하지 않습니다.")
            setPasswordCheckValid(false);
        }else{
            setPasswordCheckError("")
            setPasswordCheckValid(true);
        }
    }

    useEffect(() => {
        if(nameValid && idValid && emailValid && ageValid && passwordValid && passwordCheckValid){
            setnotAllow(false); // 조건을 만족할 경우 제출버튼 활성화
            return;
        } 
        setnotAllow(true);
    }, // 각 항목의 Valid값들이 변경될 때마다 useEffect실행됨
    [nameValid, idValid, emailValid, ageValid, passwordValid, passwordCheckValid]);
    

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = {
              username: id,
              password: password,
              passwordCheck: passwordCheck,
              name: name,
              email: email,
              age: age
            };

        await axios.post("http://localhost:8080/auth/signup", body);

        // 회원가입 성공 후 토큰 저장
        const { token } = response.data;
        localStorage.setItem('token', token);

          alert("회원가입 성공");   
          navigate("/login");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 409) {
                alert('이미 존재하는 아이디입니다.')
            } else if (error.response.status === 400) {
                alert('비밀번호가 일치하지 않습니다.')
            } else {
                alert('회원가입에 실패했습니다.')
            }
          } else {
            console.error(error.message);
          }
        }
      };

    return (
        <Form method="post" onSubmit={handleSubmit}>
            <InputContainer>
            <h3 id="title">회원가입 페이지</h3>
            
            <input type="text" value={name} 
                onChange={handleName} 
                placeholder="이름을 입력해주세요"/>
            <div className="error">{nameError}</div>

            <input type="text" value={id} 
                onChange={handleId}
                placeholder="아이디를 입력해주세요"/>
            <div className="error">{idError}</div>

            <input type="email" value={email} 
                onChange={handleEmail}
                placeholder="이메일을 입력해주세요"/>
            <div className="error">{emailError}</div>

            <input type="age" value={age} 
                onChange={handleAge}
                placeholder="나이를 입력해주세요"/>
            <div className="error">{ageError}</div>

            <input type="password" value={password} 
                onChange={handlePassword}
                placeholder="비밀번호를 입력해주세요"/>
            <div className="error">{passwordError}</div>
            
            <input type="password" value={passwordCheck} 
                onChange={handlePasswordCheck}
                placeholder="비밀번호 확인"/>
            <div className="error">{passwordCheckError}</div>

            <button disabled={notAllow}>제출하기</button> 

            <div className="isIdCheck">
                <span>이미 아이디가 있으신가요?</span> 
                <span onClick={()=>{navigate('/login')}} style={ {fontWeight: 'bold'} }>로그인 페이지로 이동하기</span>
            </div>
            </InputContainer> 
        </Form> 
        // button 요소의 기본타입이 submit. 평범한 버튼 만드려면 type="button 속성명시 
    )
}

export default Signup;