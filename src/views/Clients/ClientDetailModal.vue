<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="false" @close="$emit('close')">
    <template #body>
      <div class="relative z-10 w-full max-w-[900px] mx-auto p-4 max-h-[95vh] overflow-y-auto custom-scrollbar">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl relative overflow-hidden">
          
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

          <!-- Profile Header Section -->
          <div class="bg-brand-500 p-6 text-white relative">
            <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div class="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-2xl font-bold shadow-lg">
                {{ client.alphaName?.substring(0, 2).toUpperCase() || 'CL' }}
              </div>
              <div class="text-center md:text-left space-y-1">
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h2 class="text-2xl md:text-2xl font-bold tracking-tight">{{ client.raisonSociale }}</h2>
                  <Badge color="success" size="lg" variant="solid" class="bg-success-400 border-none">Actif</Badge>
                </div>
                <p class="text-white/80 font-medium flex items-center justify-center md:justify-start gap-2 text-sm">
                  <span class="opacity-70">Référence:</span>
                  <span class="bg-white/10 px-2 py-0.5 rounded text-xs">{{ client.referenceFluxa }}</span>
                  <span class="mx-2 opacity-30">|</span>
                  <span class="opacity-70 text-xs italic">{{ client.formeJuridique }}</span>
                </p>
              </div>
            </div>
            
            <!-- Global Stats Bar -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10">
              <div class="space-y-0.5">
                <span class="text-[10px] text-white/60 uppercase font-bold tracking-wider">Volume Habituel</span>
                <p class="text-base font-bold">{{ client.volumeHabituel }} MT</p>
              </div>
              <div class="space-y-0.5">
                <span class="text-[10px] text-white/60 uppercase font-bold tracking-wider">Risque KYC</span>
                <p class="text-base font-bold">{{ client.scoreRisqueKYC }}/10</p>
              </div>
              <div class="space-y-0.5">
                <span class="text-[10px] text-white/60 uppercase font-bold tracking-wider">Limite Crédit</span>
                <p class="text-base font-bold">{{ formatCurrency(client.limiteCredit) }}</p>
              </div>
              <div class="space-y-0.5">
                <span class="text-[10px] text-white/60 uppercase font-bold tracking-wider">Pays</span>
                <p class="text-base font-bold">{{ client.pays }}</p>
              </div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="p-5 md:p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left Column: Primary Details -->
              <section class="space-y-6">
                <DetailSection title="Informations d'Enregistrement">
                  <DetailItem label="Alpha Name" :value="client.alphaName" />
                  <DetailItem label="NIF / TIN" :value="client.nif" />
                  <DetailItem label="Raison Sociale" :value="client.raisonSociale" />
                  <DetailItem label="Canal d'activité" :value="client.canalActivite" highlight />
                </DetailSection>

                <DetailSection title="Coordonnées & Siège">
                  <DetailItem label="Adresse" :value="client.adresse" />
                  <DetailItem label="Ville" :value="client.ville" />
                  <DetailItem label="Pays d'origine" :value="client.pays" />
                </DetailSection>
              </section>

              <!-- Right Column: Finance & Contact -->
              <section class="space-y-6">
                <DetailSection title="Points de Contact">
                  <div class="bg-gray-50 dark:bg-white/[0.03] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <p class="text-sm font-bold text-gray-800 dark:text-white/90 mb-1">
                      {{ client.contactPersons[0]?.nomPrenom }}
                    </p>
                    <p class="text-xs text-gray-500 mb-3">{{ client.contactPersons[0]?.fonction }}</p>
                    <div class="space-y-2">
                       <p class="text-sm flex items-center gap-2 text-gray-600 dark:text-white/70">
                         <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                         {{ client.contactPersons[0]?.telephone }}
                       </p>
                    </div>
                  </div>
                </DetailSection>

                <DetailSection title="Détails Bancaires">
                  <div class="space-y-4">
                    <div v-for="(bank, idx) in client.bankDetails" :key="idx" class="border-l-2 border-brand-500 pl-4 py-1">
                      <p class="text-sm font-bold text-gray-800 dark:text-white/90">{{ bank.banque }}</p>
                      <p class="text-xs font-mono text-gray-500 mt-1">{{ bank.iban }}</p>
                    </div>
                  </div>
                </DetailSection>

                <DetailSection title="Comptabilité">
                  <div class="grid grid-cols-2 gap-4">
                    <DetailItem label="Clé GL" :value="client.cleGL" />
                    <DetailItem label="Monnaie" :value="client.monnaie" />
                  </div>
                </DetailSection>
              </section>
            </div>
            
            <!-- Footer Info -->
            <div class="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between gap-4">
              <p class="text-xs text-gray-400">Demande par: <span class="text-gray-500 font-medium">{{ client.demandePar }} ({{ client.departement }})</span></p>
              <p class="text-xs text-gray-400">Enregistré le: <span class="text-gray-500 font-medium">{{ formatDate(client.dateDemande) }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue'
import Badge from '@/components/ui/Badge.vue'
import DetailSection from './components/DetailSection.vue'
import DetailItem from './components/DetailItem.vue'

defineProps<{
  client: any
}>()

defineEmits(['close'])

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(val)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>
