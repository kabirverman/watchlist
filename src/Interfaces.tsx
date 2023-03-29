

export interface IMovie {
    title:string,
    year:number,
    genreIds:string[],
    voteAverage:number,
    posterPath:string,
    movidId:string,
    isWatched:boolean,
    dateAdded:number,
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