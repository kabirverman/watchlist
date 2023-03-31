import { useState } from "react"
import { ICast, IHue } from "../Interfaces"
import CastTile from "./CastTile"

interface ICastTileContainerProps {
    cast:ICast[],
    hue:IHue
}

export default function CastTileContainer(props: ICastTileContainerProps) {
    
    const [numberToShow, setNumberToShow] = useState(6)
    const [isHoveringMore, setIsHoveringMore] = useState(false)


    return (
        <div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10}}>
                {props.cast.slice(0,numberToShow).map((castMember, index) => {
                return (
                    <CastTile key={castMember.name} castMember={castMember} hue={props.hue}/>
                )   
                })}

            </div>

            <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:5, paddingTop:5}}>
                {/* <div  style={{backgroundColor:'black', height:1, width:'100%'}}/> */}
                { props.cast.length > numberToShow &&
                    <div style={{display:'flex', gap:2, cursor:'pointer', alignItems:'center'}}
                    onClick={()=>{setNumberToShow(numberToShow + 6)}}
                    onMouseOver={()=>setIsHoveringMore(true)}
                    onMouseOut={()=>setIsHoveringMore(false)}
                    >
                        <p style={{flexShrink:0, fontSize:14, color: isHoveringMore? 'black' : 'grey'}}>more</p>
                        <svg style={{width:15,height:15}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path style={{strokeWidth:1.5, stroke: isHoveringMore? 'black' : 'grey', strokeLinecap:'round', strokeLinejoin:'round'}} d="M4 8L12 16L20 8"/>
                        </svg>

                    </div>
                }
                {/* <div  style={{backgroundColor:'black', height:1, width:'100%'}}/> */}
            </div>
        </div>
    )
}