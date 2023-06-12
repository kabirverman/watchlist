import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { fetchTrendingMovies } from "../fetch";
import useWindowSize, { IWindowSize } from "../hooks/useWindowSize";
import { IMovie, IWatchlist } from "../Interfaces";
import HomepageHero from "./HomepageHero";
import { Context } from "./MainProvider";
import MovieTileContainer from "./MovieTileContainer";
import WatchlistAddTile from "./WatchlistAddTile";
import WatchlistAddTileMobile from "./WatchlistAddTileMobile";
import WatchlistTile from "./WatchlistTile";



function calculateWatchlistTilesPerRow(windowSize:IWindowSize) {
    let tilesPerRow = 4

    if (windowSize.width <= 1000) tilesPerRow = 3
    if (windowSize.width <= 500) tilesPerRow = 2

    return tilesPerRow
}

function calculateMoviesToShow(windowSize:IWindowSize) {
    let numberToShow = 12

    if (windowSize.width <= 1000) numberToShow = 8

    return numberToShow
}



interface IWatchlistTileContainerProps {
    tilesPerRow:number,
    isMobile:boolean
}


function WatchlistTileContainer(props:IWatchlistTileContainerProps) {

    const providerState = useContext(Context)
    if (providerState.watchlists === undefined) {
        return (
            <div className="homepage-watchlistContainer" style={{gridTemplateColumns:`repeat(${props.tilesPerRow}, 1fr)`}}>
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
            </div>
        )
    }

    let filledTileCount = providerState.watchlists.length + 1
    let blankTileCount = props.tilesPerRow - (filledTileCount % props.tilesPerRow)
    if (blankTileCount === props.tilesPerRow) blankTileCount = 0
    let blankTiles = new Array(blankTileCount).fill(" ")


    let reversedWatchlists = [...providerState.watchlists].reverse()
    

    return (
        <div className="homepage-watchlistContainer" style={{gridTemplateColumns:`repeat(${props.tilesPerRow}, 1fr)`}}>

            { props.isMobile ? <WatchlistAddTileMobile/> : <WatchlistAddTile/> }

            
            {reversedWatchlists.map((watchlist, index) => {
                return <WatchlistTile key={index} watchlist={watchlist}/>
            })}


            {blankTiles.map((blankTile, index) => {
                return <div key={index} style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
            })}

        </div>
    )
}







interface IHomepageProps {
    watchlists:IWatchlist[],
    setWatchlists:React.Dispatch<React.SetStateAction<IWatchlist[]>>,
}


export default function Homepage(props:IHomepageProps) {

    const providerState = useContext(Context)
    const windowSize = useWindowSize()
    const moviesToShow = calculateMoviesToShow(windowSize)
    const watchlistTilesPerRow = calculateWatchlistTilesPerRow(windowSize)
    const {data, isLoading}  = useQuery({ queryKey: ["trendingMovies"], queryFn:fetchTrendingMovies, refetchOnWindowFocus: false, staleTime:60000})
    const [trendingMovies, setTrendingMovies] = useState<IMovie[]|undefined>(data?.slice(0, moviesToShow) ?? new Array(moviesToShow).fill(undefined))

    



    useEffect(()=> {
        if (isLoading || !data) return

        setTrendingMovies(data?.slice(0, moviesToShow))
    },[data])


    useEffect(()=> {
        if (isLoading || !data) return

        setTrendingMovies(data?.slice(0, moviesToShow))
    },[windowSize])

    
    

    console.count('>> Homepage Render')



    

    return (
        <div className="homepage-container">
            <HomepageHero movies={data} hue={providerState.hue}/>
            <div className="pageContent">

                <div style={{display:'flex', flexDirection:'column', rowGap:20, marginTop:60}}>
                    <b style={{fontSize:20, color:providerState.hue.defaults.textLarge}}>your watchlists</b>
                    <WatchlistTileContainer isMobile={windowSize.width <= 500} tilesPerRow={watchlistTilesPerRow}/>
                </div>


                <div style={{display:'flex', flexDirection:'column', rowGap:20}}>
                    <b style={{fontSize:20, color:providerState.hue.defaults.textLarge}}>trending movies</b>
                    <MovieTileContainer movies={trendingMovies} numberOfRows={2}/>
                </div>

            </div>
        </div>
    )
}