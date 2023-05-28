import { useState } from "react"
import { ICast, IHue } from "../Interfaces"

export interface ICastTileProps {
    castMember:ICast|undefined,
    hue:IHue
}

export default function CastTile(props:ICastTileProps) {

    const [isImageFound, setIsImageFound] = useState(true)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    function showImage() {
        if (props.castMember === undefined) {
            return (
                <div className="placeholderGradientAnimation" style={{position:'absolute', backgroundColor:props.hue.defaults.textSmall, opacity:0.2, borderRadius:'10px 0px 0px 10px', top:0, bottom:0, display:'flex', width:66,alignItems:'center', justifyContent:'center'}}/>
            )
        }

        if (isImageFound) {
            return (
                <div style={{position:'relative', width:'100%', height:'100%'}}>
                    <div style={{position:'absolute', borderRadius:'10px 0px 0px 10px', width:'100%', height:'100%', backgroundColor:props.hue.defaults.textSmall, opacity:isImageLoaded? 0 : 0.2, transition:`opacity ${500 + Math.random()*1000}ms`}} />
                    {/* { !isImageLoaded && <div style={{position:'absolute', borderRadius:'10px 0px 0px 10px', width:'100%', height:'100%', backgroundColor:props.hue.defaults.textSmall, opacity: 0.2}} /> } */}
                    <img
                        className="starTile-image"
                        src={`https://image.tmdb.org/t/p/w200${props.castMember.posterPath}?dummy=parameter`}
                        alt={`${props.castMember.name}`}
                        style={{borderRadius:'10px 0px 0px 10px', width:'100%', height:'100%', objectFit:'cover',boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`, padding:1, boxSizing:'border-box',opacity:isImageLoaded? 1 : 0, transition:`opacity ${500 + Math.random()*1000}ms`}}
                        onError={()=> {
                            console.log('oops')
                            setIsImageFound(false)
                            // setShouldShowPlaceholder(true)
                        }}
                        onLoad={()=> setIsImageLoaded(true)}
                    />
                </div>
            )
        }

        return (
            <div style={{position:'absolute', backgroundColor:props.hue.defaults.border, borderRadius:'10px 0px 0px 10px', top:0, bottom:0, display:'flex', width:66,alignItems:'center', justifyContent:'center'}}>
                <p style={{textAlign:'center', color:'white', lineHeight:'16px'}}>no image</p>
            </div>
        )
    }








    return (
        <div style={{display:'flex', backgroundColor:props.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`, borderRadius:10}}>
            <div style={{width:66, minHeight:100, flex: '0 0 auto', position:'relative'}}>
                {showImage()}
                
            </div>
            <div style={{padding:10, color:props.hue.defaults.textSmall}}>
                {props.castMember === undefined ? <p className="placeholderGradientAnimation" style={{backgroundColor:props.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content'}}>writer names</p> : <p style={{fontWeight:600}}>{props.castMember.name}</p>}
                {/* <p style={{fontWeight:600}}>{props.castMember.name}</p> */}
                {props.castMember === undefined ? <p className="placeholderGradientAnimation" style={{backgroundColor:props.hue.defaults.textSmall, opacity:0.2, color:'transparent', borderRadius:8, width:'fit-content', marginTop:5}}>writer names go here</p> : <p>as {props.castMember.character}</p>}
                {/* <p>as {props.castMember.character}</p> */}
            </div>
        </div>
    )
}