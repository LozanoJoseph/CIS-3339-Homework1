const express = require('express')
const router = express.Router()

const Student = require('../models/Student')
const Enrollment = require('../models/Enrollment')

// GET: Retrieve all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().select('-_id -__v')

        res.status(200).json(students)
    } catch (error) {
        console.error('Error retrieving students:', error)

        res.status(500).json({
            error: 'Unable to retrieve students.'
        })
    }
})

// POST: Add a student

// POST: Add a student
router.post('/', async (req, res) => {
    try {
        const { name, id, phone, zip } = req.body

        if (!name || !id || !phone || !zip) {
            return res.status(400).json({
                error: 'All student fields are required.'
            })
        }

        // Remove formatting characters from phone number
        const normalizedPhone = String(phone).replace(/\D/g, '')

        // Validate phone number
        if (normalizedPhone.length !== 10) {
            return res.status(400).json({
                error: 'Phone number must contain exactly 10 digits.'
            })
        }

        const existingStudent = await Student.findOne({ id })

        if (existingStudent) {
            return res.status(409).json({
                error: 'Student ID already exists.'
            })
        }

        const student = await Student.create({
            name,
            id,
            phone: normalizedPhone,
            zip
        })

        res.status(201).json({
            message: 'Student added successfully.',
            student: {
                name: student.name,
                id: student.id,
                phone: student.phone,
                zip: student.zip
            }
        })
    } catch (error) {
        console.error('Error adding student:', error)

        if (error.code === 11000) {
            return res.status(409).json({
                error: 'Student ID already exists.'
            })
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Invalid student information.'
            })
        }

        res.status(500).json({
            error: 'Unable to add student.'
        })
    }
})


// DELETE: Delete a student by student ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            id: req.params.id
        })

        if (!student) {
            return res.status(404).json({
                error: 'Student not found.'
            })
        }

        await Enrollment.deleteMany({
            studentId: student.id
        })

        res.status(200).json({
            message: 'Student deleted successfully.',
            student: {
                name: student.name,
                id: student.id,
                phone: student.phone,
                zip: student.zip
            }
        })
    } catch (error) {
        console.error('Error deleting student:', error)

        res.status(500).json({
            error: 'Unable to delete student.'
        })
    }
})

module.exports = router
