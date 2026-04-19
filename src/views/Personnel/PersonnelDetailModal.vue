<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="false" @close="$emit('close')">
    <template #body>
      <div class="relative z-10 w-full max-w-[900px] mx-auto p-4 max-h-[95vh] overflow-y-auto custom-scrollbar">
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

          <!-- Header / En-tête -->
          <div class="pt-8 pb-6 px-8 border-b border-gray-100 dark:border-gray-800">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <!-- Avatar -->
              <div class="w-24 h-24 rounded-full bg-brand-100 dark:bg-brand-900/30 border-4 border-white dark:border-gray-900 shadow-sm flex items-center justify-center text-brand-600 dark:text-brand-400 text-3xl font-bold uppercase shrink-0">
                {{ member?.nom?.[0] }}{{ member?.prenom?.[0] }}
              </div>
              
              <!-- Info principale -->
              <div class="flex-1 text-center sm:text-left">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ member?.nom }} {{ member?.prenom }}
                  </h2>
                  <Badge :color="getStatusColor(member?.statutAgent)" size="sm" variant="solid" class="mx-auto sm:mx-0">
                    {{ member?.statutAgent }}
                  </Badge>
                </div>
                
                <p class="text-brand-600 dark:text-brand-400 font-medium text-lg mb-1">
                  {{ member?.intitulePoste }}
                </p>
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>
                    Matricule: <span class="font-semibold text-gray-700 dark:text-gray-300">{{ member?.matricule }}</span>
                  </div>
                  <div class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
                  <div class="flex items-center gap-1.5">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                     {{ member?.departement }}
                  </div>
                  <div class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
                   <div class="flex items-center gap-1.5">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                     {{ member?.siteTravail }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenu des onglets / Sections -->
          <div class="p-8 space-y-8">
             
            <!-- 1. Identité & Informations Personnelles -->
            <section>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span class="w-8 h-px bg-brand-500"></span> Identité & Civile
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Date & Lieu de naissance</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.dateNaissance }} à {{ member?.lieuNaissance }}</p>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Nationalité</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.nationalite }}</p>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Situation Familiale</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.situationMatrimoniale }} ({{ member?.enfantsACharge }} enfants)</p>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Pièce d'Identité</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.typePieceIdentite }} N° {{ member?.numeroPieceIdentite }}</p>
                  <p class="text-xs text-gray-400">Exp: {{ member?.dateExpirationPiece }}</p>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Sécurité Sociale (CNSS)</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.numeroCNSS || 'N/A' }}</p>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Groupe Sanguin</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white"><Badge color="error" variant="light" size="xs">{{ member?.groupeSanguin }}</Badge></p>
                </div>
              </div>
            </section>

             <!-- 2. Contacts -->
            <section>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span class="w-8 h-px bg-brand-500"></span> Contacts & Adresses
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div class="space-y-4">
                  <div class="space-y-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">Téléphone Mobile</span>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.telephoneMobile }}</p>
                  </div>
                  <div class="space-y-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">Email Professionnel</span>
                    <p class="text-sm font-medium text-brand-600 dark:text-brand-400">{{ member?.emailProfessionnel }}</p>
                  </div>
                   <div class="space-y-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">Adresse Complète</span>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.adresseComplete }}</p>
                  </div>
                </div>
                <div>
                   <h5 class="text-xs font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Contact d'Urgence</h5>
                   <div class="space-y-3">
                      <div class="space-y-1">
                        <span class="text-xs text-gray-500 dark:text-gray-400">Nom & Prénom</span>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.contactUrgence?.nomPrenom }}</p>
                      </div>
                      <div class="space-y-1">
                        <span class="text-xs text-gray-500 dark:text-gray-400">Lien & Téléphone</span>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.contactUrgence?.lienParente }} - {{ member?.contactUrgence?.telephone }}</p>
                      </div>
                   </div>
                </div>
              </div>
            </section>

             <!-- 3. Contrat & Rémunération -->
            <section>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span class="w-8 h-px bg-brand-500"></span> Contrat, Poste & Rémunération
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Contrat & Grade</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.typeContrat }} — <Badge color="primary" variant="light" size="xs">{{ member?.grade }}</Badge></p>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Régime de Travail</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.regimeTravail }}</p>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Responsable Hiérarchique (N+1)</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.responsableN1 }}</p>
                </div>
                <div class="space-y-1 group relative">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Salaire Brut Mensuel</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white blur-sm group-hover:blur-none transition-all cursor-pointer">
                    {{ member?.salaireBrutMensuel?.toLocaleString() }} {{ member?.monnaie }}
                  </p>
                  <span class="absolute right-0 top-1/2 text-xs text-gray-400 opacity-100 group-hover:opacity-0 transition-opacity">Survoler pour voir</span>
                </div>
                <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Données Bancaires</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.banque }}</p>
                  <p class="text-xs text-gray-500">{{ member?.numeroCompte }}</p>
                </div>
                 <div class="space-y-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Date d'embauche</span>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member?.dateEmbauche }}</p>
                </div>
              </div>
            </section>

             <!-- 4. Sécurité & Habilitations -->
            <section>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span class="w-8 h-px bg-brand-500"></span> Sécurité & Habilitations Sectorielles
              </h3>
              <div class="bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <span class="text-xs text-gray-500 dark:text-gray-400 block mb-2">Profil Système Fluxaa</span>
                        <Badge color="success" variant="light">{{ member?.statutAccesSys }}</Badge>
                        <p class="text-sm text-gray-800 dark:text-gray-200 mt-2 font-medium">{{ member?.profilFluxaa }}</p>
                    </div>
                    <div>
                         <span class="text-xs text-gray-500 dark:text-gray-400 block mb-2">Habilitations Officielles</span>
                         <div class="flex flex-wrap gap-2">
                            <Badge 
                                v-for="(hab, idx) in member?.habilitationsSpecifiques" 
                                :key="idx" 
                                color="warning" 
                                variant="outline"
                            >
                                <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                {{ hab }}
                            </Badge>
                            <span v-if="!member?.habilitationsSpecifiques?.length" class="text-sm text-gray-400">Aucune habilitation sectorielle</span>
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
             <button class="px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg shadow-theme-xs hover:bg-brand-600 flex items-center gap-2 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                Exporter Dossier
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
import type { PersonnelMember } from '@/models/personnel.interface'

defineProps<{
  member: PersonnelMember | null
}>()

defineEmits(['close'])

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'Actif': return 'success'
    case 'Suspendu': return 'error'
    case 'Congé': return 'warning'
    default: return 'light'
  }
}
</script>
