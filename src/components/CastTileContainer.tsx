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
    const [castPage, setCastPage] = useState(1)

    
    let visibleTiles = props.cast?.slice(numberToShow*castPage - numberToShow, Math.min(numberToShow*castPage,props.cast?.length??0)).length??0
    let blankTileCount = numberToShow - visibleTiles

    let canGoNext = castPage < Math.ceil((props.cast?.length??0)/numberToShow)
    let canGoPrev = castPage > 1


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



    function showCastTiles() {
        if (props.cast === undefined) {
            return Array(numberToShow).fill(undefined).map((item,index) => {
                
                return <CastTile key={index} castMember={undefined} hue={props.hue} showData={props.showData}/>  
            })
        }

        return props.cast?.slice(numberToShow*castPage - numberToShow ,numberToShow*castPage).map((castMember, index) => {
            // if (index < 3) return <CastTile key={index} castMember={undefined} hue={props.hue} showData={props.showData}/>  
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
            </div>
        </div>
    )
}