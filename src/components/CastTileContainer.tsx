import { useEffect, useState } from "react"
import useWindowSize from "../hooks/useWindowSize"
import { ICast, IHue } from "../Interfaces"
import CastTile from "./CastTile"

interface ICastTileContainerProps {
    cast:ICast[]|undefined,
    hue:IHue,
    showData: boolean
}

export default function CastTileContainer(props: ICastTileContainerProps) {
    
    const windowSize = useWindowSize()
    
    const [numberToShow, setNumberToShow] = useState(windowSize.width > 1000 ? 6 : 4)
    const [isHoveringMore, setIsHoveringMore] = useState(false)
    const placeholderArray = new Array(numberToShow).fill(undefined)
    const castArray = props.cast === undefined ? new Array(numberToShow).fill(undefined) : props.cast.slice(0,numberToShow)
    const [castPage, setCastPage] = useState(1)

    
    let visibleTiles = props.cast?.slice(numberToShow*castPage - numberToShow ,Math.min(numberToShow*castPage,props.cast?.length??0)).length??0
    console.log(props.cast?.length,Math.min(numberToShow*castPage,props.cast?.length??0))
    let blankTileCount = numberToShow - visibleTiles

    // let blankTiles = new Array(blankTileCount).fill(" ")
    console.log(blankTileCount)
    console.log(visibleTiles)

    useEffect(()=> {
        if (numberToShow === 6 && windowSize.width <= 1000) {
            setNumberToShow(4)
        } else if (numberToShow === 4 && windowSize.width > 1000) {
            setNumberToShow(6)
            
        }
    },[windowSize])

    function tryCastPage(page:number) {
        if (props.cast === undefined) return

        if (page <= 0) return
        if (page > Math.ceil(props.cast.length/numberToShow)) return

        setCastPage(page)

    }

    let canGoNext = castPage < Math.ceil((props.cast?.length??0)/numberToShow)
    let canGoPrev = castPage > 1


    function showCastTiles() {
        if (props.cast === undefined) return

        return props.cast.slice(numberToShow*castPage - numberToShow ,numberToShow*castPage).map((castMember, index) => {
            return <CastTile key={castMember?.name??index} castMember={castMember} hue={props.hue} showData={props.showData}/>  
        })
    }

    function showBlankTiles() {
        return blankTileCount > 0 && Array(blankTileCount).fill(undefined).map((item) => {
            return <div style={{backgroundColor:'#f7f7f7', minHeight:103, borderRadius:10}}/>
        })
    }

    return (
        <div>
            <div style={{display:'grid', gridTemplateColumns:windowSize.width > 1000 ? '1fr 1fr 1fr' : '1fr 1fr', gap:10}}>

                { showCastTiles() }

                { showBlankTiles() }

            </div>

            <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:20, paddingTop:5}}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{transform:'rotate(180deg)',color:canGoPrev ? '' : 'grey', cursor:canGoPrev ? 'pointer' : 'default'}} onClick={()=>tryCastPage(castPage-1)} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 4L17 12L9 20" style={{strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round', stroke:'currentcolor'}}/>
                </svg>
                <p>{castPage}/{Math.ceil((props.cast?.length??0)/numberToShow)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" style={{color:canGoNext ? '' : 'grey', cursor:canGoNext ? 'pointer' : 'default'}} onClick={()=>tryCastPage(castPage+1)} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 4L17 12L9 20" style={{strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round', stroke:'currentcolor'}}/>
                </svg>

                {/* { props.cast !== undefined && props.cast.length > numberToShow &&
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
                } */}

            </div>
        </div>
    )
}