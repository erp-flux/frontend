<template>
  <Modal :fullScreenBackdrop="true" @close="$emit('cancel')">
    <template #body>
      <div class="relative z-10 w-full max-w-[400px] mx-auto p-4">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 text-center">
          <div class="h-16 w-16 bg-error-50 dark:bg-error-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-white/90 mb-2">{{ title }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">{{ message }}</p>
          
          <div class="flex gap-3">
            <button 
              @click="$emit('cancel')"
              class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 dark:border-gray-700 dark:text-white/80 dark:hover:bg-white/5 transition-colors"
            >
              Annuler
            </button>
            <button 
              @click="$emit('confirm')"
              class="flex-1 px-4 py-2.5 rounded-lg bg-error-500 text-white font-medium hover:bg-error-600 transition-colors shadow-theme-xs"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue'

defineProps<{
  title: string
  message: string
}>()

defineEmits(['confirm', 'cancel'])
</script>
