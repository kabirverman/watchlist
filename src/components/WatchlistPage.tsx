import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import useWindowSize from "../hooks/useWindowSize"
import { IMovie, IWatchlist } from "../Interfaces"
import { getEmoji } from "../utils/emoji"
import { Context } from "./MainProvider"
import MovieTileContainer from "./MovieTileContainer"
import MovieTileScrollingContainer from "./MovieTileScrollingContainer"
import WatchlistEditModal from "./WatchlistEditModal"




export default function WatchlistPage() {
    var { watchlistId } = useParams()
    watchlistId = watchlistId ?? ""

    const providerState = useContext(Context)
    const windowSize = useWindowSize()

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

    const [shouldShowEditModal, setShouldShowEditModal] = useState(false)

    const [heroSVG, setHeroSVG] = useState("")
    

    

    useEffect(()=> {


        if (watchlistState === undefined) return

        providerState.updateHue(watchlistState.hue)

        let fontSize = '70px'
        if (windowSize.width > 500) {
            setHeroSVG(`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'><text x='15' y='27%' fill='black' font-size='${fontSize}' font-weight='600' opacity='0.025' font-family='Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif'>${Array(10).fill(watchlistState.name).join(" ")}</text><text x='-50' y='60%' fill='black' font-size='${fontSize}' font-weight='600' opacity='0.025' font-family='Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif'>${Array(9).fill(watchlistState.name).join(" ")}</text><text x='-100' y='93%' fill='black' font-size='${fontSize}' font-weight='600' opacity='0.025' font-family='Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif'>${Array(8).fill(watchlistState.name).join(" ")}</text></svg>")`)
        }

        

        



        console.log(watchlistState)
    },[watchlistState])




    useEffect(()=> {

        sortMovies()

    },[sortOrder])

    useEffect(()=> {
        console.log('provider state updated')
        setWatchlistState(providerState.watchlists.find((watchlist) => watchlist.uuid === watchlistId))
        
    },[providerState.watchlists])

    function sortMovies() {
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
    }



    function toggleMovieWatchState(movie:IMovie) {

        let updatedWatchlists = providerState.watchlists.map((watchlist) => {
            if (watchlist.uuid === watchlistId) {
                if (watchlist.movies[movie.movieId].isWatched) watchlist.movies[movie.movieId].isWatched = false
                else watchlist.movies[movie.movieId].isWatched = true
            }
            return watchlist
        })
        providerState.updateWatchlists(updatedWatchlists)
        sortMovies()
        
    }

    function removeMovieFromWatchlist(movie:IMovie) {
        if (watchlistState === undefined) return


        let updatedWatchlists = providerState.watchlists.map((watchlist) => {
            if (watchlist.uuid === watchlistId) {
                delete watchlist.movies[movie.movieId]
            }
            return watchlist
        })
        providerState.updateWatchlists(updatedWatchlists)

        sortMovies()


    }






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
                        <p style={{fontWeight:500, color:watchlistState?.hue.defaults.textSmall}}>sort order</p>
                        {/* <div style={{borderRadius:20, width:20, height:20, backgroundColor:'red'}}></div> */}
                        <img src={require(`../${pointingEmoji.path}`)} alt={pointingEmoji.name} style={{width:20, height:20, transform:sortOrder === "newest first" ? 'rotate(-90deg)' : 'rotate(90deg)'}} />
                </div>
                { hoveringSortButton &&
                    <div style={{position:'relative', display:'flex', justifyContent:'flex-end', zIndex:2}}>
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

    function showCategoryButtons() {
        return (
            <div className="watchlistPage-categoryButtons-master" style={{color:watchlistState?.hue.defaults.textSmall}}>
                {displayCategoryOptions.map((category) => {
                    return (
                        <p
                            key={category}
                            style={{
                                fontWeight: displayCategory === category ? 600 : 400,
                                cursor: displayCategory === category ? "default" : "pointer",
                                opacity: displayCategory === category ? 1 : 0.7,
                            }}
                            onClick={() => setDisplayCategory(category)}>

                            {category}

                        </p>
                    )
                })}
            </div>
        )
    }


    function showButtonRow() {
        return (
            <div className="watchlistPage-buttonRow">

                <div>
                    <div className="watchlistPage-button" style={{backgroundColor:watchlistState?.hue.defaults.panel}} onClick={()=>setShouldShowEditModal((prev)=> !prev)}>
                        {/* <div style={{borderRadius:20, width:20, height:20, backgroundColor:'red'}}></div> */}
                        <img src={require(`../${gearEmoji.path}`)} alt={gearEmoji.name} style={{width:20, height:20}} />
                        <p style={{fontWeight:500, color:watchlistState?.hue.defaults.textSmall}}>settings</p>
                    </div>
                    { shouldShowEditModal &&
                        <div style={{position:'absolute', transform:`translate(-15px,0px`, zIndex:2}}>
                            <WatchlistEditModal watchlist={watchlistState} closeModal={()=>setShouldShowEditModal(false)}/>
                        </div>
                    }
                </div>

                { windowSize.width > 500 &&
                    showCategoryButtons()
                }

                {showSortButton()}

            </div>
        )
    }

    
    
    return (
			<div className="watchlistPage">
				{/* <div className="watchlistPage-hero-master" style={{ backgroundColor: watchlistState!.hue.defaults.panel, backgroundImage:`linear-gradient(-165deg, transparent, ${watchlistState!.hue.defaults.panel}),url(${require(`../${watchlistState!.emoji.path}`)})`}}> */}
                <div className="watchlistPage-hero-master" style={{ backgroundColor: watchlistState!.hue.defaults.panel, backgroundImage:heroSVG}}>
                    <div className="pageContent" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', gap:50}}>
                        <b className="watchlistPage-hero-text" style={{color:watchlistState?.hue.defaults.textLarge}}>{watchlistState?.name}</b>
                        <img className="watchlistPage-hero-emoji" src={require(`../${watchlistState?.emoji.path}`)} alt={watchlistState?.emoji.name} />
                    </div>
                </div>

				<div className="pageContent" style={{ rowGap: 30 }}>

					{showButtonRow()}

                    { windowSize.width <= 500 &&
                        <div style={{display:'flex', flexDirection:'column', gap:15}}>
                            {showCategoryButtons()}
                            <MovieTileContainer movies={sortedMovies[displayCategory]} isSingleRow={false} tilesPerRow={3} />
                        </div>

                    }

					<div>
                        {/* {windowSize.width <= 500 &&
                            <div style={{marginTop:20}}>
                                <MovieTileScrollingContainer movies={sortedMovies[displayCategory]} />
                            </div>
                        } */}
                        { windowSize.width > 500 &&
                            <MovieTileContainer movies={sortedMovies[displayCategory]} isSingleRow={false} tilesPerRow={6} manipulateMovieInWatchlist={{toggleMovieWatchState,removeMovieFromWatchlist}}/>
                        }
					</div>
				</div>
			</div>
		)
}