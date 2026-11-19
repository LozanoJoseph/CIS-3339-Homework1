import { createRouter, createWebHistory } from 'vue-router'
import StudentsView from '../views/studentviews.vue'
import CoursesView from '../views/courseviews.vue'
import EnrollmentView from '../views/enrollmentviews.vue'
const routes = [
  {
    path: '/',
    component: StudentsView
  },
  {
    path: '/courses',
    component: CoursesView
  },
  {
    path: '/enrollments',
    component: EnrollmentView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router