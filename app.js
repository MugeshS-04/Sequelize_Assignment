import express from 'express'
import dotenv from 'dotenv'
import db from './models/index.js'
import auth_router from './routes/auth_route.js'
import user_router from './routes/user_route.js'
import { errors } from 'celebrate'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded())


await db.connectDB()

app.get('/', (req, res) => res.send("<h1>API is Working!</h1>"))

app.use('/auth', auth_router)
app.use('/user', user_router)

app.use(errors())

export default app