import { ICast, IMovie, IMovieDetails } from "./Interfaces"


const API_KEY = process.env.REACT_APP_API_KEY


function toIMovieArray(inputMovies:any) {
  let movies:IMovie[] = inputMovies.map((movie:any) => {

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
        if (member.job === 'Director') directors.push(member.name)

        if (member.job !== "Screenplay" && member.job !== "Story" && member.job !== "Writer") return
        writers.push(member.name)
        
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
      let similarMovies:IMovie[] = toIMovieArray(json.similar.results)




      let movieDetails:IMovieDetails = {
        title: json.title,
        year: json.release_date.split('-')[0],
        genreIds: json.genres.slice(0,3).map((genre:any) => genre.id),
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