import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './models/db.js'
import router from './routes/route.js'

dotenv.config()
const app = express()
app.use(express.json())
const port = 8080

await connectDB()

app.get('/', (req, res) => res.send("<h1>API is Working!</h1>"))

app.use('/auth', router)

app.listen(port, () => console.log("Server is listening in port : ", port))

