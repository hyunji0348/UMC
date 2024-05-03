import React, { useState } from 'react';
import './App.css'

function App() {
  const [todoInput, setTodoInput] = useState(''); // Todo 입력 상태
  const [todos, setTodos] = useState([]); // Todo 리스트 상태

  // Todo 추가 함수
  const addTodo = () => {
    if (todoInput.trim() !== '') { // 공백 문자 제거
      const newTodo = {  // 추가할 새로운 object생성(입력받은 텍스트 기반으로)
        id: Date.now(),
        content: todoInput,
        isDone: false
      };
      // 목록의 처음에 추가
      // let copy = [...todos];
      // copy.unshift(newTodo);
      // setTodos(copy);

      setTodos([...todos, newTodo]);  // 목록의 끝에 새로운 데이터 추가
      setTodoInput(''); // 입력창 초기화
    }
  };

  // Todo 완료 함수
  const completeTodo = (id) => {
    setTodos(todos.map(elementA =>  // elementA는 매개변수가 아니라 새로 지정한 변수
      elementA.id === id ? { ...elementA, isDone: true } : elementA
    ));
  };

  // Todo 삭제 함수
  const deleteTodo = (id) => {
    // filter()함수 -> 요소 하나하나씩 검사하며 조건 만족하는 요소들만으로 다시 배열 구성
    // value.id !== id를 만족하는 value만 저장
    setTodos(todos.filter(value => value.id !== id));  // 여기서 value값 역시 임시 변수
  }; 

  return (
    <div className="todo-container">
      <h1>UMC Study Plan</h1>
      <hr />
      <div className="input-container">
        <input  // 입력칸 버튼 설정
          type="text"
          value={todoInput}  // 입력하고 난 뒤 입력창 ('')으로 초기화
          onChange={(e) => setTodoInput(e.target.value)} // 입력값 e에 저장
          placeholder="UMC 스터디 계획을 작성해보세요!"
          onKeyDown={(e) => {   // 사용자가 enter키를 눌러 입력을 마무리하면
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
      </div>
      <div className="todo-list">
      <h2>해야 할 일</h2>
        <ul>
          {
            todos.map(function(element){
              return (
              !element.isDone && ( // isDone이 false인 값만 | 만약 조건만족X면 false반환
              <li>
                {element.content}
                <button onClick={() => completeTodo(element.id)}>완료</button>
              </li>
              ))
            })
          }
        </ul>
      </div>
      <div className="done-list">
        <h2>해낸 일</h2>
        <ul>
          {todos.map(element => ( 
            element.isDone && ( // isDone이 true인 값만
              <li>
                {element.content}
                <button onClick={() => deleteTodo(element.id)}>삭제</button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
