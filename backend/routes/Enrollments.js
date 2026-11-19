const express = require('express')
const router = express.Router()

const Enrollment = require('../models/Enrollment')
const Student = require('../models/Student')
const Course = require('../models/Course')

// GET: Retrieve all enrollments
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.find().select('-_id -__v')

        res.status(200).json(enrollments)
    } catch (error) {
        console.error('Error retrieving enrollments:', error)

        res.status(500).json({
            error: 'Unable to retrieve enrollments.'
        })
    }
})

// POST: Add an enrollment
router.post('/', async (req, res) => {
    try {
        const { studentId, courseId } = req.body

        if (!studentId || !courseId) {
            return res.status(400).json({
                error: 'Student ID and Course ID are required.'
            })
        }

        // Check that the student exists
        const student = await Student.findOne({ id: studentId })

        if (!student) {
            return res.status(404).json({
                error: 'Student not found.'
            })
        }

        // Check that the course exists
        const course = await Course.findOne({ id: courseId })

        if (!course) {
            return res.status(404).json({
                error: 'Course not found.'
            })
        }

        // Prevent duplicate enrollments
        const existingEnrollment = await Enrollment.findOne({
            studentId,
            courseId
        })

        if (existingEnrollment) {
            return res.status(409).json({
                error: 'Student is already enrolled in this course.'
            })
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            studentId,
            courseId
        })

        res.status(201).json({
            message: 'Student enrolled successfully.',
            enrollment: {
                studentId: enrollment.studentId,
                courseId: enrollment.courseId
            }
        })

    } catch (error) {
        console.error('Error creating enrollment:', error)

        if (error.code === 11000) {
            return res.status(409).json({
                error: 'Student is already enrolled in this course.'
            })
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Invalid enrollment information.'
            })
        }

        res.status(500).json({
            error: 'Unable to create enrollment.'
        })
    }
})

module.exports = router
