import { useState, useRef } from 'react'

export interface RecorderHandle {
    isRecording: boolean
    audioBlob: Blob | null
    durationSec: number
    startRecording: () => Promise<void>
    stopRecording: () => void

}

export function useRecorder(): RecorderHandle {
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [durationSec, setDurationSec] = useState(0)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunkRef = useRef<Blob[]>([])
    const startTimeRef = useRef<number>(0)

    async function startRecording(): Promise<void> {
        // Ask for permission to use hardware
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
        // Now we attach listener for available data and stoping 
        mediaRecorder.addEventListener('dataavailable', (e) => {
            if (e.data.size > 0) chunkRef.current.push(e.data)
        })
        mediaRecorder.addEventListener('stop', () => {
            const blob = new Blob(chunkRef.current, { type: 'audio/webm;codecs=opus' })
            setAudioBlob(blob)
            setDurationSec((Date.now() - startTimeRef.current) / 1000)
            setIsRecording(false)
            chunkRef.current = []
            stream.getTracks().forEach(t => t.stop())
        })
        // Start recording
        mediaRecorderRef.current = mediaRecorder
        startTimeRef.current = Date.now()
        mediaRecorder.start(100)
        setIsRecording(true)
    }

    function stopRecording(): void {
        mediaRecorderRef.current?.stop()
    }

    return { isRecording, audioBlob, durationSec, startRecording, stopRecording }
}