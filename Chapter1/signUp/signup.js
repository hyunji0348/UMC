function signUpCheck(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let age = document.getElementById('age').value;
    let password = document.getElementById('password').value;
    let passwordCheck = document.getElementById('passwordCheck').value;
    let check = false;

    // 이름 유효성 검사
    if(name===""){ // 입력값 없을때
        document.getElementById("nameError").innerHTML="필수 입력 항목입니다!";
        check = false;
    }else if(isNaN(name)){ // 문자열 입력
        document.getElementById("nameError").innerHTML="멋진 이름이네요!";
        check = true;
    }else{ // 문자열이 아닌 그 외의 모든 값들 입력시
        document.getElementById("nameError").innerHTML="이름은 문자열이어야 합니다.";
        check = false
    }
    alertColor(check, "nameError");


    // 이메일 유효성 검사
    if(email.includes('@')){
        let emailId = email.split('@')[0];
        let emailServer = email.split('@')[1];
        if(emailId === "" || emailServer === ""){
            document.getElementById("emailError").innerHTML="올바른 이메일 형식이 아닙니다!";
            check = false;
            }
        else if(!isNaN(emailId)){ // 이메일아이디가 문자열이 아닐시
            document.getElementById("emailError").innerHTML="올바른 이메일 형식이 아닙니다!";
            check = false;
        }
        else{
            document.getElementById("emailError").innerHTML="올바른 이메일 형식입니다!";
            check = true;   
        }
    }else{
        document.getElementById("emailError").innerHTML="올바른 이메일 형식이 아닙니다!";
        check = false;
    }
    alertColor(check, "emailError");

    
    // 나이 유효성 검사
    if(age === ""){
        document.getElementById("ageError").innerHTML="나이를 입력해 주세요!"
        check = false
    }else if(isNaN(age)){
        document.getElementById("ageError").innerHTML="나이는 숫자 형식이어야 합니다!"
        check = false
    }else if(parseInt(age) < 0){
        document.getElementById("ageError").innerHTML="나이는 음수가 될 수 없습니다!"
        check = false
    }else if(parseFloat(age) !== parseInt(age)){
        document.getElementById("ageError").innerHTML="나이는 소수가 될 수 없습니다!"
        check = false
    }else if(parseInt(age) < 19){
        document.getElementById("ageError").innerHTML="미성년자는 가입할 수 없습니다!"
        check = false
    }else{
        document.getElementById("ageError").innerHTML="올바른 나이 형식입니다!"
        check = true;
    }
    alertColor(check, "ageError");     


    // 비밀번호 유효성 검사
    if(!isNaN(password)){
        document.getElementById("passwordError").innerHTML="비밀번호는 문자열이어야 합니다."
        check = false
    }else if(password.length < 4){
        document.getElementById("passwordError").innerHTML="비밀번호는 최소 4자리 이상이어야 합니다."
        check = false
    }else if(password.length > 12){
        document.getElementById("passwordError").innerHTML="비밀번호는 최대 12자리까지 가능합니다."
        check = false
    }else if(!validatePassword(password)){
        document.getElementById("passwordError").innerHTML="영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다."
        check = false
    }
    else{
        document.getElementById("passwordError").innerHTML="올바른 비밀번호입니다!";
        check = true;
    }
    alertColor(check, "passwordError");


    // 비밀번호확인 유효성 검사
    if(passwordCheck === ""){
        document.getElementById("passwordCheckError").innerHTML="비밀번호가 일치하지 않습니다."
        check = false
    }else if(password !== passwordCheck){
        document.getElementById("passwordCheckError").innerHTML="비밀번호가 일치하지 않습니다."
        check = false;
    }else{
        document.getElementById("passwordCheckError").innerHTML="비밀번호가 일치합니다."
        check = true;
    }
    alertColor(check, "passwordCheckError");

    // 모달창 띄우기
    if (check) {
        document.getElementById("f2").submit="return true;"; // 유효성 검사 통과 시, 폼 제출

        const submit = document.getElementById('submit');
        const closeModal = document.getElementById('close');
        const modal = document.querySelector('.modal-wrapper');
    
        submit.addEventListener('click', function(){
            modal.style.display = "block";
        })
        closeModal.addEventListener('click', function(){
            modal.style.display = 'none';
        })
    }
}

// 경고창 텍스트 색깔 함수
function alertColor(check, errorId){ 
    if(check === true){
        document.getElementById(errorId).style.color = "green";
    }else
        document.getElementById(errorId).style.color = "red";
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