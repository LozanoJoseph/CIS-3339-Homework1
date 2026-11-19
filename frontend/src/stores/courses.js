import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../service/api'

export const useCourseStore = defineStore('courses', () => {

  const courses = ref([])
  const loading = ref(false)
  const error = ref('')

  // Retrieve courses
  const fetchCourses = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await api.get('/api/courses')
      courses.value = response.data
    } catch (err) {
      error.value = 'Unable to retrieve courses.'
    } finally {
      loading.value = false
    }
  }

  // Add course
const addCourse = async (courseData) => {
  error.value = ''

  const duplicate = courses.value.some(
    course => String(course.id) === String(courseData.id)
  )

  if (duplicate) {
    error.value = 'Course ID already exists.'
    return false
  }

  try {
    await api.post('/api/courses', courseData)
    await fetchCourses()
    return true
  } catch (err) {
    error.value = 'Unable to add course.'
    return false
  }
}

  // Delete course
  const deleteCourse = async (id) => {
    error.value = ''

    try {
      await api.delete(`/api/courses/${id}`)
      await fetchCourses()
      return true
    } catch (err) {
      error.value = 'Unable to delete course.'
      return false
    }
  }

  return {
    courses,
    loading,
    error,
    fetchCourses,
    addCourse,
    deleteCourse
  }
})
