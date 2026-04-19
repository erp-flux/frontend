<template>
  <div class="flex flex-col space-y-1">
    <span class="text-xs text-gray-500 dark:text-gray-400">{{ label }}</span>
    <span 
      :class="[
        'text-sm font-medium',
        highlight ? 'text-brand-500 font-bold' : 'text-gray-800 dark:text-white/90'
      ]"
    >
      {{ value || '—' }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value?: string | number
  highlight?: boolean
}>()
</script>
