import { ICast, IConfig, IMovie, IMovieDetails, IWatchlist } from "./Interfaces"
import configJson from "./config.json"

const API_KEY = process.env.REACT_APP_API_KEY

const config:IConfig = configJson as IConfig

function toIMovieArray(inputMovies:any) {
  let movies:IMovie[] = inputMovies.map((movie:any) => {
    // console.log(movie)
    return {
        title: movie.title,
        year: movie.release_date.split('-')[0],
        genres: movie.genre_ids.slice(0,3).map((genreId:number) => config.genres[genreId]),
        voteAverage: movie.vote_average,
        posterPath: movie.poster_path,
        movieId: movie.id,
        isWatched: false,
        dateAdded: 0
    }
  })

  return  movies
}


export async function fetchTrendingMovies() {
    return fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)

      let movies:IMovie[] = toIMovieArray(json.results)
      console.log(movies)
      return movies

    //   return json
    })
    .catch(err => {
        console.error(err)
        return undefined
    })
}



export function fetchMovieDetails(movieId:string) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,release_dates,similar`)
    .then(response => response.json())
    .then(json => {

      // get creators
      let directors:string[] = []
      let writers:string[] = []
      json.credits.crew.forEach((member:any) => {
        if (member.job === 'Director'){
          directors.push(member.name)
          return
        }

        if (member.job === "Screenplay" || member.job === "Writer") {
          writers.push(member.name)
          return
        }
        
      })

      // get content rating
      let contentRating:string = ""
      for (let i = 0; i < json.release_dates.results.length; i++) {
        let current = json.release_dates.results[i]
        if (current.iso_3166_1 === 'US') {
          // eslint-disable-next-line no-loop-func
          current.release_dates.forEach((releaseInfo:any) => {
              if (releaseInfo.type === 3 || releaseInfo.type === 4 || releaseInfo.type === 1) {
                contentRating = releaseInfo.certification
              }
          })
          break
        }
      }

      // get cast
      let cast:ICast[] = []
      json.credits.cast.forEach((member:any) => {
        cast.push({
          name: member.name,
          character: member.character,
          posterPath: member.profile_path
        })
      })


      // get similar movies

      // filter out collections (which don't have genre ids) from the movies & filter out movies without posters
      let similarResults = json.similar.results.filter((movie:any) => movie.genre_ids && movie.poster_path)

      let similarMovies:IMovie[] = toIMovieArray(similarResults)






      let movieDetails:IMovieDetails = {
        title: json.title,
        year: json.release_date.split('-')[0],
        genres: json.genres.slice(0,3).map((genre:any) => config.genres[genre.id]),
        voteAverage: json.vote_average,
        posterPath: json.poster_path,
        movieId,
        overview: json.overview,
        runtime: json.runtime,
        creators:{directors, writers},
        contentRating,
        cast,
        similarMovies
      }


      console.log(json)
      console.log(movieDetails)
      return movieDetails
    })
    .catch(err => console.error(err))
}




export async function fetchMovieSearch(query:string) {
  query = query.split(" ").join("+")
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
  .then(response => response.json())
  .then(json => {
    
    // filter out movies without genres or release dates
    let filteredResults = json.results.filter((movie:any) => movie.genre_ids.length >= 1 && movie.release_date !== "")
    let movies:IMovie[] = toIMovieArray(filteredResults)
    return movies
  })
  .catch(err => console.error(err))

}


export function getWatchlistsFromLocal() {
  let watchlistJson = localStorage.getItem('watchlists')
  let watchlists:IWatchlist[] = []
  if (watchlistJson) {
    watchlists = JSON.parse(watchlistJson)
  }
  return watchlists
}