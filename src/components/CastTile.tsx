import { useState } from "react"
import { ICast, IHue } from "../Interfaces"

export interface ICastTileProps {
    castMember:ICast|undefined,
    hue:IHue,
    showData: boolean
}

export default function CastTile(props:ICastTileProps) {

    const [isImageFound, setIsImageFound] = useState(true)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    function showImage() {
        if (props.castMember === undefined || !props.showData) {
            return (
                <div className="placeholderGradientAnimation castTile-image-placeholder" style={{backgroundColor:props.hue.defaults.textSmall}}/>
            )
        }

        if (isImageFound) {
            return (
                <div style={{position:'relative', width:'100%', height:'100%'}}>
                    {/* <div className="castTile-fadeDiv" style={{backgroundColor:props.hue.defaults.textSmall, opacity:isImageLoaded? 0 : 0.2, transition:`opacity ${500 + Math.random()*1000}ms`}} /> */}
                    <img
                        className="castTile-image"
                        src={`https://image.tmdb.org/t/p/w200${props.castMember.posterPath}?dummy=parameter`}
                        alt={`${props.castMember.name}`}
                        style={{boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`}}//, opacity:isImageLoaded? 1 : 0, transition:`opacity ${500 + Math.random()*1000}ms`}}
                        onError={() => setIsImageFound(false)}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            )
        }

        return (
            <div className="castTile-noImage" style={{backgroundColor:props.hue.defaults.border}}>
                <p style={{textAlign:'center', color:'white', lineHeight:'16px'}}>no image</p>
            </div>
        )
    }








    return (
        <div className="castTile-container" style={{backgroundColor:props.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${props.hue.defaults.border}`}}>
            <div style={{width:66, minHeight:103, flex: '0 0 auto', position:'relative'}}>
                {showImage()}
                
            </div>
            <div style={{padding:10, color:props.hue.defaults.textSmall}}>
                {props.castMember === undefined || !props.showData
                    ? <>
                        <p className="placeholderGradientAnimation palceholderText" style={{backgroundColor:props.hue.defaults.textSmall}}>castmember name</p>
                        <p className="placeholderGradientAnimation palceholderText" style={{backgroundColor:props.hue.defaults.textSmall, marginTop: 5}}>character name goes here</p>
                    </>

                    : <>
                        <p style={{fontWeight:600}}>{props.castMember.name}</p>
                        <p>as {props.castMember.character}</p>
                    </>
                }
            </div>
        </div>
    )
}