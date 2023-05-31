import { useQuery } from "@tanstack/react-query";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import { fetchTrendingMovies } from "../fetch";
import useWindowSize, { IWindowSize } from "../hooks/useWindowSize";
import { IHue, IMovie, IWatchlist } from "../Interfaces";
import { getEmoji } from "../utils/emoji";
import { getRandomHue } from "../utils/hues";
import HomepageHero from "./HomepageHero";
import { Context } from "./MainProvider";
import MovieTile from "./MovieTile";
import MovieTileContainer from "./MovieTileContainer";
import MovieTileScrollingContainer from "./MovieTileScrollingContainer";
import WatchlistAddTile from "./WatchlistAddTile";
import WatchlistAddTileMobile from "./WatchlistAddTileMobile";
import WatchlistTile from "./WatchlistTile";


function calculateMovieTilesPerRow(windowSize:IWindowSize) {
    let tilesPerRow = 6

    if (windowSize.width <= 1000) tilesPerRow = 4
    if (windowSize.width <= 500) tilesPerRow = 10


    return tilesPerRow
}

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





// function MemoizedHero(props:IHeroProps) {
//     return useMemo(() => <Hero {...props} />, [props.movies])
// }

// const MemoizedHero = memo(Hero, (prevProps, nextProps) => {
//     console.log(prevProps.movies, nextProps.movies)
//     if (prevProps.movies === undefined && nextProps.movies === undefined) return true
//     if (prevProps.movies === undefined || nextProps.movies === undefined) return false
//     if (prevProps.movies.length !== nextProps.movies.length) return false
//     return true
// })


interface IWatchlistTileContainerProps {
    // watchlists:IWatchlist[] | undefined,
    // setWatchlists:React.Dispatch<React.SetStateAction<IWatchlist[]>>,
    tilesPerRow:number,
    isMobile:boolean
}


function WatchlistTileContainer(props:IWatchlistTileContainerProps) {

    const providerState = useContext(Context)

    // let watchlists:IWatchlist[] = [{uuid:'123', movies:{}}]
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


    let wandEmoji = getEmoji("🪄")

    // console.log(blankTileCount)

    let reversedWatchlists = [...providerState.watchlists].reverse()
    
    return (
        <div className="homepage-watchlistContainer" style={{gridTemplateColumns:`repeat(${props.tilesPerRow}, 1fr)`}}>
            {/* <div style={{backgroundColor:'#efefef', width:'100%', aspectRatio:'26/15', borderRadius:10, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', boxShadow:`inset 0px 0px 0px 1px #c9c9c9`, cursor:'pointer'}}>
                <img 
                    className="watchlistTile-emoji"
                    src={require(`../${wandEmoji.path}`)}
                    alt={wandEmoji.name}
                    style={{filter:'grayscale(1)'}}
                />
                <p className="watchlistTile-text" style={{color:'#747474'}}>create a watchlist</p>
            </div> */}
            { props.isMobile
                ? <WatchlistAddTileMobile/>
                : <WatchlistAddTile/>

            }
            {/* <WatchlistAddTile setWatchlists={props.setWatchlists} /> */}
            
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
    // const movieTilesPerRow = calculateMovieTilesPerRow(windowSize)
    const moviesToShow = calculateMoviesToShow(windowSize)
    const watchlistTilesPerRow = calculateWatchlistTilesPerRow(windowSize)
    const {data, isLoading}  = useQuery({ queryKey: ["trendingMovies"], queryFn:fetchTrendingMovies, refetchOnWindowFocus: false, staleTime:60000})
    const [trendingMovies, setTrendingMovies] = useState<IMovie[]|undefined>(data?.slice(0, moviesToShow) ?? new Array(moviesToShow).fill(undefined))
    // console.log(moviesToDisplay)

    const [mockWatchlists, setMockWatchlists] = useState<IWatchlist[]>()

    



    useEffect(()=> {
        if (isLoading || !data) return

        setMockWatchlists([{name:'this is my super cool watchlist of movies', emoji:getEmoji("💀"), hue:getRandomHue(), uuid:'123', movies:{[data[0].movieId]:data[0]}},{name:'horror movies that slap', emoji:getEmoji("🤪"), hue:getRandomHue(), uuid:'123', movies:{[data[0].movieId]:data[0]}}])

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
                    {
                        // windowSize.width > 500 &&
                        <MovieTileContainer movies={trendingMovies} numberOfRows={2}/>
                    }
                    
                </div>

            </div>

            {/* {windowSize.width <= 500 &&
                <div style={{marginTop:20}}>
                    <MovieTileScrollingContainer movies={trendingMovies} />
                </div>
            } */}
            <div style={{height:20}}/>
        </div>
    )
}