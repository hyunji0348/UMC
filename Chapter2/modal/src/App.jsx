import { useState } from 'react'
import './App.css'
import Modal from './components/Modal';

function App() {
  let [modal, setModal] = useState(false);

  return (
    <div className="App">
      <div className="counter">
        <h1>안녕하세요!</h1>
        <p>내용내용내용</p>
        <button id="open" onClick={()=>
          {console.log(`모달이 켜짐`);
          setModal(true)}}>버튼 열기</button>
     </div>
     {
      modal == true ? <Modal Modal={Modal} setModal={setModal}></Modal> : null
     }
    </div>
  );
}

export default App
