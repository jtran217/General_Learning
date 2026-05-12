import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import recordingsRouter from './routes/recordings'

const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/recordings', recordingsRouter)

app.listen(PORT, () => {
    console.log("Dummy express server up and running")
})