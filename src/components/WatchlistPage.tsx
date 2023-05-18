import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { IMovie, IWatchlist } from "../Interfaces"
import { getEmoji } from "../utils/emoji"
import { Context } from "./MainProvider"
import MovieTileContainer from "./MovieTileContainer"




export default function WatchlistPage() {
    var { watchlistId } = useParams()
    watchlistId = watchlistId ?? ""

    const providerState = useContext(Context)

    const location = useLocation()
    
    // let watchlist = providerState.watchlists.find((watchlist) => watchlist.uuid === watchlistId)

    const [watchlistState, setWatchlistState] = useState<IWatchlist | undefined>(providerState.watchlists.find((watchlist) => watchlist.uuid === watchlistId))
    
    const displayCategoryOptions = ["movies to watch", "already watched"] as const
    const [displayCategory, setDisplayCategory] = useState<typeof displayCategoryOptions[number]>('movies to watch')
    

    type sortedMoviesType = {[key in typeof displayCategoryOptions[number]]:IMovie[]}
    const [sortedMovies, setSortedMovies] = useState<sortedMoviesType>({} as sortedMoviesType)

    const sortOrderOptions = ["newest first", "oldest first"] as const
    const [sortOrder, setSortOrder] = useState<typeof sortOrderOptions[number]>('newest first')
    const [hoveringSortButton, setHoveringSortButton] = useState(false)

    const pointingEmoji = getEmoji("👉")
    const gearEmoji = getEmoji("⚙️")
    


    useEffect(()=> {


        if (watchlistState === undefined) return

        providerState.updateHue(watchlistState.hue)

        

        



        console.log(watchlistState)
    },[])




    useEffect(()=> {

        if (watchlistState === undefined) return

        // reduces the displayCategories array into an object with the categories as keys and empty arrays as values, then casts to sortedMoviesType
        let updatedSortedMovies = displayCategoryOptions.reduce((acc, category) => {
            acc[category] = []
            return acc
        }, {} as sortedMoviesType)
        

        Object.values(watchlistState.movies).forEach((movie) => {
            if (movie.isWatched) updatedSortedMovies["already watched"].push(movie)
            else updatedSortedMovies["movies to watch"].push(movie)
        })

        displayCategoryOptions.forEach((category) => {
            updatedSortedMovies[category].sort((a,b) => {
                if (sortOrder === "newest first") return b.dateAdded - a.dateAdded
                else return a.dateAdded - b.dateAdded
            })
        })

        setSortedMovies(updatedSortedMovies)

    },[sortOrder])



    function showSortButton() {
        return (
            <div
                onMouseEnter={()=> {setHoveringSortButton(true)}}
                onMouseLeave={()=> {setHoveringSortButton(false)}}
            >
                <div
                    className="watchlistPage-button"
                    style={{backgroundColor:watchlistState?.hue.defaults.panel}}
                    >
                        <p style={{fontWeight:500}}>sort order</p>
                        {/* <div style={{borderRadius:20, width:20, height:20, backgroundColor:'red'}}></div> */}
                        <img src={require(`../${pointingEmoji.path}`)} alt={pointingEmoji.name} style={{width:20, height:20, transform:sortOrder === "newest first" ? 'rotate(-90deg)' : 'rotate(90deg)'}} />
                </div>
                { hoveringSortButton &&
                    <div style={{position:'relative', display:'flex', justifyContent:'flex-end'}}>
                        <div style={{position:'absolute', backgroundColor:'white', width:'max-content', minWidth:'100%', borderRadius:5, boxShadow:'0px 3px 5px rgba(0,0,0,0.3)'}}>
                            {sortOrderOptions.map((option,index) => {
                                let borderRadius = '0px'
                                if (index === 0) borderRadius = '5px 5px 0px 0px'
                                else if (index === sortOrderOptions.length - 1) borderRadius = '0px 0px 5px 5px'
                                return (
                                    <div
                                        key={option}
                                        style={{
                                            display:'flex',
                                            gap:5,
                                            padding:'5px 10px',
                                            justifyContent:'space-between',
                                            cursor:sortOrder === option ? 'default' : 'pointer',
                                            backgroundColor:sortOrder === option ? 'rgba(0,0,0,0.05)' : 'white',
                                            borderRadius: borderRadius,
                                            fontWeight:sortOrder === option ? 500 : 400,
                                        }}
                                        onClick={()=>{
                                            setSortOrder(option)
                                            setHoveringSortButton(false)
                                        }}>
                                        <p>{option}</p>
                                        <img src={require(`../${pointingEmoji.path}`)} alt={pointingEmoji.name} style={{width:20, height:20, transform:option === "newest first" ? 'rotate(-90deg)' : 'rotate(90deg)'}} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        )
    }


    function showButtonRow() {
        return (
            <div className="watchlistPage-buttonRow">

                <div className="watchlistPage-button" style={{backgroundColor:watchlistState?.hue.defaults.panel}}>
                    {/* <div style={{borderRadius:20, width:20, height:20, backgroundColor:'red'}}></div> */}
                    <img src={require(`../${gearEmoji.path}`)} alt={gearEmoji.name} style={{width:20, height:20}} />
                    <p style={{fontWeight:500}}>settings</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", justifyItems: "center", gap: 15, position:'absolute', left:'50%', transform:'translate(-50%,0)', fontSize:20}}>
                    {displayCategoryOptions.map((category) => {
                        return (
                            <p
                                key={category}
                                style={{
                                    fontWeight: displayCategory === category ? 600 : 400,
                                    cursor: displayCategory === category ? "default" : "pointer",
                                }}
                                onClick={() => setDisplayCategory(category)}>

                                {category}

                            </p>
                        )
                    })}
                </div>

                {showSortButton()}

            </div>
        )
    }


    
    return (
			<div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
				<div style={{ backgroundColor: watchlistState!.hue.defaults.panel, height: 300, width: "100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className="pageContent" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', gap:50}}>
                        <b style={{fontSize:70, lineHeight:'70px', color:watchlistState?.hue.defaults.textLarge}}>{watchlistState?.name}</b>
                        <img src={require(`../${watchlistState?.emoji.path}`)} alt={watchlistState?.emoji.name} style={{width:200, height:200}} />
                    </div>
                </div>

				<div className="pageContent" style={{ rowGap: 30 }}>

					{showButtonRow()}

					<div>
						<MovieTileContainer movies={sortedMovies[displayCategory]} isSingleRow={false} tilesPerRow={6} />
					</div>
				</div>
			</div>
		)
}