import { IWatchlist } from "../Interfaces"

interface IWatchlistTileProps {
    watchlist:IWatchlist
}

export default function WatchlistTile(props:IWatchlistTileProps) {
    return (
        <div className="watchlistTile-container" style={{backgroundColor:props.watchlist.hue.defaults.panel, boxShadow:`inset 0px 0px 0px 1px ${props.watchlist.hue.defaults.border}`}}>
            <div className="watchlistTile-content">
                {/* <div className="watchlistTile-emoji" /> */}
                <img 
                    className="watchlistTile-emoji"
                    src={require(`../${props.watchlist.emoji.path}`)}
                    alt={props.watchlist.emoji.name}
                />
                <p className="watchlistTile-text" style={{color:props.watchlist.hue.defaults.textSmall}}>{props.watchlist.name}</p>
            </div>
        </div>
    )
}