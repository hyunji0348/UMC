// import Movie from "./components/movie.jsx";
// import {movies} from './api.jsx';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import MainPage from './components/MainPage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import NowPlaying from './components/NowPlayingPage.jsx'
import Popular from './components/PopularPage.jsx'
import TopRated from './components/TopRatedPage.jsx'
import UpComing from './components/UpComing.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import DetailPage from "./components/MovieDetail";

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/popular" element={<Popular/>}/>
        <Route path="/nowplaying" element={<NowPlaying/>}/>
        <Route path="/toprated" element={<TopRated/>}/>
        <Route path="/upcoming" element={<UpComing/>}/>
        <Route path="*" element={<ErrorPage/>}/>
        <Route path="/movie/:id" element={<DetailPage/>}/>
      </Routes> 

      <Footer/>

    </div>
  );
}

export default App;