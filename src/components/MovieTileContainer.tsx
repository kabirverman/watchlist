import { useContext, useState } from "react"
import useWindowSize, { IWindowSize } from "../hooks/useWindowSize"
import { IMovie } from "../Interfaces"
import { Context } from "./MainProvider"
import MovieTile from "./MovieTile"

interface IMovieTileContainerProps {
    movies:IMovie[] | undefined,
    // isSingleRow:boolean,
    numberOfRows:number,
    tilesPerRow:number,
    manipulateMovieInWatchlist?: {
        toggleMovieWatchState: (movie: IMovie) => void;
        removeMovieFromWatchlist: (movie: IMovie) => void;
    }
}

export default function MovieTileContainer(props:IMovieTileContainerProps) {

    const providerState = useContext(Context)
    let watchlists = new Array(2).fill(" ")

    // let filledTileCount = props.movies.length + 1
    let movies = props.movies === undefined ? new Array(props.tilesPerRow).fill(undefined) : props.movies
    console.log(movies)
    let blankTileCount = props.tilesPerRow - (movies.length % props.tilesPerRow)
    if (blankTileCount === props.tilesPerRow && movies.length >= props.tilesPerRow) blankTileCount = 0
    let blankTiles = new Array(blankTileCount).fill(" ")

    const windowSize = useWindowSize()
    
    let tilesPerRow = calculateMovieTilesPerRow(windowSize)
    // const [tilesPerRow, setTilesPerRow] = useState(calculateMovieTilesPerRow(windowSize))
    // let movies = props.movies
    // if (props.isSingleRow) movies = movies.slice(0, tilesPerRow)
    if (props.numberOfRows !== 0) movies = movies.slice(0, props.numberOfRows*tilesPerRow)

    function calculateMovieTilesPerRow(windowSize:IWindowSize) {
        let tilesPerRow = 6
    
        if (windowSize.width <= 1000) tilesPerRow = 4
        if (windowSize.width <= 500) tilesPerRow = 3
    
    
        return tilesPerRow
    }

    return (
        <div className="movieTileContainer-container" style={{gridTemplateColumns:`repeat(${tilesPerRow}, minmax(0,1fr))`}}>
            {movies.map((movie, index) => {
                return <MovieTile key={index} movie={movie} manipulateMovieInWatchlist={props.manipulateMovieInWatchlist} isMobile={windowSize.width < 500}/>
            })}

            {blankTiles.map((blankTile, index) => {
                // return <div key={index} style={{backgroundColor:'#e7e7e7', width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                return <div key={index} style={{backgroundColor:providerState.hue.defaults.textSmall,opacity:0.1, width:'100%', aspectRatio:'2/3', borderRadius:10}} />
            })}

        </div>
    )
}