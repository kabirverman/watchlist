import { ICast, IHue } from "../Interfaces"
import CastTileMobile from "./CastTileMobile"

interface ICastTileMobileScrollingContainerProps {
    cast:ICast[]|undefined,
    hue:IHue,
    showData: boolean
}

export default function CastTileMobileScrollingContainer(props:ICastTileMobileScrollingContainerProps) {
    const castArray = props.cast === undefined ? new Array(6).fill(undefined) : props.cast


    return (
        <div>
            <div style={{display:'flex', columnGap:10, overflowX:'scroll', scrollPadding:'0px 15px'}}>
                <div style={{width:5, flex:'0 0 auto'}}/>
                {castArray.map((castMember, index) => <CastTileMobile key={index} castMember={castMember} hue={props.hue} showData={props.showData}/> )}
                <div style={{width:5, flex:'0 0 auto'}}/>
            </div>
        </div>
    )
}