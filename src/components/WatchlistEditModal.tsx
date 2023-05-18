import { useContext, useLayoutEffect, useRef, useState } from "react"
import { IHue, IWatchlist } from "../Interfaces"
import { getAllWatchlistEmojis, getEmoji } from "../utils/emoji"
import { getAllHues, getRandomHue } from "../utils/hues"
import { Context } from "./MainProvider"
import { v4 as uuidv4 } from 'uuid'

interface IWatchlistEditModalProps {
    watchlist?:IWatchlist,
    closeModal:()=>void,
    customWidth?:string,
    // setModalSize: React.Dispatch<React.SetStateAction<{width: number,height: number}>>
}


export default function WatchlistEditModal(props:IWatchlistEditModalProps) {

    const providerState = useContext(Context)
    const [watchlistEmoji, setWatchlistEmoji] = useState(props.watchlist ? props.watchlist.emoji : getAllWatchlistEmojis()[0])
    const [watchlistName, setWatchlistName] = useState(props.watchlist ? props.watchlist.name : "")
    const [watchlistHue, setWatchlistHue] = useState<IHue>(props.watchlist ? props.watchlist.hue : getRandomHue())
    const modalRef = useRef<HTMLDivElement>(null)
    
    // const [modalSize, setModalSize] = useState({width:modalRef.current?.clientWidth,height:modalRef.current?.clientHeight})

    // useLayoutEffect(()=> {
    //     if (modalRef.current) {
    //         props.setModalSize({width:modalRef.current?.clientWidth,height:modalRef.current?.clientHeight})
    //     }
    // },[])

    function handlePrimaryButtonClick() {
        if (props.watchlist) {

            let updatedWatchlists = providerState.watchlists.map((watchlist) => {
                if (watchlist.uuid === props.watchlist?.uuid) {
                    return {
                        ...watchlist,
                        name:watchlistName,
                        emoji:watchlistEmoji,
                        hue:watchlistHue
                    }
                } else {
                    return watchlist
                }
            })

            providerState.updateWatchlists(updatedWatchlists)
            props.closeModal()

            return
        }

        // props.setWatchlists(prevWatchlists => {
        //     let newWatchlist:IWatchlist = {
        //         uuid:uuidv4(),
        //         name:watchlistName,
        //         emoji:watchlistEmoji,
        //         hue:watchlistHue,
        //         movies:{}
        //     }

        //     let updatedWatchlists = [...prevWatchlists,newWatchlist]
        //     localStorage.setItem("watchlists", JSON.stringify(updatedWatchlists))

        //     return updatedWatchlists
        // })

        let newWatchlist:IWatchlist = {
            uuid:uuidv4(),
            name:watchlistName,
            emoji:watchlistEmoji,
            hue:watchlistHue,
            movies:{}
        }

        let updatedWatchlists = [...providerState.watchlists, newWatchlist]

        providerState.updateWatchlists(updatedWatchlists)
        props.closeModal()
        // setIsCreatingNewWatchlist(false)

    }

    function handleCancelButtonClick() {
        props.closeModal()
    }




    return (
        <div ref={modalRef} style={{backgroundColor:'white', borderRadius:10, margin:15, boxShadow:'0px 0px 15px rgba(0,0,0,0.25)'}}>
            <div style={{padding:20, display:'flex', flexDirection:'column', gap:20, width:props.customWidth ? props.customWidth : 'auto', boxSizing:'border-box'}}>
                <div className="watchlistEditModal-section">
                    <p className="watchlistEditModal-section-text">name</p>
                    <input
                        type="text"
                        style={{all:'unset', backgroundColor:'#F3F3F3',width:'100%', borderRadius:10, padding:10, boxSizing:'border-box'}}
                        value={watchlistName}
                        placeholder={props.watchlist ? props.watchlist.name : 'enter a watchlist name'}
                        onChange={(e)=>setWatchlistName(e.target.value)}
                    />
                </div>
                <div className="watchlistEditModal-section">
                    <p className="watchlistEditModal-section-text">color</p>
                    <div style={{display:'flex', gap:5}}>
                        {
                            getAllHues().map((hue)=>{
                                return (
                                    <div
                                        key={hue.hue}
                                        style={{
                                            // width:40,
                                            // height:40,
                                            flex:'1 0 auto',
                                            aspectRatio:1,
                                            // backgroundColor:hue.defaults.panel,
                                            backgroundColor:`hsl(${hue.hue}, 80%, 70%)`,
                                            boxShadow:watchlistHue===hue?`0px 0px 0px 1px ${hue.defaults.textLarge}`:'',
                                            borderRadius:20,
                                            cursor:'pointer',
                                            position:'relative'
                                        }}
                                        onClick={()=>setWatchlistHue(hue)}
                                    >
                                        { watchlistHue.hue === hue.hue &&
                                            <svg style={{ position:'absolute',color:hue.defaults.textLarge}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.5 13.4l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-5.6 5.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9Z"/>
                                            </svg>
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <div className="watchlistEditModal-section">
                    <p className="watchlistEditModal-section-text">emoji</p>
                    <div style={{display:'flex', gap:5}}>
                        {
                            getAllWatchlistEmojis().map((emoji)=>{
                                return (
                                    <div key={emoji.name} style={{aspectRatio:1, flex:'1 1 auto', width:'100%', height:'100%'}}>
                                        <img 
                                            
                                            className="watchlistTile-emoji"
                                            src={require(`../${emoji.path}`)}
                                            alt={emoji.name}
                                            style={{
                                                width:'100%',
                                                height:'100%',
                                                flex:'1 0 auto',
                                                aspectRatio:1,
                                                transform:'scale(1.1)',
                                                cursor:'pointer',
                                                opacity:watchlistEmoji.name === emoji.name ? 1 : 0.5,
                                                boxShadow:watchlistEmoji.name === emoji.name ? `0px 0px 0px 1px ${watchlistHue.defaults.textLarge}` : '',
                                                borderRadius:100
                                            }}
                                            onClick={()=>setWatchlistEmoji(emoji)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div style={{marginTop:10, display:'flex'}}>
                        <div style={{display:'flex', justifyContent:'flex-end', width:'100%', gap:10}}>
                            <div style={{borderRadius:10, backgroundColor:'white',boxShadow:`inset 0px 0px 0px 1px ${providerState.hue.defaults.textLarge}`,color:providerState.hue.defaults.textLarge, padding:'5px 15px', fontWeight:500, cursor:'pointer'}} onClick={handleCancelButtonClick}>
                                cancel
                            </div>
                            <div style={{borderRadius:10, backgroundColor:providerState.hue.defaults.textLarge,color:'white', padding:'5px 15px', fontWeight:500,cursor:'pointer'}} onClick={handlePrimaryButtonClick}>
                                {props.watchlist ? "update" : "create"}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}


