import { useContext, useLayoutEffect, useRef, useState } from "react";
import { IMovieDetails, IWatchlist } from "../Interfaces";
import { Context } from "./MainProvider";
import WatchlistEditModal from "./WatchlistEditModal";
import WatchlistSlimTile from "./WatchlistSlimTile";

interface IWatchlistAddModalProps {
    movie:IMovieDetails,
    closeModal:() => void,
    setModalSize: React.Dispatch<React.SetStateAction<{width: number,height: number}>>
    // watchlists:IWatchlist[],
    // setWatchlists:React.Dispatch<React.SetStateAction<IWatchlist[]>>,
}

export default function WatchlistAddModal(props:IWatchlistAddModalProps) {

    const providerState = useContext(Context)
    const modalRef = useRef<HTMLDivElement>(null)
    let reversedWatchlists = [...providerState.watchlists].reverse()
    const [showCreateWatchlistModal, setShowCreateWatchlistModal] = useState(false)


    useLayoutEffect(()=> {
        if (modalRef.current) {
            props.setModalSize({width:modalRef.current?.clientWidth,height:modalRef.current?.clientHeight})
        }
    },[])



    return (
        <div ref={modalRef} style={{backgroundColor:'white', borderRadius:10, margin:15, boxShadow:'0px 0px 15px rgba(0,0,0,0.25)', width:400}}>
            <div style={{padding:20, display:'flex', flexDirection:'column', gap:30, height:400}}>
                {showCreateWatchlistModal &&
                    <div style={{position:'absolute', right:0, top:0, transform:'translate(15px,-15px)', zIndex:1}}>
                        <WatchlistEditModal closeModal={()=>setShowCreateWatchlistModal(false)}/>
                    </div>
                }
                <div style={{display:'flex', justifyContent:'space-between', opacity:showCreateWatchlistModal ? 0.5 : 1}}>
                    <p style={{fontWeight:600, color:providerState.hue.defaults.textLarge}}>choose a watchlist to add it to</p>
                    <div className="watchlistAddModal-createButton" onClick={()=>setShowCreateWatchlistModal(true)}>
                        <p style={{fontWeight:600, color:providerState.hue.defaults.textLarge, fontSize:30}}>+</p>
                    </div>
                    
                </div>

                <div style={{display:'flex', flexDirection:'column', gap:10, opacity:showCreateWatchlistModal ? 0.5 : 1}}>
                    {reversedWatchlists.map((watchlist, index) => {
                        return (
                            <WatchlistSlimTile key={watchlist.uuid} watchlist={watchlist} watchlists={providerState.watchlists} index={reversedWatchlists.length - (index + 1)} movie={props.movie} updateWatchlists={providerState.updateWatchlists}/>
                        )
                    })}

                </div>

                <div
                    style={{alignSelf:'flex-end', borderRadius:10, backgroundColor:providerState.hue.defaults.textLarge,color:'white', padding:'5px 15px', fontWeight:500,cursor:'pointer', marginTop:'auto', opacity:showCreateWatchlistModal ? 0.5 : 1}}
                    onClick={props.closeModal}
                >
                    done
                </div>
            </div>
        </div>
    )
}