const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        trim: true
    },
    courseId: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

// Prevent the same student from enrolling
// in the same course more than once.
enrollmentSchema.index(
    { studentId: 1, courseId: 1 },
    { unique: true }
)

module.exports = mongoose.model('Enrollment', enrollmentSchema)
