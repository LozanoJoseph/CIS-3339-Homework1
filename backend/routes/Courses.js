const express = require('express')
const router = express.Router()

const Course = require('../models/Course')
const Enrollment = require('../models/Enrollment')

// GET: Retrieve all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().select('-_id -__v')

        res.status(200).json(courses)
    } catch (error) {
        console.error('Error retrieving courses:', error)

        res.status(500).json({
            error: 'Unable to retrieve courses.'
        })
    }
})

// POST: Add a course
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body

        if (!id || !name) {
            return res.status(400).json({
                error: 'Course ID and course name are required.'
            })
        }

        const existingCourse = await Course.findOne({ id })

        if (existingCourse) {
            return res.status(409).json({
                error: 'Course ID already exists.'
            })
        }

        const course = await Course.create({
            id,
            name
        })

        res.status(201).json({
            message: 'Course added successfully.',
            course: {
                id: course.id,
                name: course.name
            }
        })
    } catch (error) {
        console.error('Error adding course:', error)

        if (error.code === 11000) {
            return res.status(409).json({
                error: 'Course ID already exists.'
            })
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Invalid course information.'
            })
        }

        res.status(500).json({
            error: 'Unable to add course.'
        })
    }
})

// DELETE: Delete a course by course ID
// DELETE: Delete a course by course ID
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({
            id: req.params.id
        })

        if (!course) {
            return res.status(404).json({
                error: 'Course not found.'
            })
        }

        // Delete all enrollments associated with this course
        await Enrollment.deleteMany({
            courseId: course.id
        })

        res.status(200).json({
            message: 'Course and enrollments deleted successfully.'
        })

    } catch (error) {
        console.error('Error deleting course:', error)

        res.status(500).json({
            error: 'Unable to delete course.'
        })
    }
})

module.exports = router
