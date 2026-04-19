<template>
  <div class="space-y-4">
    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ title }}</h4>
    <div class="grid grid-cols-1 gap-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
