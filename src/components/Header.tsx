import { useNavigate } from "react-router-dom"


export default function Header() {
    const navigate = useNavigate()

    
    return (
			<header className="header">
				<div className="header-grid">
					<p
						style={{
							justifySelf: "start",
							fontSize: "18px",
							fontWeight: "600",
							// color: props.hue.defaults.textLarge,
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

					<div
						style={{
							justifySelf: "end",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							columnGap: 20,
						}}>
						{/* <HeaderNotifications hue={props.hue} /> */}
						<div style={{width:40,height:40}}/>
						<div style={{width:40,height:40}}/>
						{/* <ProfileDot hue={props.hue} /> */}
						{/* </div> */}
					</div>
				</div>
			</header>
		)
}