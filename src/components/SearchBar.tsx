import { useRef, useState } from "react"
import { IHue } from "../Interfaces"

interface ISearchBarProps {
    hue:IHue
}

export default function SearchBar(props:ISearchBarProps) {

    const [isFocusingSearch, setIsFocusingSearch] = useState(false)
    const [search, setSearch] = useState("")
    const [isWaitingForDebounce, setIsWaitingForDebounce] = useState(false)
    const placeholderText = "search for a movie"
    const searchInputRef = useRef<HTMLInputElement>(null)

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
            <div className="searchBar" style={{boxShadow:`0px 0px 2px 0px hsl(${props.hue.hue}, 50%, 40%)`, width:'100%', height:'100%', borderRadius:10, display:'flex'}}>
                <input
                    style={{border:'none',backgroundColor:'transparent', padding:'0px 15px',color:isFocusingSearch? props.hue.defaults.textLarge : `hsl(${props.hue.hue}, 30%, 70%)`, width:'100%', fontSize:'18px'}}
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
                    value={isFocusingSearch || search!== "" ? search : placeholderText}
                />
                
            </div>

        </div>
    )
}