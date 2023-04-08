import { ICast, IHue } from "../Interfaces"
import CastTileMobile from "./CastTileMobile"

interface ICastTileMobileScrollingContainerProps {
    cast:ICast[],
    hue:IHue
}

export default function CastTileMobileScrollingContainer(props:ICastTileMobileScrollingContainerProps) {
    return (
        <div>
            <div style={{display:'flex', columnGap:10, overflowX:'scroll', scrollPadding:'0px 15px'}}>
                <div style={{width:5, flex:'0 0 auto'}}/>
                {props.cast.map((castMember, index) => {
                    return (
                        <div key={index} style={{flex:'0 0 auto', width:'40%'}}>
                            <CastTileMobile castMember={castMember} hue={props.hue}/>
                            <p style={{fontWeight:600}}>{castMember.name}</p>
                            <p>as {castMember.character}</p>
                        </div>
                    )
                })}
                <div style={{width:5, flex:'0 0 auto'}}/>
            </div>
        </div>
    )
}