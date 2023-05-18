import { useState } from "react"
import { IMovie, IMovieDetails, IWatchlist } from "../Interfaces"


interface IWatchlistSlimTileProps {
    watchlist:IWatchlist,
    watchlists:IWatchlist[],
    index:number,
    movie:IMovieDetails,
    updateWatchlists: (watchlists: IWatchlist[]) => void
}

export default function WatchlistSlimTile(props:IWatchlistSlimTileProps) {

    // console.log(props.watchlist)




    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState<boolean>(props.movie.movieId in props.watchlist.movies)
    const [isHovering, setIsHovering] = useState<boolean>(false)

    function handleClick() {
        // setIsAddedToWatchlist(prev => !prev)

        let shouldAdd = !isAddedToWatchlist
        let updatedWatchlists = [...props.watchlists]

        

        if (shouldAdd) {

            let newMovie:IMovie = {
                title: props.movie.title,
                year: props.movie.year,
                genres: props.movie.genres,
                voteAverage: props.movie.voteAverage,
                posterPath: props.movie.posterPath,
                movieId: props.movie.movieId,
                isWatched: false,
                dateAdded: Date.now()
            }

            updatedWatchlists[props.index].movies[props.movie.movieId] = newMovie
            props.updateWatchlists(updatedWatchlists)
        } else {
            delete updatedWatchlists[props.index].movies[props.movie.movieId]
            console.log('delete from index:',props.index)
            props.updateWatchlists(updatedWatchlists)
        }
        
        setIsAddedToWatchlist(shouldAdd)
    }

    function returnCheckmarkOpacity() {
        if (isAddedToWatchlist) return 1
        if (isHovering) return 0.2
        return 0
    }



    return (
        <div
            style={{width:'100%', backgroundColor:props.watchlist.hue.defaults.panel, borderRadius:10, boxSizing:'border-box', cursor:'pointer'}}
            onClick={handleClick}
            onMouseOver={()=>setIsHovering(true)}
            onMouseOut={()=>setIsHovering(false)}
        >
            <div style={{padding:10, display:'flex', gap:10}}>
                <img 
                    className="watchlistTile-emoji"
                    src={require(`../${props.watchlist.emoji.path}`)}
                    alt={props.watchlist.emoji.name}
                    style={{width:25, height:25}}
                />
                <p style={{flex:'1 1 auto', fontWeight:500, color:props.watchlist.hue.defaults.textSmall}}>{props.watchlist.name}</p>

                <svg style={{width:25, height:25,color:props.watchlist.hue.defaults.textLarge, flexShrink:0, opacity:returnCheckmarkOpacity()}} xmlns="http://www.w3.org/2000/svg" viewBox="4 4 15 15">
                    <path fill="currentColor" d="m10.5 13.4l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-5.6 5.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9Z"/>
                </svg>

            </div>

        </div>
    )
}