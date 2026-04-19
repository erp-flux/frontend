<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="false" @close="$emit('close')">
    <template #body>
      <div class="relative z-10 w-full max-w-[800px] mx-auto p-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
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

          <ComponentCard 
            :title="initialData ? `Modifier le Client - Étape ${currentStep}/5` : `Nouveau Client - Étape ${currentStep}/5`" 
            desc="Remplissez les informations pour enregistrer un nouveau tiers."
            className="border-none shadow-none !bg-transparent"
          >
          <!-- Stepper Indicator -->
          <div class="mb-8 flex justify-between items-center px-2">
            <div v-for="step in 5" :key="step" class="flex items-center flex-1 last:flex-none">
              <div :class="[
                'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors font-bold',
                currentStep >= step ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-200 text-gray-400'
              ]">
                <span v-if="currentStep > step">✓</span>
                <span v-else>{{ step }}</span>
              </div>
              <div v-if="step < 5" :class="['h-[2px] flex-1 mx-2', currentStep > step ? 'bg-brand-500' : 'bg-gray-200']"></div>
            </div>
          </div>

          <!-- Step 1: Identité & Rôles -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Raison sociale *</label>
                <input v-model="formData.raisonSociale" type="text" placeholder="Nom officiel" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nom abrégé (Alpha name) *</label>
                <input v-model="formData.alphaName" type="text" placeholder="Code court" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Forme juridique *</label>
                <select v-model="formData.formeJuridique" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option v-for="form in LEGAL_FORMS" :key="form" :value="form">{{ form }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">NIF/TIN *</label>
                <input v-model="formData.nif" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Canal d'activité principal *</label>
                <select v-model="formData.canalActivite" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option v-for="channel in ACTIVITY_CHANNELS" :key="channel.code" :value="channel.code">{{ channel.label }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Pays d'enregistrement *</label>
                <select v-model="formData.paysEnregistrement" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option v-for="country in WEST_AFRICAN_COUNTRIES" :key="country" :value="country">{{ country }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 2: Adresse & Contacts -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Adresse (Rue et numéro) *</label>
                <input v-model="formData.adresse" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Ville *</label>
                <input v-model="formData.ville" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Pays *</label>
                <select v-model="formData.pays" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option v-for="country in WEST_AFRICAN_COUNTRIES" :key="country" :value="country">{{ country }}</option>
                </select>
              </div>
            </div>
            <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">Personne de contact</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nom & Prénom *</label>
                  <input v-model="contact.nomPrenom" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Téléphone *</label>
                  <input v-model="contact.telephone" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Finance & Banque -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Clé GL *</label>
                <input v-model="formData.cleGL" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Limite de crédit (XOF) *</label>
                <input v-model.number="formData.limiteCredit" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
            </div>
            <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">Coordonnées Bancaires</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Banque *</label>
                  <input v-model="bank.banque" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° Compte / IBAN *</label>
                  <input v-model="bank.iban" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Opérations & KYC -->
          <div v-if="currentStep === 4" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Type de mouvement principal *</label>
                <select v-model="formData.typeMouvementPrincipal" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option v-for="type in MOVEMENT_TYPES" :key="type.code" :value="type.code">{{ type.label }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Volume habituel (MT) *</label>
                <input v-model.number="formData.volumeHabituel" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
            </div>
            <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">Conformité & KYC</h4>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Score risque KYC *</label>
                <input v-model.number="formData.scoreRisqueKYC" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
            </div>
          </div>

          <!-- Step 5: Recap -->
          <div v-if="currentStep === 5" class="space-y-6">
            <div class="rounded-xl border border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">Vérification des informations</h4>
              <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <dt class="text-xs text-gray-400 uppercase">Raison Sociale</dt>
                  <dd class="text-sm font-medium text-gray-800 dark:text-white/90">{{ formData.raisonSociale || 'Non renseigné' }}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-gray-400 uppercase">Alpha Name</dt>
                  <dd class="text-sm font-medium text-gray-800 dark:text-white/90">{{ formData.alphaName || 'Non renseigné' }}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-gray-400 uppercase">Pays</dt>
                  <dd class="text-sm font-medium text-gray-800 dark:text-white/90">{{ formData.pays }}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-gray-400 uppercase">Banque</dt>
                  <dd class="text-sm font-medium text-gray-800 dark:text-white/90">{{ bank.banque || 'Non renseigné' }}</dd>
                </div>
              </dl>
            </div>
            <p class="text-xs text-center text-gray-400">En confirmant, vous enregistrez ce tiers dans le registre officiel de Fluxaa.</p>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex items-center justify-between">
            <button
              v-if="currentStep > 1"
              @click="currentStep--"
              class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:bg-white/5 transition-colors"
            >
              Précédent
            </button>
            <button
              @click="$emit('close')"
              v-else
              class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:bg-white/5 transition-colors"
            >
              Annuler
            </button>

            <button
              v-if="currentStep < 5"
              @click="currentStep++"
              class="flex items-center justify-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
            >
              Suivant
            </button>
            <button
              v-else
              @click="handleSave"
              :disabled="isSaving"
              :class="[
                'flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-white shadow-theme-xs transition-colors',
                isSaving ? 'bg-success-600 opacity-70 cursor-not-allowed' : 'bg-success-500 hover:bg-success-600'
              ]"
            >
              <template v-if="isSaving">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ initialData ? 'Mise à jour...' : 'Enregistrement...' }}
              </template>
              <template v-else>
                {{ initialData ? 'Mise à jour' : 'Enregistrer' }}
              </template>
            </button>
          </div>
        </ComponentCard>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import { LEGAL_FORMS, ACTIVITY_CHANNELS, WEST_AFRICAN_COUNTRIES, MOVEMENT_TYPES } from '@/mocks/client.mock'
import { clientService } from '@/services/client.service'

interface ClientFormProps {
  initialData?: any
}

const props = defineProps<ClientFormProps>()
const emit = defineEmits(['close', 'save'])

const currentStep = ref(1)
const isSaving = ref(false)

const contact = reactive({
  fonction: 'Directeur',
  nomPrenom: '',
  telephone: '',
  email: '',
  mobile: ''
})

const bank = reactive({
  banque: '',
  iban: '',
  swift: '',
  typeCompte: 'Courant',
  pays: 'Togo',
  principal: true
})

const formData = reactive({
  referenceFluxa: 'FLX-CLI-000',
  raisonSociale: '',
  alphaName: '',
  formeJuridique: 'SA',
  rccm: '',
  nif: '',
  paysEnregistrement: 'Togo',
  roles: ['Client dépôt'],
  canalActivite: 'FUL',
  segmentClient: 'Local',
  responsableCompte: 'Admin',
  produitsPetroliers: [],
  adresse: '',
  codePostal: '',
  ville: '',
  pays: 'Togo',
  cleGL: 'A10',
  monnaie: 'XOF',
  conditionsPaiement: 'D00',
  modePaiement: 'Virement',
  limiteCredit: 0,
  classificationABC: 'B',
  typeMouvementPrincipal: 'REC-NAV',
  volumeHabituel: 0,
  tonnageAnnuelEstime: 0,
  statutPreQual: 'Draft',
  classificationLocale: 'Locale',
  scoreRisqueKYC: 0,
  documentsFournis: [],
  dateDemande: new Date().toISOString().split('T')[0],
  demandePar: 'Admin',
  departement: 'Commercial'
})

// Peupler les données si on est en mode édition ou générer la réf si on est en création
onMounted(async () => {
  if (props.initialData) {
    Object.assign(formData, props.initialData)
    // Coordonnées imbriquées
    if (props.initialData.contactPersons?.[0]) {
      Object.assign(contact, props.initialData.contactPersons[0])
    }
    if (props.initialData.bankDetails?.[0]) {
      Object.assign(bank, props.initialData.bankDetails[0])
    }
  } else {
    // Génération automatique de la référence séquentielle
    const clients = await clientService.getClients()
    let lastNum = 0
    if (clients.length > 0) {
      // On cherche le plus grand numéro existant dans les références
      const nums = clients.map(c => {
        const parts = c.referenceFluxa.split('-')
        const lastPart = parts[parts.length - 1]
        return parseInt(lastPart) || 0
      })
      lastNum = Math.max(...nums)
    }
    const nextNum = (lastNum + 1).toString().padStart(3, '0')
    formData.referenceFluxa = `FLX-CLI-${nextNum}`
  }
})

const handleSave = () => {
  if (isSaving.value) return
  
  isSaving.value = true
  const finalData = {
    ...formData,
    contactPersons: [{ ...contact }],
    bankDetails: [{ ...bank }]
  }
  emit('save', finalData)
}
</script>
