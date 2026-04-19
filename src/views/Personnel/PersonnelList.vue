<template>
  <AdminLayout>
    <PageBreadcrumb pageTitle="Gestion du Personnel (RH & Paie)" />

    <div class="space-y-6">
      <!-- Tabs Navigation -->
      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 text-sm font-medium transition-colors relative',
            activeTab === tab.id
              ? 'text-brand-500 border-b-2 border-brand-500'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          ]"
        >
          {{ tab.label }}
          <span 
            v-if="tab.count" 
            class="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Action Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">
            {{ activeTab === 'registre' ? 'Registre du Personnel' : 'Suivi des Demandes RH' }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ activeTab === 'registre' 
                ? 'Liste exhaustive des employés et agents Fluxaa.' 
                : 'Workflow d\'approbation des mouvements RH (Recrutement, Modification, Départ).' 
            }}
          </p>
        </div>
        <button
          @click="openCreateRequestModal"
          class="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
        >
          <PlusIcon class="w-5 h-5" />
          Nouvelle Demande RH
        </button>
      </div>

      <!-- Content Area -->
      <div v-if="activeTab === 'registre'">
        <ComponentCard title="Employés Actifs">
          <div class="max-w-full overflow-x-auto custom-scrollbar">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700 text-left">
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Matricule</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nom & Prénom</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Poste / Grade</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Département / Site</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut</th>
                  <th class="px-5 py-3 text-right font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="member in personnel" :key="member.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td class="px-5 py-4">
                    <span class="text-sm font-semibold text-brand-500">{{ member.matricule }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xs">
                        {{ member.nom[0] }}{{ member.prenom[0] }}
                      </div>
                      <div>
                        <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {{ member.nom }} {{ member.prenom }}
                        </span>
                        <span class="block text-gray-400 text-theme-xs">
                          {{ member.nationalite }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-4">
                    <div>
                      <span class="block text-gray-800 text-theme-sm dark:text-white/90 font-medium">{{ member.intitulePoste }}</span>
                      <span class="block text-gray-500 text-theme-xs">{{ member.grade }}</span>
                    </div>
                  </td>
                  <td class="px-5 py-4">
                    <div>
                      <span class="block text-gray-800 text-theme-sm dark:text-white/90">{{ member.departement }}</span>
                      <span class="block text-gray-500 text-theme-xs">{{ member.siteTravail }}</span>
                    </div>
                  </td>
                  <td class="px-5 py-4">
                  <Badge :color="getStatusColor(member.statutAgent)" size="sm">
                    {{ member.statutAgent }}
                  </Badge>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <div class="flex justify-end gap-3">
                      <button @click="viewMember(member)" class="text-gray-400 hover:text-brand-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                      <button @click="editMember(member)" class="text-gray-400 hover:text-brand-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button @click="deleteMember(member)" class="text-gray-400 hover:text-error-500" title="Supprimer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ComponentCard>
      </div>

      <div v-else>
        <ComponentCard title="Workflow d'approbation RH">
          <div class="max-w-full overflow-x-auto custom-scrollbar">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700 text-left">
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Réf. Demande</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Employé / Action</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Priorité</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Étapes (N+1 / RH / DG)</th>
                  <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut Global</th>
                  <th class="px-5 py-3 text-right font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="req in requests" :key="req.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td class="px-5 py-4">
                    <span class="text-sm font-semibold text-gray-800 dark:text-white">{{ req.referenceDemande }}</span>
                    <span class="block text-gray-400 text-theme-xs">{{ req.dateDemande }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <div>
                      <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ req.nomComplet }}</span>
                      <Badge :color="getActionColor(req.typeAction)" size="sm" variant="solid" class="mt-1">
                        {{ req.typeAction }}
                      </Badge>
                    </div>
                  </td>
                  <td class="px-5 py-4">
                    <Badge :color="getPriorityColor(req.priorite)" size="sm">
                      {{ req.priorite }}
                    </Badge>
                  </td>
                  <td class="px-5 py-4">
                    <div class="flex gap-1.5">
                      <div v-for="(step, key) in filterSteps(req.steps)" :key="key" 
                        class="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold border"
                        :class="getStepStyle(step.status)"
                        :title="step.label + ': ' + step.status"
                      >
                        {{ key.toUpperCase() }}
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-4">
                    <Badge :color="getGlobalStatusColor(req.statusGlobal)" size="sm" variant="light">
                      {{ req.statusGlobal }}
                    </Badge>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button @click="viewRequest(req)" class="p-2 text-gray-400 hover:text-brand-500 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ComponentCard>
      </div>
    </div>

    <!-- Modals -->
    <PersonnelFormModal v-if="isFormModalOpen" @close="isFormModalOpen = false" :initialData="selectedMember" @save="handleSave" />
    <PersonnelDetailModal v-if="isDetailModalOpen" @close="isDetailModalOpen = false" :member="selectedMember" />
    <PersonnelRequestModal v-if="isRequestModalOpen" @close="isRequestModalOpen = false" :request="selectedRequest" @approve="handleActionRequest('Approuvé')" @reject="handleActionRequest('Rejeté')" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Badge from '@/components/ui/Badge.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import PersonnelFormModal from './PersonnelFormModal.vue'
import PersonnelDetailModal from './PersonnelDetailModal.vue'
import PersonnelRequestModal from './PersonnelRequestModal.vue'
import { personnelService } from '@/services/personnel.service'
import type { PersonnelMember, HRRequest } from '@/models/personnel.interface'

const activeTab = ref('registre')
const tabs = computed(() => [
  { id: 'registre', label: 'Répertoire Personnel', count: personnel.value.length },
  { id: 'workflow', label: 'Suivi des Demandes RH', count: requests.value.length }
])

const personnel = ref<PersonnelMember[]>([])
const requests = ref<HRRequest[]>([])
const isFormModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const isRequestModalOpen = ref(false)
const selectedMember = ref<PersonnelMember | null>(null)
const selectedRequest = ref<HRRequest | null>(null)

const loadData = async () => {
  personnel.value = await personnelService.getPersonnel()
  requests.value = await personnelService.getHRRequests()
}

onMounted(loadData)

// UI Helpers
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Actif': return 'success'
    case 'Suspendu': return 'error'
    case 'Congé': return 'warning'
    default: return 'light'
  }
}

