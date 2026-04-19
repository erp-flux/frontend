<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="false" @close="$emit('close')">
    <template #body>
      <div class="relative z-10 w-full max-w-[800px] mx-auto p-4 max-h-[95vh] overflow-y-auto custom-scrollbar">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl relative">
          <!-- Close Button -->
          <button 
            @click="$emit('close')" 
            class="absolute top-5 right-5 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 shadow-md transition-all border border-gray-100 dark:border-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Header -->
          <div class="pt-8 pb-6 px-8 border-b border-gray-100 dark:border-gray-800">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-brand-50 dark:bg-brand-900/20 text-brand-500 rounded-xl">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Demande {{ request?.referenceDemande }}</h2>
                  <Badge :color="getGlobalStatusColor(request?.statusGlobal)" size="sm">{{ request?.statusGlobal }}</Badge>
                </div>
                <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span>{{ request?.dateDemande }}</span>
                  <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Demandeur: {{ request?.demandeur }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Body -->
          <div class="p-8 space-y-8">
            <!-- Informations de base -->
            <section>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-l-4 border-brand-500 pl-3">Détails de l'action</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl">
                <div>
                  <p class="text-xs text-gray-500 mb-1">Employé Concerné</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ request?.nomComplet }} ({{ request?.matriculeConcerne }})</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Nouveau Poste / Département</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ request?.poste }} - {{ request?.departement }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Type d'Action</p>
                  <Badge :color="getActionColor(request?.typeAction)">{{ request?.typeAction }}</Badge>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Priorité</p>
                  <Badge :color="getPriorityColor(request?.priorite)">{{ request?.priorite }}</Badge>
                </div>
              </div>
            </section>

            <!-- Workflow -->
            <section>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-l-4 border-brand-500 pl-3">Circuit de validation</h3>
              <div class="space-y-4">
                <div v-for="(step, key) in request?.steps" :key="key" class="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div :class="['w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-bold text-xs uppercase', getStepIconStyle(step.status)]">
                     {{ key }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold text-gray-800 dark:text-white text-sm">{{ step.label }}</h4>
                      <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', getStepBadgeStyle(step.status)]">{{ step.status }}</span>
                    </div>
                    <div v-if="step.status !== 'EN ATTENTE' && step.status !== 'NON REQUIS'" class="text-xs text-gray-500 mt-1">
                      <p v-if="step.validatorName" class="mb-0.5">Par: <span class="font-medium text-gray-700 dark:text-gray-300">{{ step.validatorName }}</span> <span v-if="step.date">le {{ step.date }}</span></p>
                      <p v-if="step.comments" class="italic mt-1 text-gray-600 dark:text-gray-400">"{{ step.comments }}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <!-- Actions footer -->
          <div class="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 rounded-b-2xl">
             <button @click="$emit('close')" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-theme-xs hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                Fermer
             </button>
             <button v-if="request?.statusGlobal === 'EN COURS'" @click="$emit('approve', request)" class="px-5 py-2.5 text-sm font-medium text-white bg-success-500 rounded-lg shadow-theme-xs hover:bg-success-600 flex items-center gap-2 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Approuver l'étape
             </button>
             <button v-if="request?.statusGlobal === 'EN COURS'" @click="$emit('reject', request)" class="px-5 py-2.5 text-sm font-medium text-white bg-error-500 rounded-lg shadow-theme-xs hover:bg-error-600 flex items-center gap-2 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                Rejeter
             </button>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue'
import Badge from '@/components/ui/Badge.vue'
import type { HRRequest } from '@/models/personnel.interface'

defineProps<{
  request: HRRequest | null
}>()

defineEmits(['close', 'approve', 'reject'])

const getGlobalStatusColor = (status?: string) => {
  switch (status) {
    case 'CLÔTURÉ': return 'success'
    case 'EN COURS': return 'warning'
    case 'REJETÉ': return 'error'
    default: return 'light'
  }
}

const getActionColor = (action?: string) => {
  switch (action) {
    case 'CRÉER': return 'success'
    case 'MODIFIER': return 'warning'
    case 'DÉPART': return 'error'
    case 'SUSPENDRE': return 'error'
    default: return 'primary'
  }
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'URGENTE': return 'error'
    case 'HAUTE': return 'warning'
    default: return 'primary'
  }
}

const getStepIconStyle = (status: string) => {
  switch (status) {
    case 'APPROUVÉ': return 'bg-success-50 border-success-200 text-success-600 dark:bg-success-500/10 dark:border-success-500/20'
    case 'REJETÉ': return 'bg-error-50 border-error-200 text-error-600 dark:bg-error-500/10 dark:border-error-500/20'
    case 'EN ATTENTE': return 'bg-warning-50 border-warning-200 text-warning-600 dark:bg-warning-500/10 dark:border-warning-500/20'
    default: return 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700'
  }
}

const getStepBadgeStyle = (status: string) => {
  switch (status) {
    case 'APPROUVÉ': return 'text-success-600 bg-success-50 dark:bg-success-500/10'
    case 'REJETÉ': return 'text-error-600 bg-error-50 dark:bg-error-500/10'
    case 'EN ATTENTE': return 'text-warning-600 bg-warning-50 dark:bg-warning-500/10'
    default: return 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
  }
}
</script>
