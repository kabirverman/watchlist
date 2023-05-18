

export interface IMovie {
    title:string,
    year:number,
    genres:IGenre[],
    voteAverage:number,
    posterPath:string,
    movieId:string,
    isWatched:boolean,
    dateAdded:number,
}

export interface IMovieDetails {
    title:string,
    year:number,
    genres:IGenre[],
    voteAverage:number,
    posterPath:string,
    movieId:string,
    overview:string,
    runtime:number,
    creators: {
        directors: string[],
        writers: string[]
    },
    contentRating:string,
    cast:ICast[],
    similarMovies:IMovie[]
}

export interface IWatchlist {
    name:string,
    emoji:IEmoji,
    hue:IHue,
    uuid:string,
    movies: {[movieId:string]:IMovie}
}

export interface IEmoji {
    name: string,
    path: string
}

export interface IHue {
    hue: number,
    name: string,
    defaults: {
        panel:string,
        border:string,
        textLarge:string,
        textSmall:string
    }
}

export interface ICast{
    name:string,
    character:string,
    posterPath:string
}

export interface IConfig {
    emojis: {[key:string]:IEmoji},
    hues: IHue[]
    genres: {[key:string]:{name:string, emoji:string}}
}

export interface IGenre {
    name:string,
    id:string,
    emoji:string
}