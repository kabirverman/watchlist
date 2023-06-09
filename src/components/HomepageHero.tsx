import { useEffect, useState } from "react"
import useWindowSize from "../hooks/useWindowSize"
import { IHue, IMovie } from "../Interfaces"
import HomepageHeroPoster from "./HomepageHeroPoster"


interface IHeroProps{
    movies:IMovie[] | undefined,
    hue:IHue
}

export default function HomepageHero(props:IHeroProps) {
    const [moviesToDisplay, setMoviesToDisplay] = useState<IMovie[]>(props.movies ? props.movies.slice(0,7) : new Array(7).fill({title:'loading', year:'loading', genreIds:[], voteAverage:0, posterPath:'loading', movieId:0, isWatched:false, dateAdded:0}))
    const [heroSVG, setHeroSVG] = useState<string>('')
    console.count(`>> Homepage HERO Render -- ${props.movies?.length}`)
    const windowSize = useWindowSize()

    useEffect(()=> {
        let fontSize = '70px'
        let text = 'movie watchlist'
        if (windowSize.width > 500) {
            setHeroSVG(`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'><text x='15' y='27%' fill='black' font-size='${fontSize}' font-weight='600' opacity='0.02' font-family='Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif'>${Array(20).fill(text).join(" ")}</text><text x='-50' y='60%' fill='black' font-size='${fontSize}' font-weight='600' opacity='0.02' font-family='Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif'>${Array(20).fill(text).join(" ")}</text><text x='-100' y='93%' fill='black' font-size='${fontSize}' font-weight='600' opacity='0.02' font-family='Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif'>${Array(20).fill(text).join(" ")}</text></svg>")`)
        }
    },[])

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
        <div className="homepageHero-container" style={{backgroundColor:props.hue.defaults.panel,backgroundImage:heroSVG}}>
            <div className="pageContent homepageHero-containerContent">
                <div className="homepageHero-text" style={{display:'flex', flexDirection:'column'}}>
                    <h1 className="homepageHero-title" style={{color:props.hue.defaults.textLarge}}>movie<br/>watchlist</h1>
                    <p className="homepageHero-slogan" style={{color:props.hue.defaults.textSmall}}>make a list, watch the list, repeat.</p>
                </div>
                
                
                <div className="homepageHero-imageContainer">
                    <div className="homepageHero-imageContent">

                        <div className="homepageHero-movieColumn" style={{height:'fit-content', transform:'translate(0px, 25%)'}}>
                            {moviesToDisplay.slice(0,2).map((movie) => {
                                return <HomepageHeroPoster movie={movie}/>
                                
                            })}
                        </div>

                        <div className="homepageHero-movieColumn">
                            {moviesToDisplay.slice(2,5).map((movie) => {
                                return <HomepageHeroPoster movie={movie}/>
                            })}
                        </div>

                        <div className="homepageHero-movieColumn" style={{height:'fit-content', transform:'translate(0px, 25%)'}}>
                            {moviesToDisplay.slice(5,7).map((movie) => {
                                return <HomepageHeroPoster movie={movie}/>
                            })}
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}