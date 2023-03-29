import { useEffect, useState } from "react"

export interface IWindowSize {
    width: number,
    height:number
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<IWindowSize>({width:window.innerWidth, height:window.innerHeight})

    // TODO: if this starts affecting performance, use a debounce


    useEffect(()=> {

        function handleResize() {
            setWindowSize({width:window.innerWidth, height:window.innerHeight})
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    },[])

    return windowSize
}