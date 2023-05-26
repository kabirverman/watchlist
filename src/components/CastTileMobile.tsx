import { useState } from "react"
import { ICastTileProps } from "./CastTile"



export default function CastTileMobile(props:ICastTileProps) {
    const [isImageFound, setIsImageFound] = useState(true)
    const [isImageLoaded, setIsImageLoaded] = useState(false)


    function showImage() {
        if (props.castMember === undefined) {
            return (
                <div className="placeholderGradientAnimation" style={{position:'absolute', backgroundColor:props.hue.defaults.textLarge, borderRadius:10, top:0, bottom:0, display:'flex', width:'100%',alignItems:'center', justifyContent:'center'}}/>
            )
        }

        if (isImageFound) {
            return (
                <div style={{position:'relative', width:'100%', height:'100%'}}>
                    <div style={{position:'absolute', borderRadius:'10px 0px 0px 10px', width:'100%', height:'100%', backgroundColor:props.hue.defaults.textSmall, opacity:isImageLoaded? 0 : 0.2, transition:`opacity ${500 + Math.random()*1000}ms`}} />
                    <img
                        className="starTile-image"
                        src={`https://image.tmdb.org/t/p/w200${props.castMember.posterPath}?dummy=parameter`}
                        alt={`${props.castMember.name}`}
                        style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:10, opacity:isImageLoaded? 1 : 0, transition:`opacity ${500 + Math.random()*1000}ms`}}
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
            <div style={{position:'absolute', backgroundColor:props.hue.defaults.textLarge, borderRadius:10, top:0, bottom:0, display:'flex', width:'100%',alignItems:'center', justifyContent:'center'}}>
                <p style={{textAlign:'center', color:'white', lineHeight:'16px'}}>no image</p>
            </div>
        )
    }



    
    return (
        <div style={{flex:'0 0 auto', width:'40%'}}>

            <div style={{position:'relative', aspectRatio:'2/3'}}>
                {/* {isImageFound 
                    ? <img
                    className="starTile-image"
                    src={`https://image.tmdb.org/t/p/w200${props.castMember.posterPath}?dummy=parameter`}
                    alt={`${props.castMember.name}`}
                    style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:10}}
                    // style={{maxWidth:'100%', maxHeight:'100%',width:'100%', objectFit:'cover', borderRadius:10,boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`, padding:1, boxSizing:'border-box'}}
                    // style={{borderRadius:10, width:'100%', height:'100%', objectFit:'cover',boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`, padding:1, boxSizing:'border-box'}}
                    onError={()=> {
                        console.log('oops')
                        setIsImageFound(false)
                        // setShouldShowPlaceholder(true)
                    }}
                    />
                    
                    : <div style={{position:'absolute', backgroundColor:props.hue.defaults.textLarge, borderRadius:10, top:0, bottom:0, display:'flex', width:'100%',alignItems:'center', justifyContent:'center'}}>
                    <p style={{textAlign:'center', color:'white', lineHeight:'16px'}}>no image</p>
                    </div>
                } */}

                {showImage()}
            </div>
            {props.castMember !== undefined && <p style={{fontWeight:600}}>{props.castMember.name}</p>}
            {/* <p style={{fontWeight:600}}>{props.castMember.name}</p> */}
            {props.castMember !== undefined && <p>as {props.castMember.character}</p>}
            {/* <p>as {props.castMember.character}</p> */}
        </div>
    )
}