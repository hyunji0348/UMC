const IMG_BASE_URL = "http://image.tmdb.org/t/p/w1280/";

function Movie(props) {
    return (
      <div className='movie-container'>
        <img src={IMG_BASE_URL + props.poster_path} alt='포스터'/>
        <div className='movie-info'>
            <h4>{props.title}</h4>
            <span>⭐{props.vote_average}</span>
        </div>
      </div>
    )
  }
  
  export default Movie