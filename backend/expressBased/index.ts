import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'


const PORT = 3001
const UPLOADS_DIR = path.resolve(process.cwd(),'uploads')
// wait till we make folder before proceeding with code execution.
fs.mkdirSync(UPLOADS_DIR, {recursive:true})

const app = express()
// .use is registering middleware
// Order matters here, top -> down
app.use(cors())
app.use(express.json())

app.use('/api/sessions', sessionsRouter)

app.listen(PORT, () => {
    console.log("Dummy express server up and running")
})