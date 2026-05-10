import { useTimer } from "@/hook/useTimer";
import Timer from "./components/Timer";
import Recorder from "./components/Recorder";
import { useRecorder } from "@/hook/useRecorder";
import { useState } from "react";

const RECORDING_SECS = 60
const BRAINSTORM_SECS = 60

export default function RecorderDemo() {
    const recordingTimer = useTimer(60)
    const brainstormTimer = useTimer(60)
    const [stage, setStage] = useState('brainstorm')
    const recorder = useRecorder()

    async function handleStartRecording() {
        brainstormTimer.stop()
        setStage('recording')
        await recorder.startRecording()
        recordingTimer.start()
    }

    function handleStopEarly() {
        recordingTimer.stop()
        recorder.stopRecording()
        setStage('done')
    }

    return (
        <div>
            {stage === 'brainstorm' && (
                <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Brainstorm</h1>
                        <p className="text-gray-400 text-sm mt-1">Organise your thoughts — recording starts after</p>
                    </div>

                    <Timer
                        remaining={brainstormTimer.remaining}
                        total={BRAINSTORM_SECS}
                        isRunning={brainstormTimer.isRunning}
                    />

                    <button
                        onClick={handleStartRecording}
                        className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors"
                    >
                        Start recording →
                    </button>
                </div>
            )}

            {/* ── Recording ── */}
            {stage === 'recording' && (
                <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Recording</h1>
                        <p className="text-gray-300 text-sm mt-1">"{"AAHH"}"</p>
                    </div>

                    <Timer
                        remaining={recordingTimer.remaining}
                        total={RECORDING_SECS}
                        isRunning={recordingTimer.isRunning}
                    />
                    <Recorder
                        isRecording={recorder.isRecording}
                        audioBlob={recorder.audioBlob}
                        durationSecs={recorder.durationSec}
                        onStart={recorder.startRecording}
                        onStop={handleStopEarly}
                    />
                    <button
                        onClick={handleStopEarly}
                        className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    >
                        Stop early
                    </button>
                </div>
            )}

            {stage === 'done' && (
                <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Done</h1>
                        <p className="text-gray-400 text-sm mt-1">Great work</p>
                    </div>

                </div>
            )}
        </div>)
}