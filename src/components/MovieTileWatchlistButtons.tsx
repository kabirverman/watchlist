import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { IMovie } from "../Interfaces";
import { getEmoji } from "../utils/emoji";


interface IMovieTileWatchlistButtonsProps {
    manipulateMovieInWatchlist: {
        toggleMovieWatchState: (movie: IMovie) => void;
        removeMovieFromWatchlist: (movie: IMovie) => void;
    },
    movie:IMovie
}

export default function MovieTileWatchlistButtons(props:IMovieTileWatchlistButtonsProps) {


    const crossMarkEmoji = getEmoji("❌")
    const eyeEmoji = getEmoji("👁️")

    const [isHoveringWatchedButton, setIsHoveringWatchedButton] = useState(false)
    const [isHoveringRemoveButton, setIsHoveringRemoveButton] = useState(false)

    const debouncedWatchedButton = useDebounce(isHoveringWatchedButton, 300)
    const debouncedRemoveButton = useDebounce(isHoveringRemoveButton, 300)



    return (
        <div style={{position:'absolute',  zIndex:1, cursor:'pointer', display:'flex',width:'100%', filter:'drop-shadow(0px 0px 2px rgba(0,0,0,0.8)) drop-shadow(0px 0px 10px rgba(0,0,0,0.5))', lineHeight:'normal'}} >
            <div style={{padding:10, display:'flex', justifyContent:'space-between', width:'100%'}}>
                <div style={{display:'flex', flexDirection:'column', gap:5}}>
                    <img
                        src={require(`../${eyeEmoji.path}`)}
                        alt={eyeEmoji.name}
                        style={{width:20, height:20, backgroundColor:'rgba(255,255,255,0.75)', padding:5, borderRadius:8}}
                        onClick={() => {
                            props.manipulateMovieInWatchlist?.toggleMovieWatchState(props.movie!)
                            // setShowDropdown(false)
                        }}
                        onMouseOver={() => setIsHoveringWatchedButton(true)}
                        onMouseOut={() => setIsHoveringWatchedButton(false)}
                    />

                    { debouncedWatchedButton &&
                        <p style={{backgroundColor:'rgba(255,255,255,0.75)', padding:'3px 5px', borderRadius:5, fontSize:16}}>{props.movie.isWatched ? "un-watch" : "watched"}</p>
                    }
                </div>

                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:5}}>
                    <img
                        src={require(`../${crossMarkEmoji.path}`)}
                        alt={crossMarkEmoji.name}
                        style={{width:20, height:20, backgroundColor:'rgba(255,255,255,0.75)', padding:5, borderRadius:8}}
                        onClick={() => {
                            props.manipulateMovieInWatchlist?.removeMovieFromWatchlist(props.movie!)
                            // setShowDropdown(false)
                        }}
                        onMouseOver={() => setIsHoveringRemoveButton(true)}
                        onMouseOut={() => setIsHoveringRemoveButton(false)}
                    />
                    { debouncedRemoveButton &&
                        <p style={{backgroundColor:'rgba(255,255,255,0.75)', padding:'3px 5px', borderRadius:5}}>remove</p>
                    }
                </div>
            </div>
        </div>
    )
}