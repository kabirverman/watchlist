import { useEffect, useState } from "react"
import { IHue, IMovie } from "../Interfaces"
import HomepageHeroPoster from "./HomepageHeroPoster"


interface IHeroProps{
    movies:IMovie[] | undefined,
    hue:IHue
}

export default function HomepageHero(props:IHeroProps) {
    const [moviesToDisplay, setMoviesToDisplay] = useState<IMovie[]>(props.movies ? props.movies.slice(0,7) : new Array(7).fill({title:'loading', year:'loading', genreIds:[], voteAverage:0, posterPath:'loading', movieId:0, isWatched:false, dateAdded:0}))

    console.count(`>> Homepage HERO Render -- ${props.movies?.length}`)

    useEffect(() => {
        if (props.movies === undefined) return

        let shuffledMovies = shuffle([...props.movies])
        setMoviesToDisplay(shuffledMovies)
    },[props.movies])


    function shuffle(array:IMovie[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }



    
    return (
        <div className="homepageHero-container" style={{backgroundColor:props.hue.defaults.panel}}>
            <div className="pageContent homepageHero-containerContent">
                <div className="homepageHero-text" style={{display:'flex', flexDirection:'column'}}>
                    <h1 className="homepageHero-title" style={{color:props.hue.defaults.textLarge}}>movie<br/>watchlist</h1>
                    <p className="homepageHero-slogan" style={{color:props.hue.defaults.textSmall}}>lorem ipsum swagathy dorum flarp.</p>
                </div>
                
                <div className="homepageHero-imageContainer">
                    <div className="homepageHero-imageContent">

                        <div className="homepageHero-movieColumn" style={{height:'fit-content', transform:'translate(0px, 25%)'}}>
                            {moviesToDisplay.slice(0,2).map((movie, index) => {
                                // return <div key={index} style={{backgroundColor:props.hue.defaults.textLarge, width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                return <HomepageHeroPoster movie={movie}/>
                                if (movie.posterPath === 'loading') return <div key={index} style={{backgroundColor:props.hue.defaults.textLarge, width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                return (
                                    <img
                                        key={movie.title}
                                        src={`https://image.tmdb.org/t/p/w${200}${movie.posterPath}?dummy=parameter`}
                                        alt={movie.title}
                                        style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover', borderRadius:10, boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.5)'}}
                                    />
                                )
                            })}
                        </div>

                        <div className="homepageHero-movieColumn">
                            {moviesToDisplay.slice(2,5).map((movie, index) => {
                                // return <div key={index} style={{backgroundColor:props.hue.defaults.textLarge, width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                return <HomepageHeroPoster movie={movie}/>
                                if (movie.posterPath === 'loading') return <div key={index} style={{backgroundColor:props.hue.defaults.textLarge, width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                return (
                                    <img
                                        key={movie.title}
                                        src={`https://image.tmdb.org/t/p/w${200}${movie.posterPath}?dummy=parameter`}
                                        alt={movie.title}
                                        style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover', borderRadius:10, boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.5)'}}
                                    />
                                )
                            })}
                        </div>

                        <div className="homepageHero-movieColumn" style={{height:'fit-content', transform:'translate(0px, 25%)'}}>
                            {moviesToDisplay.slice(5,7).map((movie, index) => {
                                return <HomepageHeroPoster movie={movie}/>
                                // if (movie.posterPath === 'loading') return <div key={index} style={{backgroundColor:props.hue.defaults.textLarge, width:'100%', aspectRatio:'2/3', borderRadius:10}} />
                                // return (
                                //     <img
                                //         key={movie.title}
                                //         src={`https://image.tmdb.org/t/p/w${200}${movie.posterPath}?dummy=parameter`}
                                //         alt={movie.title}
                                //         style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover', borderRadius:10, boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.5)'}}
                                //     />
                                // )
                            })}
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}