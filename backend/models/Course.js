const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    id: false
})

module.exports = mongoose.model('Course', courseSchema)
