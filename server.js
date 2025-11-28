import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './helper/db.js'
import route from './routes/route.js'

dotenv.config()
const app = express()
app.use(express.json())
const port = 8080

await connectDB()

app.get('/', (req, res) => res.send("<h1>API is Working!</h1>"))

app.use('/auth', route)

app.listen(port, () => console.log("Server is listening in port : ", port))

// //delete


// //update
// const upd = await student.update({ name : "Mugesh", age : 22 }, { where : {email : "mugesh.s@rently.com"} })
// console.log(upd)

