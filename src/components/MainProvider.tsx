import { createContext, ReactNode, useContext, useState } from "react"
import { getWatchlistsFromLocal } from "../fetch"
import { IHue, IWatchlist } from "../Interfaces"
import { getRandomHue } from "../utils/hues"

let localHue = JSON.parse(localStorage.getItem("hue") ?? "{}")
if (Object.keys(localHue).length === 0) localHue = getRandomHue()



export const Context = createContext({
    hue:localHue,
    updateHue: (hue:IHue) => {},
    watchlists:getWatchlistsFromLocal(),
    updateWatchlists: (watchlists:IWatchlist[]) => {},
})

interface IMainProviderProps {
    children:ReactNode
}

export default function MainProvider({children}:IMainProviderProps) {
    const defaultContext = useContext(Context)
    const [hue, setHue] = useState(defaultContext.hue)
    const [watchlists, setWatchlists] = useState(defaultContext.watchlists)



    function updateHue(hue:IHue) {
        setHue(hue)
        localStorage.setItem('hue', JSON.stringify(hue))
    }

    function updateWatchlists(watchlists:IWatchlist[]) {
        setWatchlists(watchlists)
        localStorage.setItem('watchlists', JSON.stringify(watchlists))
    }




    const providerState:typeof defaultContext = {
        hue,
        updateHue,
        watchlists,
        updateWatchlists
        
    }

    return (
        <Context.Provider value={providerState}>
            {children}
        </Context.Provider>
    )
}