import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [num, a] = useState(0);
  function increase(){
    console.log(`increase가 클릭됨`);
    a(num+1);
  };
  function decrease(){
    console.log(`decrease가 클릭됨`);
    a(num-1);
  };
  return (
    <div className="App">
      <div className="counter">
        <h2 id = "number">{num}</h2>
        <button id = "increase" onClick={increase}>+1 </button>
        <button id = "decrease" onClick={decrease}>-1 </button>
        {/* <button id = "increase" onClick={()=>{console.log(`increase가 클릭됨`); a(num+1);}}>+1 </button>
        <button id = "decrease" onClick={()=>{console.log(`decrease가 클릭됨`); a(num-1);}}>-1 </button> */}
      </div>
    </div>
  );
}

export default App
