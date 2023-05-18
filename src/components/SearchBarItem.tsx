import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IHue, IMovie } from "../Interfaces"
import { getRandomHue } from "../utils/hues"
import { Context } from "./MainProvider"
import MovieTile from "./MovieTile"

interface ISearchBarItemProps {
    movie:IMovie,
    setIsFocusingSearch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBarItem(props:ISearchBarItemProps) {

    const [navigateToMoviePage, setNavigateToMoviePage] = useState(false)
    const [hue, setHue] = useState<IHue>(getRandomHue())
    const [isHovering, setIsHovering] = useState(false)


    
    return (
        <div
            style={{display:'flex', padding:10, columnGap:10, borderBottom:'1px #efefef solid', cursor:'pointer', backgroundColor:isHovering ? hue.defaults.panel : 'white'}}
            onClick={()=>{
                setNavigateToMoviePage(true)
                props.setIsFocusingSearch(false)
            }}
            onMouseOver={()=>setIsHovering(true)}
            onMouseOut={()=>setIsHovering(false)}
        >
            <div style={{width:50, height:75}}>
                {   props.movie.posterPath === null 

                    ? <div style={{width:50, aspectRatio:'2/3', borderRadius:5, backgroundColor:'red'}}/>
                    // : <img
                    //     src={`https://image.tmdb.org/t/p/w200${props.movie.posterPath}`}
                    //     alt={props.movie.title}
                    //     style={{width:50, objectFit:'cover', borderRadius:5}}
                    // />
                    : <MovieTile movie={props.movie} navigateToMoviePage={navigateToMoviePage} returnHue={(newHue)=>setHue(newHue)}/>

                }
                
            </div>
            <div style={{color:isHovering ? hue.defaults.textSmall : 'black'}}>
                <p style={{fontWeight:600, fontSize:18}}>{props.movie.title}</p>

                <p>{props.movie.year} | {props.movie.genres.map((genre)=>genre.name).join(" / ")}</p>
            </div>
        </div>
    )
}