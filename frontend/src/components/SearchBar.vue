
<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

const searchText = defineModel()
</script>

<template>
  <div>
    <input
      v-model="searchText"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>
