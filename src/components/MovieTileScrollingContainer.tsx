import { IMovie } from "../Interfaces";
import MovieTile from "./MovieTile";

interface IMovieTileScrollingContainer {
    movies:IMovie[]|undefined,
}

export default function MovieTileScrollingContainer(props:IMovieTileScrollingContainer) {
    const movieArray = props.movies === undefined ? new Array(6).fill(undefined) : props.movies


    return (
        <div>
            <div style={{display:'flex', columnGap:10, overflowX:'scroll', scrollPadding:'0px 15px'}}>
                <div style={{width:5, flex:'0 0 auto'}}/>
                {movieArray.map((movie, index) => {
                    return (
                        <div key={index} style={{flex:'0 0 auto', width:'40%'}}>
                            <MovieTile movie={movie}/>
                        </div>
                    )
                })}
                <div style={{width:5, flex:'0 0 auto'}}/>
            </div>
        </div>
    )
}