const getActionColor = (action: string) => {
  switch (action) {
    case 'CRÉER': return 'success'
    case 'MODIFIER': return 'warning'
    case 'DÉPART': return 'error'
    case 'SUSPENDRE': return 'error'
    default: return 'primary'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'URGENTE': return 'error'
    case 'HAUTE': return 'warning'
    default: return 'primary'
  }
}

const getGlobalStatusColor = (status: string) => {
  switch (status) {
    case 'CLÔTURÉ': return 'success'
    case 'EN COURS': return 'warning'
    case 'REJETÉ': return 'error'
    default: return 'light'
  }
}

const getStepStyle = (status: string) => {
  switch (status) {
    case 'APPROUVÉ': return 'bg-success-50 border-success-200 text-success-600 dark:bg-success-500/10 dark:border-success-500/20'
    case 'REJETÉ': return 'bg-error-50 border-error-200 text-error-600 dark:bg-error-500/10 dark:border-error-500/20'
    case 'RENVOYÉ': return 'bg-warning-50 border-warning-200 text-warning-600 dark:bg-warning-500/10 dark:border-warning-500/20'
    case 'EN ATTENTE': return 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700'
    default: return 'bg-gray-100 border-transparent text-gray-300 opacity-50'
  }
}

const filterSteps = (steps: HRRequest['steps']) => {
  // Return steps for visual mapping
  return {
    n1: steps.n1,
    rh: steps.rh,
    dg: steps.dg
  }
}

const openCreateRequestModal = () => {
  selectedMember.value = null
  isFormModalOpen.value = true
}

const viewMember = (member: PersonnelMember) => {
  selectedMember.value = member
  isDetailModalOpen.value = true
}

const editMember = (member: PersonnelMember) => {
  // Usually modification goes through a workflow request
  selectedMember.value = member
  isFormModalOpen.value = true
}

const deleteMember = async (member: PersonnelMember) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${member.nom} ${member.prenom} ?`)) {
    await personnelService.deletePersonnel(member.id);
    await loadData();
  }
}

const viewRequest = (req: HRRequest) => {
  selectedRequest.value = req
  isRequestModalOpen.value = true
}

const handleActionRequest = (action: string) => {
  if (selectedRequest.value) {
    if (action === 'Approuvé') {
      selectedRequest.value.statusGlobal = 'CLÔTURÉ';
    } else {
      selectedRequest.value.statusGlobal = 'REJETÉ';
    }
  }
  isRequestModalOpen.value = false;
}

const handleSave = async (data: any) => {
  await loadData()
  isFormModalOpen.value = false
}
</script>
