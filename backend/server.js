require('dotenv').config()

const path = require('path')


const connectDB = require('./config/db')
const express = require('express')
const cors = require('cors')

const studentsRouter = require('./routes/Students')
const coursesRouter = require('./routes/Courses')
const enrollmentsRouter = require('./routes/Enrollments')

const app = express()

app.use(cors())
app.use(express.json())

// MongoDB routes
app.use('/api/students', studentsRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/enrollments', enrollmentsRouter)

// Serve Vue production files
app.use(express.static(path.join(__dirname, 'public')))


// Handle Vue Router page refreshes
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api/')) {
        return res.sendFile(
            path.join(__dirname, 'public', 'index.html')
        )
    }

    next()
})


// Start server
const PORT = process.env.PORT || 3000

const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

startServer()

