import React from 'react';
import TodoList from './components/TodoList';
import InputTodo from './components/InputTodo';
import './App.css';

function App() {
  return (
    <>
      <InputTodo />
      <TodoList />
    </>
  );
}

export default App;
