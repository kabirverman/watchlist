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


export default function MoviePage() {

    const config:IConfig = configJson as IConfig

    var { movieId } = useParams()
    movieId = movieId ?? ""

    const location = useLocation()
    // let prefetchedHue:IHue | undefined = location.state?.prefetchedHue

    const providerState = useContext(Context)

    const {data, isLoading} = useQuery({queryKey: [movieId], queryFn: () => fetchMovieDetails(movieId!), enabled:true, refetchOnWindowFocus:false})
    // const [hue, setHue] = useState<IHue>(providerState.hue)
    const windowSize = useWindowSize()

    useEffect(()=> {
        // console.log('prefetched ==', prefetchedHue)
        // if (hue.hue !== providerState.hue.hue) {
        //     providerState.updateHue(hue)
        // }

        window.scrollTo(0,0)
    },[])


    if (isLoading) {
        return <div>loading</div>
    }

    if (data === undefined) {
        return <div>error</div>
    }


    function calculateTime(totalMinutes:number) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
      
        return `${hours}h${minutes}m`
    }


    function showTitleTile() {
        if (data === undefined) return

        return (
            <div className="moviePage-titleTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                <h1 className="moviePage-titleTile-title" style={{color:providerState.hue.defaults.textLarge}}>{data.title}</h1>
                <div className="moviePage-titleTile-info" style={{display:'flex', gap:20, fontWeight:500}}>
                    <p>{data.year}</p>
                    <p>|</p>
                    <p>{data.genreIds.map(id => config.genres[id].name).join(" / ")}</p>
                </div>
            </div>
        )
    }

    function showOverviewTile() {
        if (data === undefined) return

        return (
            <div className="moviePage-overviewTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                <h3 className="moviePage-overviewTile-title" style={{color:providerState.hue.defaults.textLarge}}>overview</h3>
                <p>{data.overview}</p>
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
                                <img
                                    src={`https://image.tmdb.org/t/p/w${342}${data.posterPath}?dummy=parameter`}
                                    alt={data.title}
                                    className="moviePage-poster-image"
                                />
                                <div style={{borderRadius:'0px 0px 10px 10px', padding:'10px 15px', display:'grid', gridTemplateColumns:'1fr 1fr', justifyItems:'center', fontWeight:500}}>
                                    <p>{calculateTime(data.runtime)}</p>
                                    <p>{data.contentRating}</p>
                                </div>
                            </div>

                            <div style={{padding:'15px 10px', backgroundColor:providerState.hue.defaults.textLarge, textAlign:'center', borderRadius:10, fontWeight:600, color:'white'}}>
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
                                        <p>{data.creators.directors.join(", ")}</p>
                                    </div>
                                    <div style={{display:'flex', gap:10, alignItems:'center'}}>
                                        <img 
                                            className="watchlistTile-emoji"
                                            src={require(`../${getEmoji("✏️").path}`)}
                                            alt={getEmoji("✏️").name}
                                            style={{width:25,height:25}}
                                        />
                                        <p>{data.creators.writers.join(", ")}</p>
                                    </div>
                                </div>
                            </div>

                            {showOverviewTile()}
                            

                            <div>
                                <CastTileContainer cast={data.cast} hue={providerState.hue}/>
                            </div>

                        </div>

                    </div>
                }

                { windowSize.width <= 500 &&
                    <div style={{display:'flex', flexDirection:'column', gap:15}}>
                        {showTitleTile()}

                        <div style={{display:'grid', gridTemplateColumns:'175px 1fr', gap:10}}>
                            <div className="moviePage-poster-container" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w${342}${data.posterPath}?dummy=parameter`}
                                    alt={data.title}
                                    className="moviePage-poster-image"
                                />
                                {/* <div style={{borderRadius:'0px 0px 10px 10px', padding:'10px 15px', display:'grid', gridTemplateColumns:'1fr 1fr', justifyItems:'center', fontWeight:500}}>
                                    <p>{calculateTime(data.runtime)}</p>
                                    <p>{data.contentRating}</p>
                                </div> */}
                            </div>


                            <div style={{display:'flex',flexDirection:'column', gap:10}}>
                                <div className="moviePage-creatorTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                    <img 
                                        className="watchlistTile-emoji"
                                        src={require(`../${getEmoji("🎬").path}`)}
                                        alt={getEmoji("🎬").name}
                                        style={{width:25,height:25}}
                                    />
                                    <p>{data.creators.directors.join(", ")}</p>
                                </div>
                                <div className="moviePage-creatorTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                    <img 
                                        className="watchlistTile-emoji"
                                        src={require(`../${getEmoji("✏️").path}`)}
                                        alt={getEmoji("✏️").name}
                                        style={{width:25,height:25}}
                                    />
                                    <p>{data.creators.writers.join(", ")}</p>
                                </div>
                            </div>

                        </div>



                        <div style={{padding:'15px 10px', backgroundColor:providerState.hue.defaults.textLarge, textAlign:'center', borderRadius:10, fontWeight:600, color:'white'}}>
                            add to a watchlist
                        </div>

                        {showOverviewTile()}

                        



                        

                    </div>
                }



                { windowSize.width > 500 &&
                    <div style={{display:'flex', flexDirection:'column', gap:20}}>
                        <b style={{fontSize:20}}>similar movies</b>
                        <MovieTileContainer movies={data.similarMovies.slice(0,6)} isSingleRow={true} tilesPerRow={6}/>
                    </div>

                }



            </div>

            { windowSize.width <= 500 &&
                <div style={{width:'100%', paddingTop:15,color:providerState.hue.defaults.textSmall}}>
                    <div style={{display:'flex', flexDirection:'column', gap:10, paddingTop:15}}>
                        <b style={{fontSize:20, paddingLeft:15}}>cast</b>
                        <CastTileMobileScrollingContainer cast={data.cast.slice(0,20)} hue={providerState.hue}/>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', gap:10, paddingTop:15}}>
                        <b style={{fontSize:20, paddingLeft:15}}>similar movies</b>
                        <MovieTileScrollingContainer movies={data.similarMovies.slice(0,6)}/>
                    </div>

                </div>
            }

        </div>
    )
}