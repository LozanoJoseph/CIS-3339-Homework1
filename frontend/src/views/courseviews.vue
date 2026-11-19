<script setup>
import { ref, computed, onMounted } from 'vue'

import AppNavigation from '../components/AppNavigation.vue'
import SearchBar from '../components/SearchBar.vue'
import DataForm from '../components/DataForm.vue'
import DataTable from '../components/DataTable.vue'

import { useCourseStore } from '../stores/courses'

// Initialize Pinia store
const courseStore = useCourseStore()

// Search input
const searchName = ref('')

// Course form fields
const courseFields = [
  { key: 'name', label: 'Course Name' },
  { key: 'id', label: 'Course ID' }
]

// Course table columns
const courseColumns = [
  { key: 'name', label: 'Course Name' },
  { key: 'id', label: 'Course ID' }
]

// Filter courses
const filteredCourses = computed(() => {
  const search = searchName.value.trim().toLowerCase()

  return courseStore.courses.filter(course =>
    String(course.name || '').toLowerCase().includes(search)
  )
})

// Add course using Pinia store
const addCourse = async (courseData) => {
  const success = await courseStore.addCourse(courseData)

  if (success) {
    searchName.value = ''
  }
}

// Delete course using Pinia store
const deleteCourse = async (id) => {
  await courseStore.deleteCourse(id)
}

// Fetch courses when page loads
onMounted(() => {
  courseStore.fetchCourses()
})
</script>

<template>
  <div class="container">

    <AppNavigation />

    <h1>Courses</h1>

    <!-- Search Courses -->
    <section>
      <h2>Search for a Course</h2>

      <SearchBar
        v-model="searchName"
        placeholder="Search for a course"
      />
    </section>

    <!-- Add Course -->
    <section>
      <h2>Add a Course</h2>

      <DataForm
        :fields="courseFields"
        button-text="Add Course"
        @submit="addCourse"
      />
    </section>

    <!-- Feedback -->
    <p v-if="courseStore.loading">
      Loading courses...
    </p>

    <p v-if="courseStore.error">
      {{ courseStore.error }}
    </p>

    <!-- Course Table -->
    <section>
      <h2>Course Results</h2>

      <DataTable
        :columns="courseColumns"
        :records="filteredCourses"
        @delete="deleteCourse"
      />
    </section>

  </div>
</template>
