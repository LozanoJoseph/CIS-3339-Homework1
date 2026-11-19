
<script setup>
import { reactive } from 'vue'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Submit'
  }
})

const emit = defineEmits(['submit'])

// Store the form values
const formData = reactive({})

// Create an empty value for each field
props.fields.forEach(field => {
  formData[field.key] = ''
})

// Submit the form
const submitForm = () => {
  emit('submit', { ...formData })

  // Clear the form
  props.fields.forEach(field => {
    formData[field.key] = ''
  })
}
</script>

<template>
  <form @submit.prevent="submitForm">

    <div v-for="field in fields" :key="field.key">
      <label :for="field.key">
        {{ field.label }}
      </label>

      <input
        :id="field.key"
        v-model="formData[field.key]"
        :type="field.type || 'text'"
        :placeholder="field.label"
        required
      />
    </div>

    <button type="submit">
      {{ buttonText }}
    </button>

  </form>
</template>
