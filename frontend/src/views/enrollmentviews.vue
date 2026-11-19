<script setup>
import { ref, computed, onMounted } from 'vue'

import AppNavigation from '../components/AppNavigation.vue'

import { useStudentStore } from '../stores/students'
import { useCourseStore } from '../stores/courses'
import { useEnrollmentStore } from '../stores/enrollments'

const studentStore = useStudentStore()
const courseStore = useCourseStore()
const enrollmentStore = useEnrollmentStore()

// Selected values for the enrollment form
const selectedStudentId = ref('')
const selectedCourseId = ref('')

// Separate selection for viewing enrolled students
const viewCourseId = ref('')

// Find students enrolled in the selected course
const enrolledStudents = computed(() => {
  return enrollmentStore.enrollments
    .filter(enrollment =>
      String(enrollment.courseId) === String(viewCourseId.value)
    )
    .map(enrollment =>
      studentStore.students.find(student =>
        String(student.id) === String(enrollment.studentId)
      )
    )
    .filter(student => student !== undefined)
})

// Submit a new enrollment
const enrollStudent = async () => {
  if (!selectedStudentId.value || !selectedCourseId.value) {
    enrollmentStore.error = 'Please select a student and course.'
    return
  }

  const success = await enrollmentStore.addEnrollment(
    selectedStudentId.value,
    selectedCourseId.value
  )

  if (success) {
    selectedStudentId.value = ''
    selectedCourseId.value = ''
  }
}

// Load students, courses, and enrollments
onMounted(async () => {
  await Promise.all([
    studentStore.fetchStudents(),
    courseStore.fetchCourses(),
    enrollmentStore.fetchEnrollments()
  ])
})
</script>

<template>
  <div class="container">
    <AppNavigation />

    <h1>Enrollment Management</h1>

    <!-- Enroll a student -->
    <section>
      <h2>Enroll a Student</h2>

      <form @submit.prevent="enrollStudent">

        <div>
          <label for="student">Select Student:</label>

          <select
            id="student"
            v-model="selectedStudentId"
            required
          >
            <option value="" disabled>Select a student</option>

            <option
              v-for="student in studentStore.students"
              :key="student.id"
              :value="student.id"
            >
              {{ student.name }} ({{ student.id }})
            </option>
          </select>
        </div>

        <div>
          <label for="course">Select Course:</label>

          <select
            id="course"
            v-model="selectedCourseId"
            required
          >
            <option value="" disabled>Select a course</option>

            <option
              v-for="course in courseStore.courses"
              :key="course.id"
              :value="course.id"
            >
              {{ course.name }} ({{ course.id }})
            </option>
          </select>
        </div>

        <button
          type="submit"
          :disabled="
            enrollmentStore.loading ||
            !selectedStudentId ||
            !selectedCourseId
          "
        >
          Enroll Student
        </button>
      </form>

      <p v-if="enrollmentStore.error" class="error">
        {{ enrollmentStore.error }}
      </p>

      <p v-if="enrollmentStore.success" class="success">
        {{ enrollmentStore.success }}
      </p>

      <p v-if="enrollmentStore.loading">
        Loading...
      </p>
    </section>

    <hr />

    <!-- View students enrolled in a course -->
    <section>
      <h2>Students Enrolled in a Course</h2>

      <label for="viewCourse">Select Course:</label>

      <select id="viewCourse" v-model="viewCourseId">
        <option value="" disabled>Select a course</option>

        <option
          v-for="course in courseStore.courses"
          :key="course.id"
          :value="course.id"
        >
          {{ course.name }} ({{ course.id }})
        </option>
      </select>

      <p v-if="viewCourseId && enrolledStudents.length === 0">
        No students enrolled in this course.
      </p>

      <table v-if="viewCourseId && enrolledStudents.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Phone</th>
            <th>Zip</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="student in enrolledStudents"
            :key="student.id"
          >
            <td>{{ student.name }}</td>
            <td>{{ student.id }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.zip }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

