import { useRef, useState } from "react"
import { IWatchlist } from "../Interfaces"
import { getAllWatchlistEmojis, getEmoji } from "../utils/emoji"
import { getAllHues } from "../utils/hues"
import WatchlistEditModal from "./WatchlistEditModal"


interface IWatchlistAddTileMobileProps {
    // setWatchlists:React.Dispatch<React.SetStateAction<IWatchlist[]>>

}


export default function WatchlistAddTileMobile(props:IWatchlistAddTileMobileProps) {
    
    const [isCreatingNewWatchlist, setIsCreatingNewWatchlist] = useState(false)
    const [modalSize, setModalSize] = useState({width:0,height:0})
    let wandEmoji = getEmoji("🪄")

    return (
        <div>
            <div className="watchlistTile-container" style={{position:'relative',backgroundColor:'#efefef',  boxShadow:`inset 0px 0px 0px 1px #c9c9c9`,zIndex:3}}>
                <div
                    style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%'}}
                    onClick={()=>{
                        setIsCreatingNewWatchlist(true)
                    }}
                >
                    <img 
                        className="watchlistTile-emoji"
                        src={require(`../${wandEmoji.path}`)}
                        alt={wandEmoji.name}
                        style={{filter:'grayscale(1)'}}
                    />
                    <p className="watchlistTile-text" style={{color:'#747474'}}>create a watchlist</p>
                </div>
            </div>

            {isCreatingNewWatchlist &&
                <div style={{position:'absolute',top:0, left:0, width:'100%', zIndex:5}}>
                    <div className="modalBackground" style={{height:document.body.clientHeight}}/>
                    {/* <div style={{position:'absolute',top:(window.innerHeight - modalSize.height)/2 + window.scrollY,left:0, width:'100%', zIndex:6}}> */}
                    <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                        <WatchlistEditModal closeModal={()=>setIsCreatingNewWatchlist(false)}/>
                    </div>
                </div>
            }
        </div>
    )
}