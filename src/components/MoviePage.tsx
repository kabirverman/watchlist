import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import { fetchMovieDetails } from "../fetch"
import { IConfig, IHue } from "../Interfaces"
import configJson from "../config.json"
import { getEmoji } from "../utils/emoji"
import CastTileContainer from "./CastTileContainer"
import MovieTileContainer from "./MovieTileContainer"
import { useContext, useEffect, useState } from "react"
import { getRandomHue } from "../utils/hues"
import useWindowSize from "../hooks/useWindowSize"
import CastTileMobile from "./CastTileMobile"
import MovieTileScrollingContainer from "./MovieTileScrollingContainer"
import CastTileMobileScrollingContainer from "./CastTileMobileScrollingContainer"
import { Context } from "./MainProvider"
import AddMovieToWatchlistModal from "./WatchlistAddModal"
import WatchlistAddModal from "./WatchlistAddModal"


export default function MoviePage() {

    const config:IConfig = configJson as IConfig

    var { movieId } = useParams()
    movieId = movieId ?? ""

    const location = useLocation()
    // let prefetchedHue:IHue | undefined = location.state?.prefetchedHue

    const providerState = useContext(Context)


    const {data, isLoading} = useQuery({queryKey: [movieId], queryFn: () => fetchMovieDetails(movieId!), enabled:true, refetchOnWindowFocus:false})
    const [showAddMovieToWatchlistModal, setShowAddMovieToWatchlistModal] = useState(false)
    const [modalSize, setModalSize] = useState({width:0, height:0})
    const [isMoviePosterLoaded, setIsMoviePosterLoaded] = useState(false)

    // const [hue, setHue] = useState<IHue>(providerState.hue)
    const windowSize = useWindowSize()

    useEffect(()=> {
        // console.log('prefetched ==', prefetchedHue)
        // if (hue.hue !== providerState.hue.hue) {
        //     providerState.updateHue(hue)
        // }

        window.scrollTo(0,0)
    },[])


    // if (isLoading) {
    //     return <div>loading</div>
    // }

    // if (data === undefined) {
    //     return <div>error</div>
    // }


    function calculateTime(totalMinutes:number) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
      
        return `${hours}h${minutes}m`
    }


    function showTitleTile() {

        if (data === undefined || isLoading) {
            return (
                <div className="moviePage-titleTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`,gap:10}}>
                    {/* <h1 className="moviePage-titleTile-title placeholderGradientAnimation" style={{color:'transparent', width:'fit-content',backgroundColor:providerState.hue.defaults.textLarge, borderRadius:10}}>title of the movie here</h1> */}
                    <div className="placeholderGradientAnimation" style={{width:'min(400px,90%)', height:32, backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, borderRadius:8}}/>
                    <div className="moviePage-titleTile-info placeholderGradientAnimation" style={{marginTop:10,color:'transparent', width:'fit-content',backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, borderRadius:8, fontWeight:500}}>
                        <p>year goes here and genre as well</p>
                    </div>
                </div>
            )
        }

        

        let genreNames = data.genres.map(genre => genre.name)

        return (
            <div className="moviePage-titleTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                <h1 className="moviePage-titleTile-title" style={{color:providerState.hue.defaults.textLarge}}>{data.title}</h1>
                <div className="moviePage-titleTile-info" style={{display:'flex', gap:20, fontWeight:500}}>
                    <p>{data.year}</p>
                    <p>|</p>
                    <p>{genreNames.join(" / ")}</p>
                </div>
            </div>
        )
    }

    function showOverviewTile() {
        if (data === undefined || isLoading) {
            return (
                <div className="moviePage-overviewTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                    <h3 className="moviePage-overviewTile-title" style={{color:providerState.hue.defaults.textSmall, opacity:0.2}}>overview</h3>
                    <div className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, borderRadius:8, height:80}}/>
                </div>
            )
        }

        return (
            <div className="moviePage-overviewTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                <h3 className="moviePage-overviewTile-title" style={{color:providerState.hue.defaults.textLarge}}>overview</h3>
                <p>{data.overview}</p>
            </div>
        )
    }

    
    function showMoviePoster() {
        if (data === undefined || isLoading) {
            return <div className="moviePage-poster-image placeholderGradientAnimation" style={{aspectRatio:'2/3', height:'100%', backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2}}/>
        }

        return (
            <div style={{position:'relative', lineHeight:0,width:'100%', height:'100%',aspectRatio:'2/3'}}>
                <div style={{position:'absolute', width:'100%', height:'100%', borderRadius:'10px 10px 0px 0px',backgroundColor:providerState.hue.defaults.textSmall, opacity:isMoviePosterLoaded? 0 : 0.2,transition:`opacity ${500 + Math.random()*1000}ms`}} />
                <img
                    src={`https://image.tmdb.org/t/p/w${342}${data.posterPath}?dummy=parameter`}
                    alt={data.title}
                    className="moviePage-poster-image"
                    style={{width:'calc(100% - 2px)', marginLeft:1, opacity:isMoviePosterLoaded ? 1 : 0, transition:`opacity ${500 + Math.random()*1000}ms`}}
                    onLoad={()=>setIsMoviePosterLoaded(true)}
                />
            </div>
        )
    }



    
    return (
        <div className="moviePage-container">
            <div className="pageContent" style={{color:providerState.hue.defaults.textSmall}}>
                { windowSize.width > 500 &&
                    <div style={{display:'grid', gridTemplateColumns:'min(300px, 30%) 1fr', gap:20}}>
                        <div className="moviePage-posterColumn">
                            <div className="moviePage-poster-container" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                { showMoviePoster() }
                                
                                <div style={{borderRadius:'0px 0px 10px 10px', padding:'10px 15px', display:'grid', gridTemplateColumns:'1fr 1fr', justifyItems:'center', fontWeight:500}}>
                                    <p>{data === undefined || isLoading ? 'RUNTIME' : calculateTime(data.runtime)}</p>
                                    <p>{data === undefined || isLoading ? 'RATING' : data.contentRating}</p>
                                </div>
                            </div>

                            <div style={{padding:'15px 10px', backgroundColor:providerState.hue.defaults.textLarge, textAlign:'center', borderRadius:10, fontWeight:600, color:'white', cursor:'pointer'}} onClick={()=>setShowAddMovieToWatchlistModal(true)}>
                                add to a watchlist
                            </div>
                        </div>

                        <div className="moviePage-contentColumn">

                            <div style={{display:'flex', flexDirection:'column', gap:10}}>
                                {showTitleTile()}

                                <div className="moviePage-creatorTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                    <div style={{display:'flex', gap:10, alignItems:'center'}}>
                                        <img 
                                            className="watchlistTile-emoji"
                                            src={require(`../${getEmoji("🎬").path}`)}
                                            alt={getEmoji("🎬").name}
                                            style={{width:25,height:25}}
                                        />
                                        {data === undefined || isLoading ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>director name goes here</p> : <p>{data.creators.directors.join(", ")}</p>}
                                        
                                    </div>
                                    <div style={{display:'flex', gap:10, alignItems:'center'}}>
                                        <img 
                                            className="watchlistTile-emoji"
                                            src={require(`../${getEmoji("✏️").path}`)}
                                            alt={getEmoji("✏️").name}
                                            style={{width:25,height:25}}
                                        />
                                        {data === undefined || isLoading ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>writer names go here. swag money</p> : <p>{data.creators.writers.join(", ")}</p>}
                                        {/* <p>{data.creators.writers.join(", ")}</p> */}
                                    </div>
                                </div>
                            </div>

                            {showOverviewTile()}
                            

                            <div>
                                <CastTileContainer cast={data ? data.cast : undefined} hue={providerState.hue}/>
                            </div>

                        </div>

                    </div>
                }

                { windowSize.width <= 500 &&
                    <div style={{display:'flex', flexDirection:'column', gap:15}}>
                        {showTitleTile()}

                        <div style={{display:'grid', gridTemplateColumns:'175px 1fr', gap:10}}>
                            <div className="moviePage-poster-container" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                { showMoviePoster() }
 
                            </div>


                            <div style={{display:'flex',flexDirection:'column', gap:10}}>
                                <div className="moviePage-creatorTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                    <img 
                                        className="watchlistTile-emoji"
                                        src={require(`../${getEmoji("🎬").path}`)}
                                        alt={getEmoji("🎬").name}
                                        style={{width:25,height:25}}
                                    />
                                    {data === undefined || isLoading ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>director name goes here</p> : <p>{data.creators.directors.join(", ")}</p>}
                                    {/* <p>{data.creators.directors.join(", ")}</p> */}
                                </div>
                                <div className="moviePage-creatorTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                    <img 
                                        className="watchlistTile-emoji"
                                        src={require(`../${getEmoji("✏️").path}`)}
                                        alt={getEmoji("✏️").name}
                                        style={{width:25,height:25}}
                                    />
                                    {data === undefined || isLoading ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>writer names go here. swag money</p> : <p>{data.creators.writers.join(", ")}</p>}
                                    {/* <p>{data.creators.writers.join(", ")}</p> */}
                                </div>
                            </div>

                        </div>



                        <div style={{padding:'15px 10px', backgroundColor:providerState.hue.defaults.textLarge, textAlign:'center', borderRadius:10, fontWeight:600, color:'white'}} onClick={()=>setShowAddMovieToWatchlistModal(true)}>
                            add to a watchlist
                        </div>

                        {showOverviewTile()}

                        



                        

                    </div>
                }



                { windowSize.width > 500 &&
                    <div style={{display:'flex', flexDirection:'column', gap:20}}>
                        <b style={{fontSize:20}}>similar movies</b>
                        <MovieTileContainer movies={data ? data.similarMovies.slice(0,6) : undefined} isSingleRow={true} tilesPerRow={6}/>
                        {/* <MovieTileContainer movies={undefined} isSingleRow={true} tilesPerRow={6}/> */}

                    </div>

                }

                


                { showAddMovieToWatchlistModal && data !== undefined &&
                    <div style={{position:'absolute',top:0, left:0, width:'100%', zIndex:5}}>
                        <div className="modalBackground" style={{height:document.body.clientHeight}}/>
                        {/* <div style={{position:'absolute', top:(window.innerHeight - modalSize.height)/2 + window.scrollY, left:(window.innerWidth - modalSize.width)/2, zIndex:6}}> */}
                        <div className="addMovieToWatchlist-positioner" style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                            <WatchlistAddModal movie={data} closeModal={()=>setShowAddMovieToWatchlistModal(false)} setModalSize={setModalSize}/>
                        </div>
                    </div>

                }



            </div>

            { windowSize.width <= 500 &&
                <div style={{width:'100%', paddingTop:15,color:providerState.hue.defaults.textSmall}}>
                    <div style={{display:'flex', flexDirection:'column', gap:10, paddingTop:15}}>
                        <b style={{fontSize:20, paddingLeft:15}}>cast</b>
                        {/* <CastTileMobileScrollingContainer cast={data.cast.slice(0,20)} hue={providerState.hue}/> */}
                        <CastTileMobileScrollingContainer cast={data ? data.cast.slice(0,20) : undefined} hue={providerState.hue}/>
                    </div>

                    
                    <div style={{display:'flex', flexDirection:'column', gap:10, paddingTop:15}}>
                        <b style={{fontSize:20, paddingLeft:15}}>similar movies</b>
                        <MovieTileScrollingContainer movies={data ? data.similarMovies.slice(0,6) : undefined}/>
                    </div>

                </div>
            }

        </div>
    )
}