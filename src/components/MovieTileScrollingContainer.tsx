import { IMovie } from "../Interfaces";
import MovieTile from "./MovieTile";

interface IMovieTileScrollingContainer {
    movies:IMovie[],
}

export default function MovieTileScrollingContainer(props:IMovieTileScrollingContainer) {
    return (
        <div>
            <div style={{display:'flex', columnGap:10, overflowX:'scroll', scrollPadding:'0px 15px'}}>
                <div style={{width:5, flex:'0 0 auto'}}/>
                {props.movies.map((movie, index) => {
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