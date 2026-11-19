
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../service/api'

export const useEnrollmentStore = defineStore('enrollments', () => {
  const enrollments = ref([])
  const loading = ref(false)
  const error = ref('')
  const success = ref('')

  const fetchEnrollments = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await api.get('/api/enrollments')
      enrollments.value = response.data
      return true
    } catch (err) {
      error.value = 'Unable to retrieve enrollments.'
      return false
    } finally {
      loading.value = false
    }
  }

  const addEnrollment = async (studentId, courseId) => {
    error.value = ''
    success.value = ''

    // Check for an existing enrollment
    const duplicate = enrollments.value.some(enrollment =>
      String(enrollment.studentId) === String(studentId) &&
      String(enrollment.courseId) === String(courseId)
    )

    if (duplicate) {
      error.value = 'This student is already enrolled in this course.'
      return false
    }

    try {
      await api.post('/api/enrollments', {
        studentId,
        courseId
      })

      const refreshed = await fetchEnrollments()

      if (!refreshed) return false

      success.value = 'Student successfully enrolled.'
      return true
    } catch (err) {
      error.value = err.response?.data?.message ||
        'Unable to enroll student.'
      return false
    }
  }

  return {
    enrollments,
    loading,
    error,
    success,
    fetchEnrollments,
    addEnrollment
  }
})
