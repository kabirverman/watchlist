import { createContext, ReactNode, useContext, useState } from "react"
import { IHue } from "../Interfaces"
import { getRandomHue } from "../utils/hues"

export const Context = createContext({
    hue:getRandomHue(),
    updateHue: (hue:IHue) => {}
})

interface IMainProviderProps {
    children:ReactNode
}

export default function MainProvider({children}:IMainProviderProps) {
    const defaultContext = useContext(Context)
    const [hue, setHue] = useState(defaultContext.hue)


    function updateHue(hue:IHue) {
        setHue(hue)
    }



    const providerState:typeof defaultContext = {
        hue,
        updateHue,
        
    }

    return (
        <Context.Provider value={providerState}>
            {children}
        </Context.Provider>
    )
}