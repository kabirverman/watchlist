import { useQuery } from "@tanstack/react-query"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { fetchMovieSearch } from "../fetch"
import { useDebounce } from "../hooks/useDebounce"
import { IHue, IMovie } from "../Interfaces"
import SearchBarItem from "./SearchBarItem"
import SearchBarItemPlaceholder from "./SearchBarItemPlaceholder"
import { useLocation } from "react-router-dom"

interface ISearchBarProps {
    hue:IHue,
    isMobile: boolean,
    setIsSearchBarHeader?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBar(props:ISearchBarProps) {

    const [isFocusingSearch, setIsFocusingSearch] = useState(false)
    const [search, setSearch] = useState("")
    const [isWaitingForDebounce, setIsWaitingForDebounce] = useState(false)
    const placeholderText = "search for a movie"
    const searchInputRef = useRef<HTMLInputElement>(null)
    const debouncedSearch = useDebounce(search, 1000)
    const maxResults = props.isMobile ? 3 : 5
    const {data, isLoading}  = useQuery({ queryKey: ["movieSearch",debouncedSearch], queryFn:()=>fetchMovieSearch(debouncedSearch), enabled:Boolean(debouncedSearch),refetchOnWindowFocus: false}) 
    const [hideSearchResults, setHideSearchResults] = useState<boolean>(false)
    const [imageLoadStatusArray, setImageLoadStatusArray] = useState<boolean[]>([])
    const [areAllImagesLoaded, setAreAllImagesLoaded] = useState<boolean>(false)

    let location = useLocation()

    useLayoutEffect(()=> {
        if (props.isMobile) {

            console.log('should focus')
            searchInputRef.current?.focus()
        }
    },[props.isMobile])

    useEffect(()=> {
        if (data === undefined) return
        setIsWaitingForDebounce(false)
    },[data])

    useEffect(()=> {
        if (!isFocusingSearch && !props.isMobile) {
            searchInputRef.current?.blur()
        }
    },[isFocusingSearch])

    useEffect(()=> {
        setSearch("")
    },[location])



    function showSearchResults() {
        console.log(search,data === undefined,  isWaitingForDebounce)
        if (search === "") return
        if (data === undefined || isWaitingForDebounce) return (
        // return ( 
            <div>
                <SearchBarItemPlaceholder setIsFocusingSearch={setIsFocusingSearch}/>
                <SearchBarItemPlaceholder setIsFocusingSearch={setIsFocusingSearch}/>
                <SearchBarItemPlaceholder setIsFocusingSearch={setIsFocusingSearch}/>
            </div>
        )
        // if (data === undefined) return
        // if (isWaitingForDebounce) return

        // let shouldShow = areAllImagesLoaded && debouncedSearch === search && !hideSearchResults
        let shouldShow = debouncedSearch === search && isFocusingSearch
       
        
        return (
            <div style={{visibility:shouldShow ? 'visible': 'hidden', position:shouldShow ? 'initial' : 'absolute'}}>
                {data?.slice(0,maxResults).map((movie:IMovie, index:number)=> {
                    return (
                        <SearchBarItem key={movie.movieId} movie={movie} setIsFocusingSearch={setIsFocusingSearch} setIsSearchBarHeader={props.setIsSearchBarHeader}/>
                        // <div>
                        //     <p>{movie.title}</p>
                        // </div>
                        // <SearchResultItem key={result.id} index={index} title={result.title} year={year} poster={result.poster_path} genreIds={result.genre_ids} result={result} isPlaceHolder={false} setImageLoadStatusArray={setImageLoadStatusArray} setHideSearchResults={setHideSearchResults}/>
                        )
                    })}
                {/* <div style={{height:30, display:'flex', alignItems:'center', paddingLeft:'10px', cursor:'pointer'}}>
                    <p style={{margin:0, fontSize:'14px'}} onClick={()=>{}} >see all results for "{debouncedSearch}"</p>
                </div> */}
                <div style={{height:20, display:'flex', alignItems:'center', paddingLeft:'10px'}}/>
            </div>
        )
    }


    function returnInputValue() {
        if (props.isMobile) return search
        if (isFocusingSearch || search!== "") return search
        
        return placeholderText
    }


    return (
        <div
            style={{width:'100%', height:40, backgroundColor:''}}
            tabIndex={1}
            onBlur={(e)=>{
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsFocusingSearch(false)
                }
            }}
            onFocus={()=> {
                // if (hideSearchResults) setHideSearchResults(false)
                searchInputRef.current?.focus()
                setIsFocusingSearch(true)
            }}

        >
            <div className="searchBar" style={{boxShadow:props.isMobile ? '' : `0px 0px 2px 0px hsl(${props.hue.hue}, 50%, 40%)`, width:'100%', height:'100%', borderRadius:10, display:'flex', padding:props.isMobile ? '10px 15px' : 10, boxSizing:'border-box', position:'relative', alignItems:'center'}}>
                <input
                    style={{border:'none',backgroundColor:'transparent',color:isFocusingSearch? props.hue.defaults.textLarge : `hsl(${props.hue.hue}, 30%, 70%)`, width:'100%', fontSize:'18px'}}
                    ref={searchInputRef}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        if (e.target.value !== "") {
                            setIsWaitingForDebounce(true)
                        }
                        else {
                            setIsWaitingForDebounce(false)
                        }
                    }}
                    placeholder={props.isMobile ? placeholderText : ''}
                    value={returnInputValue()}
                />

                {  props.isMobile
                 
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path style={{stroke:props.hue.defaults.textLarge, strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round'}} d="M17 7L7 17M7 7L17 17"/>
                    </svg>

                    : <div className="searchBar-icon">
                        <svg style={{stroke:`hsl(${props.hue.hue}, 30%, 70%)`}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="5" strokeWidth="1.5" />
                            <path d="M19.5 19.5L16.5 15.5L15.5 16.5L19.5 19.5Z" strokeWidth="1" />
                        </svg>
                    </div>

                    
                }
                
            </div>
            <div className="searchBar-results-container">
                <div style={{backgroundColor:'white', borderRadius:5, boxShadow:'0px 10px 20px 0px rgba(0,0,0,0.25)'}}>
                    {showSearchResults()}
                </div>

            </div>

        </div>
    )
}