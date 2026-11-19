
<template>
  <nav>
    <RouterLink to="/">Students</RouterLink>
    |
    <RouterLink to="/courses">Courses</RouterLink>
    |
    <RouterLink to="/enrollments">Enrollments</RouterLink>

  </nav>
</template>

<style scoped>
nav {
  display: flex;
  gap: 15px;
  padding: 15px;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
  color: blue;
}
</style>
