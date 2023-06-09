import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchMovieDetails } from "../fetch"
import { getEmoji } from "../utils/emoji"
import CastTileContainer from "./CastTileContainer"
import MovieTileContainer from "./MovieTileContainer"
import { useContext, useEffect, useRef, useState } from "react"
import { getHueFromRGB } from "../utils/hues"
import useWindowSize from "../hooks/useWindowSize"
import MovieTileScrollingContainer from "./MovieTileScrollingContainer"
import CastTileMobileScrollingContainer from "./CastTileMobileScrollingContainer"
import { Context } from "./MainProvider"
import WatchlistAddModal from "./WatchlistAddModal"
import ColorThief from "colorthief"


export default function MoviePage() {

    const colorThief = new ColorThief();

    var { movieId } = useParams()
    movieId = movieId ?? ""

    const providerState = useContext(Context)
    const {data, isLoading} = useQuery({queryKey: [movieId], queryFn: () => fetchMovieDetails(movieId!), enabled:true, refetchOnWindowFocus:false})
    const [showAddMovieToWatchlistModal, setShowAddMovieToWatchlistModal] = useState(false)
    const [isMoviePosterLoaded, setIsMoviePosterLoaded] = useState(false)
    const [showData, setShowData] = useState(!isLoading)
    const imageRef = useRef<HTMLImageElement>(null)
    const windowSize = useWindowSize()



    useEffect(()=> {
        window.scrollTo(0,0)

        if (isLoading) setShowData(false)

        const timer = setTimeout(() => setShowData(true), 500)

        return () => clearTimeout(timer)   
    },[data])

    


    function calculateTime(totalMinutes:number) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
      
        return `${hours}h${minutes}m`
    }



    function showTitleTile() {

        if (data === undefined || isLoading || !showData) {
            return (
                <div className="moviePage-titleTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                    <h1 className="moviePage-titleTile-title placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content',transform:'scale(1,0.7)'}}>The Title of the Movie Here</h1>
                    <div className="moviePage-titleTile-info" style={{display:'flex', gap:20, fontWeight:500}}>
                        <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>2023 | Action / Adventure / Sci-Fi</p>
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
        if (data === undefined || isLoading || !showData) {
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
        // return <div className="moviePage-poster-image placeholderGradientAnimation" style={{aspectRatio:'2/3', height:'100%', backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2}}/>
        if (data === undefined || isLoading || !showData) {
            return <div className="moviePage-poster-image placeholderGradientAnimation" style={{aspectRatio:'2/3', height:'100%', backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2}}/>
        }

        return (
            <div style={{position:'relative', lineHeight:0,width:'100%', height:'100%'}}>
                <div style={{width:'100%', height:'100%', aspectRatio:'2/3', borderRadius:'10px 10px 0px 0px',backgroundColor:providerState.hue.defaults.textSmall, opacity:isMoviePosterLoaded? 0 : 0.2,transition:`opacity ${500 + Math.random()*1000}ms`}} />
                {!showData && <div style={{position:'absolute', width:'100%', height:'100%', borderRadius:'10px 10px 0px 0px',backgroundColor:providerState.hue.defaults.textSmall, opacity:isMoviePosterLoaded? 0 : 0.2,transition:`opacity ${500 + Math.random()*1000}ms`}} />}
                <img
                    ref={imageRef}
                    crossOrigin="anonymous"
                    src={`https://image.tmdb.org/t/p/w${342}${data!.posterPath}?parameter=ok`}
                    alt={data!.title}
                    className="moviePage-poster-image"
                    style={{position:'absolute', top:0}}
                    // style={{width:'calc(100% - 2px)', marginLeft:1}}//, opacity:isMoviePosterLoaded ? 1 : 0, transition:`opacity ${500 + Math.random()*1000}ms`}}
                    onLoad={()=> {
                        setIsMoviePosterLoaded(true)
                        console.log('loaded')
                        // let rgb = colorThief.getColor(imageRef.current, 10)
                        // let grabbedHue = getHueFromRGB(rgb[0], rgb[1], rgb[2])
                        // providerState.updateHue(grabbedHue)
                    }}
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
                                    {data === undefined || isLoading || !showData ? <p style={{opacity:0}}>2h 20m</p> : <p>{calculateTime(data.runtime)}</p>}
                                    {data === undefined || isLoading || !showData ? <p style={{opacity:0}}>PG-13</p> : <p>{data.contentRating}</p> }
                                    
                                </div>
                            </div>

                            <div style={{padding:'15px 10px', backgroundColor:providerState.hue.defaults.textLarge, textAlign:'center', borderRadius:10, fontWeight:600, color:'white', cursor:'pointer'}} onClick={()=>setShowAddMovieToWatchlistModal(true)}>
                                add to a watchlist
                            </div>
                        </div>

                        <div className="moviePage-contentColumn">

                            <div style={{display:'flex', flexDirection:'column', gap:20}}>
                                {showTitleTile()}

                                <div className="moviePage-creatorTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                    <div style={{display:'flex', gap:10, alignItems:'center'}}>
                                        <img 
                                            className="watchlistTile-emoji"
                                            src={require(`../${getEmoji("🎬").path}`)}
                                            alt={getEmoji("🎬").name}
                                            style={{width:25,height:25}}
                                        />
                                        {data === undefined || isLoading || !showData ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>director name goes here</p> : <p>{data.creators.directors.join(", ")}</p>}
                                        
                                    </div>
                                    <div style={{display:'flex', gap:10, alignItems:'center'}}>
                                        <img 
                                            className="watchlistTile-emoji"
                                            src={require(`../${getEmoji("✏️").path}`)}
                                            alt={getEmoji("✏️").name}
                                            style={{width:25,height:25}}
                                        />
                                        {data === undefined || isLoading || !showData ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>writer names go here. swag money</p> : <p>{data.creators.writers.join(", ")}</p>}
                                    </div>
                                </div>
                            </div>

                            {showOverviewTile()}
                            

                            <div>
                                <CastTileContainer cast={data ? data.cast : undefined} hue={providerState.hue} showData={showData}/>
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
                                        style={{width:25,height:25, alignSelf:'flex-start'}}
                                    />
                                    { data === undefined || isLoading || !showData
                                        ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>director names go here. swag money</p>
                                        : <div style={{alignSelf:'flex-start'}}>
                                            {data?.creators.directors.map(director => <p key={director}>{director}</p>)}
                                        </div>
                                    }
                                </div>
                                <div className="moviePage-creatorTile" style={{backgroundColor:providerState.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.border}`}}>
                                    <img 
                                        className="watchlistTile-emoji"
                                        src={require(`../${getEmoji("✏️").path}`)}
                                        alt={getEmoji("✏️").name}
                                        style={{width:25,height:25, alignSelf:'flex-start'}}
                                    />
                                    { data === undefined || isLoading || !showData
                                        ? <p className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>writer names go here. swag money</p>
                                        : <div style={{alignSelf:'flex-start'}}>
                                            {data?.creators.writers.map(writer => <p key={writer}>{writer}</p>)}
                                        </div>
                                    }
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
                        <MovieTileContainer movies={data ? data.similarMovies.slice(0,6) : undefined} numberOfRows={1}/>

                    </div>

                }

                


                { showAddMovieToWatchlistModal && data !== undefined &&
                    <div style={{position:'absolute',top:0, left:0, width:'100%', zIndex:5}}>
                        <div className="modalBackground" style={{height:document.body.clientHeight}}/>
                        <div className="addMovieToWatchlist-positioner" style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                            <WatchlistAddModal movie={data} closeModal={()=>setShowAddMovieToWatchlistModal(false)}/>
                        </div>
                    </div>

                }



            </div>

            { windowSize.width <= 500 &&
                <div style={{width:'100%', paddingTop:15,color:providerState.hue.defaults.textSmall}}>
                    <div style={{display:'flex', flexDirection:'column', gap:10, paddingTop:15}}>
                        <b style={{fontSize:20, paddingLeft:15}}>cast</b>
                        <CastTileMobileScrollingContainer cast={data ? data.cast.slice(0,20) : undefined} hue={providerState.hue} showData={showData}/>
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