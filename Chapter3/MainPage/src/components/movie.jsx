import { useNavigate } from "react-router-dom";
const IMG_BASE_URL = "http://image.tmdb.org/t/p/w1280/";

function Movie(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${props.id}`,{// 해당 영화의 제목을 URL에 포함하여 이동
            state :{
                title: props.title,
                poster_path: props.poster_path,
                backdrop_path: props.backdrop_path,
                vote_average: props.vote_average,
                release_date: props.release_date,
                overview: props.overview
            }
        })
    };
    

    return (
        <div className='movie-container' onClick={handleClick}>
            <img src={IMG_BASE_URL + props.poster_path} alt='포스터'/>
            <div className='movie-info'>
                <h4>{props.title}</h4>
                <span>⭐{Math.floor(props.vote_average)}</span>
            </div>
        </div>
    );
}

export default Movie