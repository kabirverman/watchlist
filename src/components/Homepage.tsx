import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../fetch";
import useWindowSize, { IWindowSize } from "../hooks/useWindowSize";
import { IMovie, IWatchlist } from "../Interfaces";
import { getEmoji } from "../utils/emoji";
import { getRandomHue } from "../utils/hues";
import MovieTile from "./MovieTile";
import MovieTileContainer from "./MovieTileContainer";
import MovieTileScrollingContainer from "./MovieTileScrollingContainer";
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
    let numberToShow = 6

    if (windowSize.width <= 1000) numberToShow = 8

    return numberToShow
}






function Hero(props:{movies:IMovie[] | undefined}) {

    const [moviesToDisplay, setMoviesToDisplay] = useState<IMovie[]>(props.movies ? props.movies.slice(0,7) : new Array(7).fill({title:'loading', year:'loading', genreIds:[], voteAverage:0, posterPath:'loading', movieId:0, isWatched:false, dateAdded:0}))


    useEffect(() => {
        if (props.movies === undefined) return

        let shuffledMovies = shuffle([...props.movies])
        setMoviesToDisplay(shuffledMovies)
    },[props.movies])


    function shuffle(array:IMovie[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }



    
    return (
        <div className="homepageHero-container">
            <div className="pageContent homepageHero-containerContent">
                <div className="homepageHero-text" style={{display:'flex', flexDirection:'column'}}>
                    <h1 className="homepageHero-title">movie<br/>watchlist</h1>
                    <p className="homepageHero-slogan">lorem ipsum swagathy dorum flarp.</p>
                </div>
                
                <div className="homepageHero-imageContainer">
                    <div className="homepageHero-imageContent">

                        <div className="homepageHero-movieColumn" style={{height:'fit-content', transform:'translate(0px, 25%)'}}>
                            {moviesToDisplay.slice(0,2).map((movie, index) => {
                                if (movie.posterPath === 'loading') return <div key={index} style={{backgroundColor:'red', width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                return (
                                    <img
                                        key={movie.title}
                                        src={`https://image.tmdb.org/t/p/w${200}${movie.posterPath}?dummy=parameter`}
                                        alt={movie.title}
                                        style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover', borderRadius:10, boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.5)'}}
                                    />
                                )
                            })}
                        </div>

                        <div className="homepageHero-movieColumn">
                            {moviesToDisplay.slice(2,5).map((movie, index) => {
                                if (movie.posterPath === 'loading') return <div key={index} style={{backgroundColor:'red', width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                return (
                                    <img
                                        key={movie.title}
                                        src={`https://image.tmdb.org/t/p/w${200}${movie.posterPath}?dummy=parameter`}
                                        alt={movie.title}
                                        style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover', borderRadius:10, boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.5)'}}
                                    />
                                )
                            })}
                        </div>

                        <div className="homepageHero-movieColumn" style={{height:'fit-content', transform:'translate(0px, 25%)'}}>
                            {moviesToDisplay.slice(5,7).map((movie, index) => {
                                if (movie.posterPath === 'loading') return <div key={index} style={{backgroundColor:'red', width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                return (
                                    <img
                                        key={movie.title}
                                        src={`https://image.tmdb.org/t/p/w${200}${movie.posterPath}?dummy=parameter`}
                                        alt={movie.title}
                                        style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover', borderRadius:10, boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.5)'}}
                                    />
                                )
                            })}
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}



function WatchlistTileContainer(props:{tilesPerRow:number, watchlists:IWatchlist[]|undefined}) {

    // let watchlists:IWatchlist[] = [{uuid:'123', movies:{}}]
    if (props.watchlists === undefined) {
        return (
            <div className="homepage-watchlistContainer" style={{gridTemplateColumns:`repeat(${props.tilesPerRow}, 1fr)`}}>
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
                <div style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
            </div>
        )
    }

    let filledTileCount = props.watchlists.length + 1
    let blankTileCount = props.tilesPerRow - (filledTileCount % props.tilesPerRow)
    if (blankTileCount === filledTileCount && filledTileCount >= props.tilesPerRow) blankTileCount = 0
    let blankTiles = new Array(blankTileCount).fill(" ")

    let wandEmoji = getEmoji("🪄")

    // console.log(blankTileCount)
    
    return (
        <div className="homepage-watchlistContainer" style={{gridTemplateColumns:`repeat(${props.tilesPerRow}, 1fr)`}}>
            <div style={{backgroundColor:'#efefef', width:'100%', aspectRatio:'26/15', borderRadius:10, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', boxShadow:`inset 0px 0px 0px 1px #c9c9c9`, cursor:'pointer'}}>
                <img 
                    className="watchlistTile-emoji"
                    src={require(`../${wandEmoji.path}`)}
                    alt={wandEmoji.name}
                    style={{filter:'grayscale(1)'}}
                />
                <p className="watchlistTile-text" style={{color:'#747474'}}>create a watchlist</p>
            </div>
            {props.watchlists.map((watchlist, index) => {
                return <WatchlistTile key={index} watchlist={watchlist}/>
            })}

            {blankTiles.map((blankTile, index) => {
                return <div key={index} style={{backgroundColor:'#f7f7f7', width:'100%', aspectRatio:'26/15', borderRadius:10}} />
            })}

        </div>
    )
}





export default function Homepage() {

    const windowSize = useWindowSize()
    const movieTilesPerRow = calculateMovieTilesPerRow(windowSize)
    const moviesToShow = calculateMoviesToShow(windowSize)
    const watchlistTilesPerRow = calculateWatchlistTilesPerRow(windowSize)
    const {data, isLoading}  = useQuery({ queryKey: ["trendingMovies"], queryFn:fetchTrendingMovies, refetchOnWindowFocus: false})
    const [trendingMovies, setTrendingMovies] = useState<IMovie[]>(data?.slice(0, moviesToShow) ?? new Array(moviesToShow).fill({title:'loading', year:'loading', genreIds:[], voteAverage:0, posterPath:'loading', movieId:0, isWatched:false, dateAdded:0}))
    // console.log(moviesToDisplay)

    const [mockWatchlists, setMockWatchlists] = useState<IWatchlist[]>()

    

    useEffect(()=> {
        if (isLoading || !data) return

        setMockWatchlists([{name:'this is my super cool watchlist of movies', emoji:getEmoji("💀"), hue:getRandomHue(), uuid:'123', movies:{[data[0].movidId]:data[0]}},{name:'horror movies that slap', emoji:getEmoji("🤪"), hue:getRandomHue(), uuid:'123', movies:{[data[0].movidId]:data[0]}}])

        setTrendingMovies(data?.slice(0, moviesToShow))
    },[data])


    useEffect(()=> {
        if (isLoading || !data) return

        setTrendingMovies(data?.slice(0, moviesToShow))
    },[windowSize])

    
    

    console.count('>> Homepage Render')



    


    
    



    return (
        <div className="homepage-container">
            <Hero movies={data}/>
            <div className="pageContent">

                <div style={{display:'flex', flexDirection:'column', rowGap:20, marginTop:60}}>
                    <b style={{fontSize:20}}>your watchlists</b>
                    <WatchlistTileContainer tilesPerRow={watchlistTilesPerRow} watchlists={mockWatchlists}/>
                </div>


                <div style={{display:'flex', flexDirection:'column', rowGap:20}}>
                    <b style={{fontSize:20}}>trending movies</b>
                    {
                        windowSize.width > 500 &&
                        <MovieTileContainer movies={trendingMovies} tilesPerRow={movieTilesPerRow}/>
                    }
                    
                </div>

            </div>

            {windowSize.width <= 500 &&
                <div style={{marginTop:20}}>
                    <MovieTileScrollingContainer movies={trendingMovies} />
                </div>
            }
            <div style={{height:20}}/>
        </div>
    )
}