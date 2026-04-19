<template>
  <AdminLayout>
    <PageBreadcrumb pageTitle="Gestion des Clients & Partenaires" />

    <div class="space-y-6">
      <!-- Create Button & Actions -->
      <div class="flex justify-end">
        <button
          @click="isModalOpen = true"
          class="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
        >
          <PlusIcon class="w-5 h-5" />
          Nouveau Client
        </button>
      </div>

      <!-- Clients Table -->
      <ComponentCard title="Registre des Tiers" desc="Liste exhaustive des partenaires et clients enregistrés sur la plateforme.">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Référence</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Raison sociale / Alpha</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Type(s) de tiers</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Canal / Pays</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Contact</p>
                </th>
                <th class="px-5 py-3 text-right sm:px-6 text-gray-500 text-theme-xs dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-sm font-semibold text-brand-500">{{ client.referenceFluxa }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ client.raisonSociale }}
                    </span>
                    <span class="block text-gray-400 text-theme-xs">
                      {{ client.alphaName }}
                    </span>
                  </div>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <div class="flex flex-wrap gap-1">
                    <Badge v-for="role in client.roles" :key="role" color="success" size="sm">
                      {{ role }}
                    </Badge>
                  </div>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <div class="space-y-1">
                    <Badge color="primary" size="sm" variant="solid">
                      {{ client.canalActivite }}
                    </Badge>
                    <span class="block text-gray-500 text-theme-xs">{{ client.pays }} ({{ client.ville }})</span>
                  </div>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <div>
                    <span class="block text-gray-800 text-theme-sm dark:text-white/90">
                      {{ client.contactPersons[0]?.nomPrenom }}
                    </span>
                    <span class="block text-gray-500 text-theme-xs">
                      {{ client.contactPersons[0]?.telephone }}
                    </span>
                  </div>
                </td>
                <td class="px-5 py-4 sm:px-6 text-right">
                  <div class="flex justify-end gap-3">
                    <!-- View -->
                    <button 
                      @click="viewClient(client)"
                      class="text-gray-500 hover:text-brand-500 transition-colors"
                      title="Voir la fiche"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <!-- Edit -->
                    <button 
                      @click="editClient(client)"
                      class="text-gray-500 hover:text-brand-500 transition-colors"
                      title="Modifier"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <!-- Delete -->
                    <button 
                      @click="confirmDelete(client)"
                      class="text-gray-500 hover:text-error-500 transition-colors"
                      title="Supprimer"
                    >
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

    <!-- Modal Formulaire (Ajout/Edition) -->
    <ClientFormModal
      v-if="isModalOpen"
      :initialData="selectedClient"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Modal Détails -->
    <ClientDetailModal
      v-if="isDetailModalOpen"
      :client="selectedClient"
      @close="isDetailModalOpen = false"
    />

    <!-- Modal Confirmation Suppression -->
    <ConfirmationModal
      v-if="isDeleteModalOpen"
      title="Supprimer le client"
      :message="`Êtes-vous sûr de vouloir supprimer ${selectedClient?.raisonSociale} ? Cette action est irréversible.`"
      @confirm="handleDelete"
      @cancel="isDeleteModalOpen = false"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Badge from '@/components/ui/Badge.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import ClientFormModal from './ClientFormModal.vue'
import ClientDetailModal from './ClientDetailModal.vue'
import ConfirmationModal from '@/components/ui/ConfirmationModal.vue'
import { clientService } from '@/services/client.service'
import type { Client } from '@/models/client.interface'

const clients = ref<Client[]>([])
const isModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedClient = ref<Client | null>(null)

const loadClients = async () => {
  const data = await clientService.getClients()
  // Trier par date/ID décroissant (ici on inverse simplement le mock)
  clients.value = [...data].reverse()
}

const openCreateModal = () => {
  selectedClient.value = null
  isModalOpen.value = true
}

const viewClient = (client: Client) => {
  selectedClient.value = client
  isDetailModalOpen.value = true
}

const editClient = (client: Client) => {
  selectedClient.value = client
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedClient.value = null
}

const handleSave = async (clientData: any) => {
  if (selectedClient.value?.id) {
    await clientService.updateClient(selectedClient.value.id, clientData)
  } else {
    await clientService.addClient(clientData)
  }
  await loadClients()
  closeModal()
}

const confirmDelete = (client: Client) => {
  selectedClient.value = client
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (selectedClient.value) {
    await clientService.deleteClient(selectedClient.value.id)
    await loadClients()
    isDeleteModalOpen.value = false
    selectedClient.value = null
  }
}

onMounted(loadClients)
</script>
