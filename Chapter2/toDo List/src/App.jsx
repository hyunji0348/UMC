import React, { useState } from 'react';

function App() {
  const [todoInput, setTodoInput] = useState(''); // Todo 입력 상태
  const [todos, setTodos] = useState([]); // Todo 리스트 상태

  // Todo 추가 함수
  const addTodo = () => {
    if (todoInput.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        content: todoInput.trim(),
        isDone: false
      };
      setTodos([...todos, newTodo]);
      setTodoInput(''); // 입력창 초기화
    }
  };

  // Todo 완료 함수
  const completeTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isDone: true } : todo
    ));
  };

  // Todo 삭제 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>UMC Study Plan</h1>
      <hr />
      <div className="input-container">
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="스터디 계획을 작성해보세요!"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
      </div>
      <div className="todo-list">
        <h2>해야 할 일</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.content}
              {!todo.isDone && (
                <button onClick={() => completeTodo(todo.id)}>완료</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="done-list">
        <h2>해낸 일</h2>
        <ul>
          {todos.map(todo => (
            todo.isDone && (
              <li key={todo.id}>
                {todo.content}
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
