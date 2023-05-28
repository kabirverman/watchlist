import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IHue, IMovie } from "../Interfaces"
import { getRandomHue } from "../utils/hues"
import { Context } from "./MainProvider"
import MovieTile from "./MovieTile"

interface ISearchBarItemProps {
    // movie:IMovie,
    setIsFocusingSearch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBarItem(props:ISearchBarItemProps) {

    const [navigateToMoviePage, setNavigateToMoviePage] = useState(false)
    const [hue, setHue] = useState<IHue>(getRandomHue())
    const [titleWidth, setTitleWidth] = useState<number>(100 + Math.random()*200)
    const [detailsWidth, setDetailsWidth] = useState<number>(100 + Math.random()*100)
    const [isHovering, setIsHovering] = useState(false)

    // const getRandomHue()


    
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
                <div className="placeholderGradientAnimation" style={{width:50, aspectRatio:'2/3', borderRadius:5, backgroundColor:hue.defaults.textSmall, opacity:0.2}}/>
                
            </div>
            <div style={{color:isHovering ? hue.defaults.textSmall : 'black', display:'flex', flexDirection:'column', gap:5}}>
                {/* <p style={{fontWeight:600, fontSize:18}}>movie title</p> */}
                <div className="placeholderGradientAnimation" style={{backgroundColor:hue.defaults.textSmall, opacity:0.2,width:titleWidth, height:18, borderRadius:5}}/>
                <div className="placeholderGradientAnimation" style={{backgroundColor:hue.defaults.textSmall, opacity:0.2,width:detailsWidth, height:18, borderRadius:5}}/>
                {/* <p>1998 | genres</p> */}
            </div>
        </div>
    )
}