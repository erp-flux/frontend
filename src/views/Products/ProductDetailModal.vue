<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative z-10 w-full max-w-[600px] mx-auto p-4">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden relative">
          <button 
            @click="$emit('close')" 
            class="absolute top-5 right-5 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 shadow-md transition-all border border-gray-100 dark:border-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Détails du produit</h3>
            
            <div class="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="block text-xs font-medium text-gray-500">Code Article</span>
                  <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ product?.codeArticle }}</span>
                </div>
                <div>
                  <span class="block text-xs font-medium text-gray-500">Désignation</span>
                  <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ product?.description }}</span>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="block text-xs font-medium text-gray-500">Type Article</span>
                  <span class="block text-sm text-gray-900 dark:text-white">{{ product?.typeArticle }}</span>
                </div>
                <div>
                  <span class="block text-xs font-medium text-gray-500">Code GL</span>
                  <span class="block text-sm text-gray-900 dark:text-white">{{ product?.codeGL }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="block text-xs font-medium text-gray-500">Prix Standard</span>
                  <span class="block text-sm font-bold text-brand-500">{{ product?.prixStandard }} XOF</span>
                </div>
                <div>
                  <span class="block text-xs font-medium text-gray-500">Coût Standard</span>
                  <span class="block text-sm font-bold text-orange-500">{{ product?.coutStandard }} XOF</span>
                </div>
              </div>

              <div class="border-t border-gray-100 dark:border-gray-800 my-4 pt-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Tarification & Logistique</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <span class="block text-xs font-medium text-gray-500">Groupe Prix Client</span>
                    <span class="block text-sm text-gray-900 dark:text-white font-medium">{{ product?.groupePrixClient || 'Aucun' }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500">Niveau Prix Vente</span>
                    <span class="block text-sm text-gray-900 dark:text-white font-medium">Niveau {{ product?.niveauPrixVente || '1' }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500">Méthode Prix Achat</span>
                    <span class="block text-sm text-gray-900 dark:text-white font-medium">Méthode {{ product?.methodePrixAchat || '2' }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500">Groupe Réapprovisionnement</span>
                    <span class="block text-sm text-gray-900 dark:text-white font-medium">{{ product?.groupeReapprovisionnement || 'Aucun' }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500">Groupe Dispatch</span>
                    <span class="block text-sm text-gray-900 dark:text-white font-medium">{{ product?.groupeDispatch || 'Aucun' }}</span>
                  </div>
                </div>
              </div>

              <div v-if="product?.messageImpression || product?.messageCommande || product?.remarques" class="border-t border-gray-100 dark:border-gray-800 my-4 pt-4 space-y-3">
                <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400">Notes & Messages</h4>
                <div v-if="product?.messageImpression">
                  <span class="block text-xs font-medium text-gray-500">Message d'impression</span>
                  <span class="block text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg mt-1 border border-gray-100 dark:border-gray-800/80">{{ product.messageImpression }}</span>
                </div>
                <div v-if="product?.messageCommande">
                  <span class="block text-xs font-medium text-gray-500">Message à la commande</span>
                  <span class="block text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg mt-1 border border-gray-100 dark:border-gray-800/80">{{ product.messageCommande }}</span>
                </div>
                <div v-if="product?.remarques">
                  <span class="block text-xs font-medium text-gray-500">Remarques internes</span>
                  <span class="block text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg mt-1 border border-gray-100 dark:border-gray-800/80">{{ product.remarques }}</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue'
import type { Product } from '@/models/product.interface'

defineProps<{ product: Product | null }>()
defineEmits(['close'])
</script>
