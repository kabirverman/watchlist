import { IMovie } from "./Interfaces"


const API_KEY = process.env.REACT_APP_API_KEY

export async function fetchTrendingMovies() {
    return fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)

      let movies:IMovie[] = json.results.map((movie:any) => {
        // console.log(movie)

        return {
            title: movie.title,
            year: movie.release_date.split('-')[0],
            genreIds: movie.genre_ids.slice(0,3),
            voteAverage: movie.vote_average,
            posterPath: movie.poster_path,
            movieId: movie.id,
            isWatched: false,
            dateAdded: 0
        }
      })
      console.log(movies)
      return movies

    //   return json
    })
    .catch(err => {
        console.error(err)
        return undefined
    })
}