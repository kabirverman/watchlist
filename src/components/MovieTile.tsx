import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate} from "react-router-dom"
import { IHue, IMovie, IWatchlist } from "../Interfaces"
import { getHueFromRGB, getRandomHue } from "../utils/hues"
import ColorThief from "colorthief"
import { Context } from "./MainProvider"
import { getEmoji } from "../utils/emoji"
import MovieTileWatchlistButtons from "./MovieTileWatchlistButtons"

const colorThief = new ColorThief();

interface IMovieTileProps {
    movie:IMovie | undefined,
    navigateToMoviePage?:boolean,
    returnHue?: (hue:IHue) => void,
    manipulateMovieInWatchlist?: {
        toggleMovieWatchState: (movie: IMovie) => void;
        removeMovieFromWatchlist: (movie: IMovie) => void;
    } | undefined,
    isMobile?:boolean,
}


export default function MovieTile(props:IMovieTileProps) {
    const navigate = useNavigate()
    const providerState = useContext(Context)

    const [isImageFound, setIsImageFound] = useState(true)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [hue, setHue] = useState(getRandomHue())
    const imageRef = useRef<HTMLImageElement>(null)

    const [isHovering, setIsHovering] = useState(false)

    const isOnWatchlist = true
    const [showDropdown, setShowDropdown] = useState(false)
    const [dropdownTranslate, setDropdownTranslate] = useState<number>(-100)
    const gearEmoji = getEmoji("⚙️")

    const crossMarkEmoji = getEmoji("❌")
    const eyeEmoji = getEmoji("👁️")
    

    useEffect(()=> {
        if (props.navigateToMoviePage && props.movie) {
            navigate(`/movie/${props.movie.movieId}`)
            providerState.updateHue(hue)
        }
    },[props.navigateToMoviePage])

    useEffect(()=> {
        if (showDropdown) setDropdownTranslate(0)
        else setDropdownTranslate(-100)
        
    },[showDropdown])


    function showWatchlistButtons() {
        if (!isOnWatchlist) return
        if (props.manipulateMovieInWatchlist === undefined) return
        if (props.movie === undefined) return

        if (!isHovering) return

        return (
            <MovieTileWatchlistButtons manipulateMovieInWatchlist={props.manipulateMovieInWatchlist} movie={props.movie}/>
        )
    }


    function showDropdownMenu() {
        if (!props.manipulateMovieInWatchlist || !props.isMobile) return
        const crossMarkEmoji = getEmoji("❌")
        const eyeEmoji = getEmoji("👁️")

        return (
            <>
                <div style={{position:'absolute', right:0, zIndex:1, marginTop:10, marginRight:5, cursor:'pointer', filter:showDropdown? '' : 'drop-shadow(0px 0px 2px black) drop-shadow(0px 0px 10px black)'}} onClick={()=>setShowDropdown(prev => !prev)}>
                    <svg style={{color:showDropdown? hue.defaults.textSmall : 'white', transform:'rotate(90deg) scale(1.25)'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="5.5" cy="12" r="1.5" fill="currentColor"/>
                        <circle cx="18.5" cy="12" r="1.5" fill="currentColor"/>
                        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    </svg>
                </div>

                <div style={{position:'absolute', backgroundColor:hue.defaults.panel, width:'100%', borderRadius:10, color:hue.defaults.textSmall, transform:`translate(0px, ${dropdownTranslate}%)`, transition:'transform 150ms ease-out', fontSize:14, fontWeight:500}}>
                    <div style={{padding:'45px 0px 0px 0px', display:'flex', flexDirection:'column'}}>
                        <div
                            style={{padding:'10px 10px 10px 10px', display:'flex', alignItems:'center', gap:5, backgroundColor:'rgba(0,0,0,0.05)', justifyContent:'space-evenly'}}
                            onClick={() => {
                                props.manipulateMovieInWatchlist?.toggleMovieWatchState(props.movie!)
                                setShowDropdown(false)
                            }}
                        >
                            <img src={require(`../${eyeEmoji.path}`)} alt={eyeEmoji.name} style={{width:20, height:20}} />
                            <p>{props.movie?.isWatched ? 'un-watch' : 'watched'}</p>
                        </div>

                        <div
                            style={{padding:'10px 10px 10px 10px', display:'flex', alignItems:'center', gap:5, justifyContent:'space-evenly'}}
                            onClick={() => {
                                props.manipulateMovieInWatchlist?.removeMovieFromWatchlist(props.movie!)
                                setShowDropdown(false)
                            }}
                        >
                            <img src={require(`../${crossMarkEmoji.path}`)} alt={crossMarkEmoji.name} style={{width:20, height:20}} />
                            <p>remove</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    function showImage() {
        // if (props.movie === undefined) {
        //     return (
        //         <div className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textSmall, opacity:0.1, borderRadius:10, width:'100%', aspectRatio:'2/3'}}/>
        //     )
        // }

        if (props.movie === undefined) {
            return <div className="moviePage-poster-image placeholderGradientAnimation" style={{aspectRatio:'2/3', height:'100%', backgroundColor:providerState.hue.defaults.textSmall, opacity:0.2}}/>
        }


        if (isImageFound) {
            return (
                <div style={{position:'relative', borderRadius:10, aspectRatio:'2/3', overflow:'hidden',boxShadow:`0px 0px 0px 1px ${hue.defaults.border}`}} onMouseOver={()=>setIsHovering(true)} onMouseOut={()=>setIsHovering(false)}>
                    {/* {
                        ((props.manipulateMovieInWatchlist && props.isMobile) || (showDropdown)) &&
                        <div style={{position:'absolute', right:0, zIndex:1, marginTop:10, marginRight:5, cursor:'pointer', filter:showDropdown? '' : 'drop-shadow(0px 0px 2px black) drop-shadow(0px 0px 10px black)'}} onClick={()=>setShowDropdown(prev => !prev)}>
                            <svg style={{color:showDropdown? hue.defaults.textSmall : 'white', transform:'rotate(90deg) scale(1.25)'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="5.5" cy="12" r="1.5" fill="currentColor"/>
                                <circle cx="18.5" cy="12" r="1.5" fill="currentColor"/>
                                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                            </svg>
                        </div>
                    } */}

                    {   props.isMobile 
                        ? showDropdownMenu()
                        : showWatchlistButtons()

                    }
                    {/* { showWatchlistButtons() }

                    { showDropdownMenu() } */}

                    
                    {/* { props.manipulateMovieInWatchlist && props.isMobile &&
                        <div style={{position:'absolute', backgroundColor:hue.defaults.panel, width:'100%', borderRadius:10, color:hue.defaults.textSmall, transform:`translate(0px, ${dropdownTranslate}%)`, transition:'transform 150ms ease-out'}}>
                            <div style={{padding:'45px 0px 0px 0px', display:'flex', flexDirection:'column'}}>
                                <div
                                    style={{padding:'5px 15px 5px 15px', display:'flex', alignItems:'center', gap:5, backgroundColor:'rgba(0,0,0,0.05)'}}
                                    onClick={() => {
                                        props.manipulateMovieInWatchlist?.toggleMovieWatchState(props.movie!)
                                        setShowDropdown(false)
                                    }}
                                >
                                    <img src={require(`../${gearEmoji.path}`)} alt={gearEmoji.name} style={{width:20, height:20}} />
                                    <p>watched</p>
                                </div>

                                <div
                                    style={{padding:'5px 15px 5px 15px', display:'flex', alignItems:'center', gap:5}}
                                    onClick={() => {
                                        props.manipulateMovieInWatchlist?.removeMovieFromWatchlist(props.movie!)
                                        setShowDropdown(false)
                                    }}
                                >
                                    <img src={require(`../${gearEmoji.path}`)} alt={gearEmoji.name} style={{width:20, height:20}} />
                                    <p>remove</p>
                                </div>
                            </div>
                        </div>
                    } */}


                    {/* <div style={{position:'absolute'}}> */}
                        
                        
                        
                    {/* </div> */}
                    
                    <div style={{pointerEvents:'none', position:'absolute', width:'100%', height:'100%', borderRadius:'10px 10px 0px 0px',backgroundColor:providerState.hue.defaults.textSmall, opacity:isImageLoaded? 0 : 0.2,transition:`opacity ${500 + Math.random()*1000}ms`}} />
                    <img
                        ref={imageRef}
                        crossOrigin="anonymous"
                        src={`https://image.tmdb.org/t/p/w${200}${props.movie.posterPath}?param=swag`}
                        alt={props.movie.title}
                        style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:10,cursor:'pointer'}}
                        onClick={()=>{
                            if (props.movie === undefined) return
                            navigate(`/movie/${props.movie.movieId}`)
                            providerState.updateHue(hue)
                        }}
                        onError={()=> {
                            console.log('oops')
                            setIsImageFound(false)
                            // setShouldShowPlaceholder(true)
                        }}
                        onLoad={()=> {
                            let rgb = colorThief.getColor(imageRef.current, 10)
                            let grabbedHue = getHueFromRGB(rgb[0], rgb[1], rgb[2])
                            setHue(grabbedHue)
                            if (props.returnHue) {
                                props.returnHue(grabbedHue)
                            }
                            setIsImageLoaded(true)
                        }}
                    />
                </div>
            )
        }

        return (
            <div className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textLarge, borderRadius:10, width:'100%', aspectRatio:'2/3'}}/>
        )
    }

    
    return (
        <div style={{boxSizing:'border-box', lineHeight:0}}>
            {showImage()}

            
        </div>



        // <div style={{backgroundColor:'red', width:'100%', aspectRatio:'2/3', borderRadius:10, position:'relative'}}>
        // </div>
    )
}