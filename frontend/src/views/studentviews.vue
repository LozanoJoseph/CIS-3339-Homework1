<script setup>
import { ref, computed, onMounted } from 'vue'

import AppNavigation from '../components/AppNavigation.vue'
import SearchBar from '../components/SearchBar.vue'
import DataForm from '../components/DataForm.vue'
import DataTable from '../components/DataTable.vue'
import { useStudentStore } from '../stores/students'
import { formatPhone } from '../utility/formatphone'

const studentStore = useStudentStore()

const searchName = ref('')

const studentFields = [
  { key: 'name', label: 'Name' },
  { key: 'id', label: 'ID' },
  { key: 'phone', label: 'Phone' },
  { key: 'zip', label: 'Zip' }
]

const studentColumns = [
  { key: 'name', label: 'Name' },
  { key: 'id', label: 'ID' },
  { key: 'phone', label: 'Phone' },
  { key: 'zip', label: 'Zip' }
]

const filteredStudents = computed(() => {
    const search = searchName.value.trim().toLowerCase()

    return studentStore.students
        .filter(student =>
            String(student.name || '').toLowerCase().includes(search)
        )
        .map(student => ({
            ...student,
            phone: formatPhone(student.phone)
        }))
})

const addStudent = async (studentData) => {
  await studentStore.addStudent(studentData)
}

const deleteStudent = async (id) => {
  await studentStore.deleteStudent(id)
}

onMounted(() => {
  studentStore.fetchStudents()
})
</script>

<template>
  <div class="container">
    <AppNavigation />

    <h1>Students</h1>

    <SearchBar
      v-model="searchName"
      placeholder="Search for a student"
    />

    <h2>Add a Student</h2>

    <DataForm
      :fields="studentFields"
      button-text="Add Student"
      @submit="addStudent"
    />

    <p v-if="studentStore.loading">Loading students...</p>
    <p v-if="studentStore.error">{{ studentStore.error }}</p>

    <h2>Student Results</h2>

    <DataTable
      :columns="studentColumns"
      :records="filteredStudents"
      @delete="deleteStudent"
    />
  </div>
</template>
