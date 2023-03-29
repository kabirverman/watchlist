import { IMovie } from "../Interfaces"
import MovieTile from "./MovieTile"

interface IMovieTileContainerProps {
    movies:IMovie[],
    tilesPerRow:number
}

export default function MovieTileContainer(props:IMovieTileContainerProps) {


    let watchlists = new Array(2).fill(" ")

    // let filledTileCount = props.movies.length + 1
    let blankTileCount = props.tilesPerRow - (props.movies.length % props.tilesPerRow)
    if (blankTileCount === props.tilesPerRow && props.movies.length >= props.tilesPerRow) blankTileCount = 0
    let blankTiles = new Array(blankTileCount).fill(" ")

    

    return (
        <div className="movieTileContainer-container" style={{gridTemplateColumns:`repeat(${props.tilesPerRow}, minmax(0,1fr))`}}>
            {props.movies.map((movie, index) => {
                return <MovieTile key={index} movie={movie}/>
            })}

            {blankTiles.map((blankTile, index) => {
                return <div key={index} style={{backgroundColor:'grey', width:'100%', aspectRatio:'2/3', borderRadius:10}} />
            })}

        </div>
    )
}