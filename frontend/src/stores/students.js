import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../service/api'
import { normalizePhone } from '../utility/formatphone'
export const useStudentStore = defineStore('students', () => {

  const students = ref([])
  const loading = ref(false)
  const error = ref('')

  // Retrieve students
  const fetchStudents = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await api.get('/api/students')
      students.value = response.data
    } catch (err) {
      error.value = 'Unable to retrieve students.'
    } finally {
      loading.value = false
    }
  }

  // Add student
// Add student
const addStudent = async (studentData) => {
    error.value = ''

    const duplicate = students.value.some(
        student => String(student.id) === String(studentData.id)
    )

    if (duplicate) {
        error.value = 'Student ID already exists.'
        return false
    }

    try {
        const newStudent = {
            ...studentData,
            phone: normalizePhone(studentData.phone)
        }

        if (newStudent.phone.length !== 10) {
            error.value = 'Phone number must contain exactly 10 digits.'
            return false
        }

        await api.post('/api/students', newStudent)
        await fetchStudents()
        return true
    } catch (err) {
        error.value =
            err.response?.data?.error ||
            err.response?.data?.message ||
            'Unable to add student.'
        return false
    }
}
  // Delete student
  const deleteStudent = async (id) => {
    error.value = ''

    try {
      await api.delete(`/api/students/${id}`)
      await fetchStudents()
      return true
    } catch (err) {
    error.value =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Unable to delete student.'
      return false
  }
}

  return {
    students,
    loading,
    error,
    fetchStudents,
    addStudent,
    deleteStudent
  }
})
