<template>
  <div class="fixed inset-0 flex items-center justify-center overflow-y-auto z-99999">
    <div
      v-if="fullScreenBackdrop"
      class="absolute inset-0 h-full w-full bg-gray-400/50"
      aria-hidden="true"
      @click="closeOnBackdrop ? $emit('close') : null"
    ></div>
    <slot name="body"></slot>
  </div>
</template>

<script setup lang="ts">
interface ModalProps {
  fullScreenBackdrop?: boolean
  closeOnBackdrop?: boolean
}

withDefaults(defineProps<ModalProps>(), {
  fullScreenBackdrop: false,
  closeOnBackdrop: true
})
defineEmits(['close'])
</script>
