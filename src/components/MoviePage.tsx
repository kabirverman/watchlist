import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import { fetchMovieDetails } from "../fetch"
import { IConfig, IHue } from "../Interfaces"
import configJson from "../config.json"
import { getEmoji } from "../utils/emoji"
import CastTileContainer from "./CastTileContainer"
import MovieTileContainer from "./MovieTileContainer"
import { useState } from "react"
import { getRandomHue } from "../utils/hues"


export default function MoviePage() {

    const config:IConfig = configJson as IConfig

    var { movieId } = useParams()
    movieId = movieId ?? ""

    const location = useLocation()
    let prefetchedHue:IHue | undefined = location.state?.prefetchedHue

    const {data, isLoading} = useQuery({queryKey: [movieId], queryFn: () => fetchMovieDetails(movieId!), enabled:true, refetchOnWindowFocus:false})
    const [hue, setHue] = useState<IHue>(prefetchedHue === undefined ? getRandomHue() : prefetchedHue)

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
    
    return (
        <div className="moviePage-container">
            <div className="pageContent" style={{color:hue.defaults.textSmall}}>
                <div style={{display:'grid', gridTemplateColumns:'min(300px, 30%) 1fr', gap:20}}>
                    <div className="moviePage-posterColumn">
                        <div style={{display:'flex', flexDirection:'column',backgroundColor:hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${hue.defaults.border}`, borderRadius:10}}>
                            <img
                                src={`https://image.tmdb.org/t/p/w${342}${data.posterPath}?dummy=parameter`}
                                alt={data.title}
                                style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:'10px 10px 0px 0px'}}
                            />
                            <div style={{borderRadius:'0px 0px 10px 10px', padding:'10px 15px', display:'grid', gridTemplateColumns:'1fr 1fr', justifyItems:'center', fontWeight:500}}>
                                <p>{calculateTime(data.runtime)}</p>
                                <p>{data.contentRating}</p>
                            </div>
                        </div>

                        <div style={{padding:'15px 10px', backgroundColor:hue.defaults.textLarge, textAlign:'center', borderRadius:10, fontWeight:600, color:'white'}}>
                            add to a watchlist
                        </div>
                    </div>

                    <div className="moviePage-contentColumn">

                        <div style={{display:'flex', flexDirection:'column', gap:10}}>
                            <div style={{padding:20, backgroundColor:hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${hue.defaults.border}`, borderRadius:10}}>
                                <h1 style={{margin:0, fontSize:32, color:hue.defaults.textLarge}}>{data.title}</h1>
                                <div style={{display:'flex', gap:20, fontWeight:500}}>
                                    <p>{data.year}</p>
                                    <p>|</p>
                                    <p>{data.genreIds.map(id => config.genres[id].name).join(" / ")}</p>
                                </div>
                            </div>

                            <div style={{padding:'10px 20px', backgroundColor:hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${hue.defaults.border}`, borderRadius:10, gap:20, display:'flex', fontWeight:500}}>
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

                        <div style={{padding:'10px 20px 20px 20px', backgroundColor:hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${hue.defaults.border}`, borderRadius:10, display:'flex', flexDirection:'column', gap:20}}>
                            <h3 style={{margin:0, fontSize:20, color:hue.defaults.textLarge}}>overview</h3>
                            <p>{data.overview}</p>
                        </div>

                        <div>
                            <CastTileContainer cast={data.cast} hue={hue}/>
                        </div>

                    </div>

                </div>



                <div style={{display:'flex', flexDirection:'column', gap:20}}>
                    <b style={{fontSize:20}}>similar movies</b>
                    <MovieTileContainer movies={data.similarMovies.slice(0,6)} tilesPerRow={6}/>
                </div>


            </div>

        </div>
    )
}