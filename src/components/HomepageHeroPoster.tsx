import { useState } from "react"
import { IMovie } from "../Interfaces"

interface IHomepageHeroPosterProps {
    movie:IMovie
}

export default function HomepageHeroPoster(props:IHomepageHeroPosterProps) {

    const [isPosterLoaded, setIsPosterLoaded] = useState<boolean>(false)

    return (
        <div>
            <img
                key={props.movie.title}
                src={`https://image.tmdb.org/t/p/w${200}${props.movie.posterPath}?dummy=parameter`}
                alt={props.movie.title}
                style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover', borderRadius:10, boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.5)', opacity: isPosterLoaded ? 1 : 0, transition:`opacity ${1000 + Math.random()*1000}ms`}}
                onLoad={() => setIsPosterLoaded(true)}
            />
        </div>
    )
}