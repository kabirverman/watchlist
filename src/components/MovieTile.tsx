import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate} from "react-router-dom"
import { IHue, IMovie } from "../Interfaces"
import { getHueFromRGB, getRandomHue } from "../utils/hues"
import ColorThief from "colorthief"
import { Context } from "./MainProvider"

const colorThief = new ColorThief();

interface IMovieTileProps {
    movie:IMovie | undefined,
    navigateToMoviePage?:boolean,
    returnHue?: (hue:IHue) => void,
}


export default function MovieTile(props:IMovieTileProps) {
    const navigate = useNavigate()
    const providerState = useContext(Context)

    const [isImageFound, setIsImageFound] = useState(true)
    const [hue, setHue] = useState(getRandomHue())
    const imageRef = useRef<HTMLImageElement>(null)

    

    useEffect(()=> {
        if (props.navigateToMoviePage && props.movie) {
            navigate(`/movie/${props.movie.movieId}`)
            providerState.updateHue(hue)
        }
    },[props.navigateToMoviePage])


    function showImage() {
        if (props.movie === undefined) {
            return (
                <div className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textLarge, borderRadius:10, width:'100%', aspectRatio:'2/3'}}/>
            )
        }

        if (isImageFound) {
            return (
                <img
                    ref={imageRef}
                    crossOrigin="anonymous"
                    src={`https://image.tmdb.org/t/p/w${200}${props.movie.posterPath}?param=swag`}
                    alt={props.movie.title}
                    style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:10,cursor:'pointer',boxShadow:`0px 0px 0px 1px ${hue.defaults.border}`}}
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
                    }}
                />
            )
        }

        return (
            <div className="placeholderGradientAnimation" style={{backgroundColor:providerState.hue.defaults.textLarge, borderRadius:10, width:'100%', aspectRatio:'2/3'}}/>
        )
    }

    
    return (
        <div style={{boxSizing:'border-box'}}>
            {showImage()}

            
        </div>



        // <div style={{backgroundColor:'red', width:'100%', aspectRatio:'2/3', borderRadius:10, position:'relative'}}>
        // </div>
    )
}