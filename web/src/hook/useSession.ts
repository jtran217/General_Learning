const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001"

export interface RecordingSummary {
  id: number
  created_at: string
  mime_type: string
  bytes: number
}

export interface SessionHandler {
  saveSession: (audioBlob: Blob) => Promise<number>
  listRecordings: () => Promise<RecordingSummary[]>
}

export function recordingAudioUrl(id: number): string {
  return `${API_BASE}/api/recordings/${id}/audio`
}

export function useSession(): SessionHandler {
  async function saveSession(audioBlob: Blob): Promise<number> {
    const formData = new FormData()
    formData.append("audio", audioBlob, "recording.webm")
    const res = await fetch(`${API_BASE}/api/recordings`, {
      method: "POST",
      body: formData,
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(
        typeof err?.error === "string" ? err.error : `Save failed (${res.status})`
      )
    }
    const data = (await res.json()) as { id: number }
    return data.id
  }

  async function listRecordings(): Promise<RecordingSummary[]> {
    const res = await fetch(`${API_BASE}/api/recordings`)
    if (!res.ok) {
      throw new Error(`List failed (${res.status})`)
    }
    return res.json() as Promise<RecordingSummary[]>
  }

  return { saveSession, listRecordings }
}
