import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'


interface Session {
    id: number
    question_id: number | null
    type: 'self-improvement'
    recorded_at: string
    audio_path: string
    video_path: string | null
    transcript: string | null
    duration_secs: number | null
    topic: string | null
    self_rating: number | null
    notes: string | null
    bookmarked: number
}

const UPLOADS_DIR = path.resolve(process.cwd(),'uploads')
fs.mkdirSync(UPLOADS_DIR, {recursive:true})

// setting up how to store these uploads
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null,UPLOADS_DIR),
    filename:(_req,file,cb) => {
        const ext = file.fieldname === "video" ? ".webm" : ".webm"
        cb(null, `${Date.now()}-${file.fieldname}${ext}`)
    },
})
// middleware confige to use our storage
const upload = multer({storage})
