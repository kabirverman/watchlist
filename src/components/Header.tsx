import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import useWindowSize from "../hooks/useWindowSize"
import { Context } from "./MainProvider"
import SearchBar from "./SearchBar"

interface IHeaderProps {
	// hue:IHue
}


export default function Header(props:IHeaderProps) {
    const navigate = useNavigate()
	const windowSize = useWindowSize()
	const providerState = useContext(Context)

	const [isSearchBarHeader, setIsSearchBarHeader] = useState(false)
	
	

	if (isSearchBarHeader) {
		return (
			<header className="header">
				<div style={{display:'flex', height:'100%', alignItems:'center'}}>
					<div style={{zIndex:2, position:'absolute', backgroundColor:'blue', width:40, height:40, right:0, opacity:0}} onClick={()=>setIsSearchBarHeader(false)}/>
					<SearchBar hue={providerState.hue} isMobile={true} setIsSearchBarHeader={setIsSearchBarHeader}/>
				</div>
			</header>
		)
	}

	
	
    
    return (
			<header className="header">
				<div className="header-grid">
					<p className="header-text" style={{color:providerState.hue.defaults.textLarge}} onClick={() => navigate("/")}> movie watchlist </p>

					{ windowSize.width > 500 &&
						<SearchBar hue={providerState.hue} isMobile={false}/>
					}


					{ windowSize.width < 500 &&
						<div className="searchBar-icon" onClick={() => setIsSearchBarHeader(true)}>
							<svg style={{stroke:providerState.hue.defaults.textLarge}} width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="11" cy="11" r="5" strokeWidth="1.5" />
								<path d="M19.5 19.5L16.5 15.5L15.5 16.5L19.5 19.5Z" strokeWidth="1" />
							</svg>
						</div>
					}


				</div>
			</header>
		)
}