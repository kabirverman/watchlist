import { useContext, useRef, useState } from "react"
import { useNavigate} from "react-router-dom"
import { IMovie } from "../Interfaces"
import { getHueFromRGB, getRandomHue } from "../utils/hues"
import ColorThief from "colorthief"
import { Context } from "./MainProvider"

const colorThief = new ColorThief();

interface IMovieTileProps {
    movie:IMovie
}


export default function MovieTile(props:IMovieTileProps) {
    const navigate = useNavigate()
    const providerState = useContext(Context)


    const [hue, setHue] = useState(getRandomHue())
    const imageRef = useRef<HTMLImageElement>(null)


    
    return (
        <div style={{boxSizing:'border-box'}}>
            {
                props.movie.posterPath  === "loading"
                ? <div></div>

                : <img
                    ref={imageRef}
                    crossOrigin="anonymous"
                    src={`https://image.tmdb.org/t/p/w${200}${props.movie.posterPath}`}
                    alt={props.movie.title}
                    style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:10,cursor:'pointer',boxShadow:`0px 0px 0px 1px ${hue.defaults.border}`}}
                    onClick={()=>{
                        navigate(`/movie/${props.movie.movieId}`)
                        providerState.updateHue(hue)
                    }}
                    onLoad={()=> {
                        let rgb = colorThief.getColor(imageRef.current, 10)
                        let grabbedHue = getHueFromRGB(rgb[0], rgb[1], rgb[2])
                        setHue(grabbedHue)
                    }}
                />
            }
        </div>



        // <div style={{backgroundColor:'red', width:'100%', aspectRatio:'2/3', borderRadius:10, position:'relative'}}>
        // </div>
    )
}