import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import useWindowSize from "../hooks/useWindowSize"
import { IHue } from "../Interfaces"
import { getRandomHue } from "../utils/hues"
import { Context } from "./MainProvider"
import SearchBar from "./SearchBar"

interface IHeaderProps {
	// hue:IHue
}


export default function Header(props:IHeaderProps) {
    const navigate = useNavigate()
	const windowSize = useWindowSize()

	const providerState = useContext(Context)
	



	
    
    return (
			<header className="header">
				<div className="header-grid">
					<p
						style={{
							justifySelf: "start",
							fontSize: "18px",
							fontWeight: "600",
							color: providerState.hue.defaults.textLarge,
							whiteSpace: "nowrap",
							// marginLeft:30,
							cursor: "pointer",
						}}
						// onClick={() => navigate("/", { state: { randomHue: getRandomHue() } })}
                        onClick={() => navigate("/")}
                    >
						movie watchlist
					</p>

					{/* <Search hue={props.hue} /> */}
					{	windowSize.width > 500 &&
						<SearchBar hue={providerState.hue}/>
					}

					<div
						style={{
							justifySelf: "end",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							columnGap: 20,
						}}>
						{/* <HeaderNotifications hue={props.hue} /> */}
						<div style={{width:40,height:40, backgroundColor:'red'}}/>
						<div style={{width:40,height:40, backgroundColor:'red'}}/>
						{/* <ProfileDot hue={props.hue} /> */}
						{/* </div> */}
					</div>
				</div>
			</header>
		)
}