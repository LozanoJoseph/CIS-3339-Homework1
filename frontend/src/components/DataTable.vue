
<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  records: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.label }}
        </th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="record in records" :key="record.id">
        <td v-for="column in columns" :key="column.key">
          {{ record[column.key] }}
        </td>

        <td>
          <button @click="emit('delete', record.id)">
            Delete
          </button>
        </td>
      </tr>

      <tr v-if="records.length === 0">
        <td :colspan="columns.length + 1">
          No records found.
        </td>
      </tr>
    </tbody>
  </table>
</template>
