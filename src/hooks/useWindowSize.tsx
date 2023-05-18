import { useCallback, useEffect, useState } from "react"

export interface IWindowSize {
    width: number,
    height:number
}

function getNearestMultiple(input:number, multiple:number) {
    return Math.round(input / multiple) * multiple
}



export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<IWindowSize>({width:window.innerWidth, height:window.innerHeight})


    // TODO: if this starts affecting performance, use a debounce


    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        // if (Math.abs(width - windowSize.width) >= 100) {
        //     console.log('>>> update Window Size')
        //     setWindowSize({ width, height: window.innerHeight });
        // }
        const real = window.innerWidth
        const calculated = getNearestMultiple(width,50)
        
        if ((real >= calculated && windowSize.width < calculated) || (real <= calculated && windowSize.width > calculated)) {
            console.log('>>> update Window Size')
            setWindowSize({ width:getNearestMultiple(width,50), height: window.innerHeight });
        }else {
            console.log('>>> ---',width, windowSize.width)
        }
    }, [windowSize.width]);

    useEffect(()=> {

        // function handleResize() {
        //     const width = window.innerWidth
        //     if (width > windowSize.width + 100 || width < windowSize.width - 100) {
        //         console.log('>>> update Window Size')
        //         setWindowSize({width:window.innerWidth, height:window.innerHeight})
        //     } else {
        //         console.log('>>> ---',width, windowSize.width)
        //     }
        // }

        

        // function handleResize() {
        //     setWindowSize({width:window.innerWidth, height:window.innerHeight})
        // }

        

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    },[handleResize])

    return windowSize
}