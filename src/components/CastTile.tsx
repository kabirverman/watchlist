import { useState } from "react"
import { ICast, IHue } from "../Interfaces"

export interface ICastTileProps {
    castMember:ICast,
    hue:IHue
}

export default function CastTile(props:ICastTileProps) {

    const [isImageFound, setIsImageFound] = useState(true)

    return (
        <div style={{display:'flex', backgroundColor:props.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`, borderRadius:10}}>
            <div style={{width:66, minHeight:100, flex: '0 0 auto', position:'relative'}}>
                {isImageFound 

                    ? <img
                        className="starTile-image"
                        src={`https://image.tmdb.org/t/p/w200${props.castMember.posterPath}?dummy=parameter`}
                        alt={`${props.castMember.name}`}
                        style={{borderRadius:'10px 0px 0px 10px', width:'100%', height:'100%', objectFit:'cover',boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`, padding:1, boxSizing:'border-box'}}
                        onError={()=> {
                            console.log('oops')
                            setIsImageFound(false)
                            // setShouldShowPlaceholder(true)
                        }}
                    />

                    : <div style={{position:'absolute', backgroundColor:props.hue.defaults.textLarge, borderRadius:'10px 0px 0px 10px', top:0, bottom:0, display:'flex', width:66,alignItems:'center', justifyContent:'center'}}>
                        <p style={{textAlign:'center', color:'white', lineHeight:'16px'}}>no image</p>
                    </div>
                }
                
            </div>
            <div style={{padding:10, color:props.hue.defaults.textSmall}}>
                <p style={{fontWeight:600}}>{props.castMember.name}</p>
                <p>as {props.castMember.character}</p>
            </div>
        </div>
    )
}