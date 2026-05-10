import {useState,useRef, useEffect} from 'react'

export interface TimerHandler {
    remaining:number
    isRunning: boolean
    progress: number
    start:()=>void
    stop:()=>void
    reset:()=>void
}

export const useTimer = (totalSeconds:number,onComplete?:()=>void) => {
    const [remaining,setRemaining] = useState(totalSeconds)
    const [isRunning,setIsRunning] = useState(false)
    
    const internalRef = useRef<ReturnType<typeof setInterval>|null>(null)

    function start():void {
        // Check if current session is running
        if (internalRef.current) return
        // Else we are currently not in a session
        setIsRunning(true)
        // Set the ref 
        internalRef.current = setInterval(()=> {
            setRemaining(prev=>{
                if (prev <= 1){
                    // Clear interval
                    clearInterval(internalRef.current!)
                    internalRef.current = null
                    setIsRunning(false)
                    onComplete?.()
                    return 0
                }
                return prev-1
            })
        },1000)
    }

    function stop():void {
        if(internalRef.current){
            clearInterval(internalRef.current)
            internalRef.current = null
        }
        setIsRunning(false)
    }

    function reset():void {
        stop()
        setRemaining(totalSeconds)
    }

    useEffect(()=>{
        return () => {
            if (internalRef.current) clearInterval(internalRef.current)
        }
    },[])

    const progress = (totalSeconds-remaining)/ totalSeconds

    return {remaining,isRunning,progress,start,stop,reset}
}

