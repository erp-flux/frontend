<template>
  <AdminLayout>
    <PageBreadcrumb pageTitle="Gestion des Bacs" />

    <div class="space-y-6">
      <div class="flex justify-end">
        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
        >
          <PlusIcon class="w-5 h-5" />
          Nouveau Bac
        </button>
      </div>

      <ComponentCard title="Liste des Bacs" desc="Gestion des bacs et de leurs capacités.">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tank ID</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Capacité</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut</p>
                </th>
                <th class="px-5 py-3 text-right sm:px-6 text-gray-500 text-theme-xs dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="bac in bacs" :key="bac.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-sm font-semibold text-brand-500">{{ bac.tankId }}</span>
                  <span class="block text-gray-400 text-theme-xs">{{ bac.description }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="block text-gray-800 text-theme-sm dark:text-white/90">
                    {{ bac.capaciteNominale }} m³
                  </span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="block text-gray-800 text-theme-sm dark:text-white/90">
                    {{ bac.statut }}
                  </span>
                </td>
                <td class="px-5 py-4 sm:px-6 text-right">
                  <div class="flex justify-end gap-3">
                    <button @click="editBac(bac)" class="text-gray-500 hover:text-brand-500 transition-colors" title="Modifier">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmDelete(bac)" class="text-gray-500 hover:text-error-500 transition-colors" title="Supprimer">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ComponentCard>
    </div>

    <BacFormStepperModal v-if="isModalOpen" :initialData="selectedBac" @close="closeModal" @save="handleSave" />
    <ConfirmationModal v-if="isDeleteModalOpen" title="Supprimer le bac" :message="`Êtes-vous sûr de vouloir supprimer ${selectedBac?.tankId} ?`" @confirm="handleDelete" @cancel="isDeleteModalOpen = false" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import BacFormStepperModal from './BacFormStepperModal.vue'
import ConfirmationModal from '@/components/ui/ConfirmationModal.vue'
import { bacService } from '@/services/bac.service'
import type { Bac } from '@/models/bac.interface'

const bacs = ref<Bac[]>([])
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedBac = ref<Bac | null>(null)

const loadBacs = async () => {
  const data = await bacService.getBacs()
  bacs.value = [...data].reverse()
}

const openCreateModal = () => {
  selectedBac.value = null
  isModalOpen.value = true
}

const editBac = (bac: Bac) => {
  selectedBac.value = bac
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedBac.value = null
}

const handleSave = async (bacData: any) => {
  if (selectedBac.value?.id) {
    await bacService.updateBac(selectedBac.value.id, bacData)
  } else {
    await bacService.addBac(bacData)
  }
  await loadBacs()
  closeModal()
}

const confirmDelete = (bac: Bac) => {
  selectedBac.value = bac
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (selectedBac.value) {
    await bacService.deleteBac(selectedBac.value.id)
    await loadBacs()
    isDeleteModalOpen.value = false
    selectedBac.value = null
  }
}

onMounted(loadBacs)
</script>
