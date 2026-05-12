import { useTimer } from "@/hook/useTimer";
import Timer from "./components/Timer";
import Recorder from "./components/Recorder";
import { useRecorder } from "@/hook/useRecorder";
import { useState } from "react";
import { recordingAudioUrl, useSession, type RecordingSummary } from "@/hook/useSession";
const RECORDING_SECS = 60
const BRAINSTORM_SECS = 60

export default function RecorderDemo() {
    const [saved, setSaved] = useState(false)
    const [saving, setSaving] = useState(false)
    const [lastSavedId, setLastSavedId] = useState<number | null>(null)
    const [recordings, setRecordings] = useState<RecordingSummary[]>([])
    const [verifyError, setVerifyError] = useState<string | null>(null)
    const recordingTimer = useTimer(60)
    const brainstormTimer = useTimer(60)
    const [stage, setStage] = useState('brainstorm')
    const recorder = useRecorder()
    const { saveSession, listRecordings } = useSession()

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
    async function handleSave() {
        if (!recorder.audioBlob) return
        setSaving(true)
        setVerifyError(null)
        try {
            const id = await saveSession(recorder.audioBlob)
            setLastSavedId(id)
            setSaved(true)
            try {
                const rows = await listRecordings()
                setRecordings(rows)
            } catch (e2) {
                setVerifyError(
                    e2 instanceof Error ? e2.message : "Could not load list — try Refresh"
                )
            }
        } catch (e) {
            setVerifyError(e instanceof Error ? e.message : "Save failed")
        } finally {
            setSaving(false)
        }
    }

    async function handleRefreshList() {
        setVerifyError(null)
        try {
            const rows = await listRecordings()
            setRecordings(rows)
        } catch (e) {
            setVerifyError(e instanceof Error ? e.message : "Could not load list")
        }
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
                <div className="flex flex-col items-center gap-6 w-full max-w-md">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Done</h1>
                        <p className="text-gray-400 text-sm mt-1">Great work</p>
                    </div>
                    {saved ? (
                        <div className="w-full max-w-md flex flex-col gap-4">
                            <p className="text-green-400 font-medium text-center">
                                Session saved ✓
                                {lastSavedId != null && (
                                    <span className="block text-sm text-gray-400 font-normal mt-1">
                                        Recording id {lastSavedId} (stored in DB)
                                    </span>
                                )}
                            </p>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h2 className="text-sm font-semibold text-gray-200">
                                        Verify on server
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={handleRefreshList}
                                        className="text-xs text-indigo-400 hover:text-indigo-300"
                                    >
                                        Refresh list
                                    </button>
                                </div>
                                {verifyError && (
                                    <p className="text-sm text-red-400 mb-2">{verifyError}</p>
                                )}
                                {recordings.length === 0 ? (
                                    <p className="text-xs text-gray-500">
                                        No rows yet — hit Refresh if the server was slow.
                                    </p>
                                ) : (
                                    <ul className="space-y-2 text-xs text-gray-300 max-h-40 overflow-y-auto">
                                        {recordings.map((r) => (
                                            <li
                                                key={r.id}
                                                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 pb-2 last:border-0"
                                            >
                                                <span>
                                                    <span className="text-gray-400">#{r.id}</span>{" "}
                                                    {r.bytes.toLocaleString()} bytes · {r.mime_type}
                                                </span>
                                                <a
                                                    href={recordingAudioUrl(r.id)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-400 hover:text-indigo-300 shrink-0"
                                                >
                                                    Play audio
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleSave}
                            disabled={saving || !recorder.audioBlob}
                            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving…' : 'Save session'}
                        </button>
                    )}
                </div>

            )}
        </div>)
}