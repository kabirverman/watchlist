import { useContext, useState } from "react"
import { IHue, IWatchlist } from "../Interfaces"
import { getAllWatchlistEmojis, getEmoji } from "../utils/emoji"
import { getAllHues, getRandomHue } from "../utils/hues"
import { v4 as uuidv4 } from 'uuid'
import { Context } from "./MainProvider"


interface IWatchlistAddTileProps {

}

export default function WatchlistAddTile(props:IWatchlistAddTileProps) {

    const providerState = useContext(Context)
    const [isCreatingNewWatchlist, setIsCreatingNewWatchlist] = useState(false)
    const [watchlistEmoji, setWatchlistEmoji] = useState(getEmoji("🤠"))
    const [watchlistName, setWatchlistName] = useState("")
    const [watchlistHue, setWatchlistHue] = useState<IHue>(getRandomHue())
    const editPanelOptions = ["emoji","color"] as const
    const [editPanelMode, setEditPanelMode] = useState<typeof editPanelOptions[number]>("emoji")
    const [editPanelTransform, setEditPanelTransform] = useState(`translate(0px, 0px)`)
    const [buttonsTransform, setButtonsTransform] = useState(`translate(0px, calc(-100% - 10px))`)
    let wandEmoji = getEmoji("🪄")
    const tempTransition = 'transform 300ms cubic-bezier(0.18, 0.14, 0.18, 0.99)'



    function showInnerTile() {
        if (isCreatingNewWatchlist) {
            return (
                <div className="watchlistTile-content" style={{cursor:'default'}}>
                    

                    <img 
                        className="watchlistTile-emoji"
                        src={require(`../${watchlistEmoji.path}`)}
                        alt={watchlistEmoji.name}
                    />
                    {/* <img 
                        className="watchlistTile-emoji"
                        src={require(`../${wandEmoji.path}`)}
                        alt={wandEmoji.name}
                        style={{filter:'grayscale(1)'}}
                    /> */}
                    {/* <p className="watchlistTile-text" style={{color:'#747474'}}>create a swag</p> */}
                    <textarea
                        className="watchlistAddTile-textarea"
                        style={{
                            backgroundColor:'rgba(255,255,255,0.5)',
                            color:watchlistHue.defaults.textSmall,
                            fontSize:20,
                            fontWeight:500,
                            fontFamily:'Noto Sans',
                            border:'none',
                            resize:'none',
                            borderRadius:10,
                            width:'100%'
                            
                        }}
                        placeholder="enter a watchlist title"
                        value={watchlistName}
                        onChange={(e)=>setWatchlistName(e.target.value)}
                    >
                    </textarea>
                </div>
            )
        }


        return (
            <div
                style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%'}}
                onClick={()=>{
                    setIsCreatingNewWatchlist(true)
                    setEditPanelTransform(`translate(0px, calc(-100% - 10px))`)
                    setButtonsTransform(`translate(0px, 0px)`)
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
        )
    }


    function showEditPanel() {
        // if (!isCreatingNewWatchlist) return
        return (
            <div
                style={{
                    position:'absolute',
                    width:'100%',
                    backgroundColor:watchlistHue.defaults.panel, 
                    boxShadow:`inset 0px 0px 0px 1px ${watchlistHue.defaults.border}`,
                    transform:editPanelTransform,
                    display:'flex',
                    flexDirection:'column',
                    gap:10,
                    padding:10,
                    boxSizing:'border-box',
                    borderRadius:10,
                    transition:tempTransition,
                    // opacity:isCreatingNewWatchlist ? 1 : 0,
                }}
            >
                
                <div style={{display:'flex', justifyContent:'center', fontWeight:500, gap:10}}>
                    {editPanelOptions.map((option)=> {
                        const isSelected = editPanelMode === option
                        return (
                            <p
                                key={option}
                                style={{
                                    color: isSelected ? watchlistHue.defaults.textSmall : '#a9a9a9',
                                    cursor:isSelected ? 'default' : 'pointer',
                                    fontWeight:isSelected ? 500 : 400
                                }}
                                onClick={()=>setEditPanelMode(option)}
                            >
                                {option}
                            </p>
                        )
                    })}
                </div>

                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {
                        editPanelMode === "emoji"
                        ?getAllWatchlistEmojis().map((emoji)=>{
                            return (
                                <img 
                                    key={emoji.name}
                                    className="watchlistTile-emoji"
                                    src={require(`../${emoji.path}`)}
                                    alt={emoji.name}
                                    style={{width:23, height:23, transform:'scale(1.1', cursor:'pointer'}}
                                    onClick={()=>setWatchlistEmoji(emoji)}
                                />
                            )
                        })
                        :getAllHues().map((hue)=>{
                            return (
                                <div
                                    key={hue.hue}
                                    style={{
                                        width:23,
                                        height:23,
                                        // backgroundColor:hue.defaults.textLarge,
                                        backgroundColor:`hsl(${hue.hue}, 80%, 50%)`,
                                        borderRadius:20,
                                        cursor:'pointer'
                                    }}
                                    onClick={()=>setWatchlistHue(hue)}
                                />
                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }

    function showButtons() {
        // if (!isCreatingNewWatchlist) return
        return (
            <div style={{position:'absolute', width:'100%',marginTop:10, display:'flex', gap:10, backgroundColor:'', justifyContent:'flex-end',transform:buttonsTransform,transition:tempTransition}}>
                <div
                    style={{borderRadius:10, backgroundColor:'white',boxShadow:`inset 0px 0px 0px 1px ${watchlistHue.defaults.textLarge}`,color:watchlistHue.defaults.textLarge, padding:'3px 10px', fontWeight:500, cursor:'pointer'}}
                    onClick={()=>{
                        setIsCreatingNewWatchlist(false)
                        setWatchlistName("")
                        setEditPanelTransform(`translate(0px, 0px)`)
                        setButtonsTransform(`translate(0px, calc(-100% - 10px))`)
                    }}
                >cancel</div>
                <div
                    style={{borderRadius:10, backgroundColor:watchlistHue.defaults.textLarge,color:'white', padding:'3px 10px', fontWeight:500,cursor:'pointer'}}
                    onClick={()=>{
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
                        let updatedWatchlists = [...providerState.watchlists,newWatchlist]
                        providerState.updateWatchlists(updatedWatchlists)


                        setIsCreatingNewWatchlist(false)
                        setWatchlistName("")
                        setEditPanelTransform(`translate(0px, 0px)`)
                        setButtonsTransform(`translate(0px, calc(-100% - 10px))`)
                    }}
                >create</div>
            </div>
        )
    }
    
    return (
        <div style={{position:'relative'}}>
            
            {showEditPanel()}

            <div className="watchlistTile-container" style={{position:'relative',backgroundColor:isCreatingNewWatchlist? watchlistHue.defaults.panel : '#efefef',  boxShadow:`inset 0px 0px 0px 1px ${isCreatingNewWatchlist ? watchlistHue.defaults.border :'#c9c9c9'}`,zIndex:3}}>
                {showInnerTile()}
            </div>

            {showButtons()}

        </div>
    )
}