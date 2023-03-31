import { useNavigate } from "react-router-dom"
import { IMovie } from "../Interfaces"

interface IMovieTileProps {
    movie:IMovie
}


export default function MovieTile(props:IMovieTileProps) {
    const navigate = useNavigate()
    return (
        <div>
            <img
                src={`https://image.tmdb.org/t/p/w${200}${props.movie.posterPath}?dummy=parameter`}
                alt={props.movie.title}
                style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:10}}
                onClick={()=>navigate(`/movie/${props.movie.movieId}`)}
            />
        </div>



        // <div style={{backgroundColor:'red', width:'100%', aspectRatio:'2/3', borderRadius:10, position:'relative'}}>
        // </div>
    )
}