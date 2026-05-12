import { Router, type Request, type Response } from 'express'
import multer from 'multer'
import db from '../db/db'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
})

const insert = db.prepare(
  'INSERT INTO recordings (mime_type, audio) VALUES (?, ?)'
)

const router = Router()

router.post('/', upload.single('audio'), (req: Request, res: Response) => {
  const file = req.file
  if (!file?.buffer?.length) {
    res.status(400).json({ error: 'Expected multipart file field "audio"' })
    return
  }
  const mime = file.mimetype || 'application/octet-stream'
  const { lastInsertRowid } = insert.run(mime, file.buffer)
  res.status(201).json({ id: Number(lastInsertRowid) })
})

router.get('/', (_req: Request, res: Response) => {
  const rows = db
    .prepare(
      `SELECT id, created_at, mime_type, length(audio) AS bytes
       FROM recordings
       ORDER BY id DESC`
    )
    .all()
  res.json(rows)
})

router.get('/:id/audio', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ error: 'invalid id' })
    return
  }
  const row = db
    .prepare('SELECT mime_type, audio FROM recordings WHERE id = ?')
    .get(id) as { mime_type: string; audio: Buffer } | undefined
  if (!row) {
    res.status(404).json({ error: 'not found' })
    return
  }
  res.setHeader('Content-Type', row.mime_type)
  res.send(row.audio)
})

export default router
