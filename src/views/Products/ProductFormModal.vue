<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="false" @close="$emit('close')">
    <template #body>
      <!-- Modal Container: flex flex-col to enable scrolling on body only, with fixed height -->
      <div class="relative z-10 w-full max-w-[800px] mx-auto p-4 flex flex-col max-h-[90vh]">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl relative flex flex-col overflow-hidden max-h-[calc(90vh-2rem)]">
          
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

          <!-- Modal Header (Always Pinned at the top, does not scroll) -->
          <div class="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ initialData ? 'Modifier le Produit' : 'Nouveau Produit' }}
            </h3>
            <p class="text-xs text-gray-500 mt-1">Saisissez les informations techniques et commerciales du produit</p>

            <!-- Stepper Indicator -->
            <div class="mt-6 flex justify-between items-center px-1">
              <div v-for="step in 5" :key="step" class="flex items-center flex-1 last:flex-none">
                <div :class="[
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors font-bold text-sm shadow-theme-xs',
                  currentStep >= step ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                ]">
                  <span v-if="currentStep > step">✓</span>
                  <span v-else>{{ step }}</span>
                </div>
                <div v-if="step < 5" :class="['h-[2px] flex-1 mx-2', currentStep > step ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-800']"></div>
              </div>
            </div>
          </div>

          <!-- Modal Body (Scrollable area) -->
          <div class="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
            
            <!-- Step 1: Identification -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">IDENTIFICATION DE L'ARTICLE (ÉTAPE 1/5)</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° article court *</label>
                  <input v-model="formData.codeArticle" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Description principale *</label>
                  <input v-model="formData.description" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° catalogue / Réf fabricant *</label>
                  <input v-model="formData.referenceFabricant" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Type de stockage *</label>
                  <select v-model="formData.typeStockage" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="s in storageTypes" :key="s.id" :value="s.id">{{ s.id }} - {{ s.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Classe GL *</label>
                  <select v-model="formData.codeGL" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="g in glCodes" :key="g.id" :value="g.id">{{ g.id }} - {{ g.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Type de ligne *</label>
                  <select v-model="formData.typeLigne" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="l in lineTypes" :key="l.id" :value="l.id">{{ l.id }} - {{ l.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Indicateur Bulk/Conditionné *</label>
                  <select v-model="formData.indicateur" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="i in indicators" :key="i.id" :value="i.id">{{ i.id }} - {{ i.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Groupe prix article *</label>
                  <input v-model.number="formData.groupePrix" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
              </div>
            </div>

            <!-- Step 2: Unités de mesure -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">UNITÉS DE MESURE (ÉTAPE 2/5)</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">UOM Primaire *</label>
                  <select v-model="formData.uomPrimaire" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="u in unitOfMeasures" :key="u.id" :value="u.id">{{ u.id }} - {{ u.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">UOM Secondaire</label>
                  <select v-model="formData.uomSecondaire" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option value="">Aucune</option>
                    <option v-for="u in unitOfMeasures" :key="u.id" :value="u.id">{{ u.id }} - {{ u.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">UOM Achat *</label>
                  <select v-model="formData.uomAchat" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="u in unitOfMeasures" :key="u.id" :value="u.id">{{ u.id }} - {{ u.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">UOM Prix *</label>
                  <select v-model="formData.uomPrix" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="u in unitOfMeasures" :key="u.id" :value="u.id">{{ u.id }} - {{ u.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">UOM Expédition *</label>
                  <select v-model="formData.uomExpedition" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="u in unitOfMeasures" :key="u.id" :value="u.id">{{ u.id }} - {{ u.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">UOM Poids *</label>
                  <select v-model="formData.uomPoids" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="u in weightUnits" :key="u.id" :value="u.id">{{ u.id }} - {{ u.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">UOM Volume *</label>
                  <select v-model="formData.uomVolume" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="u in volumeUnits" :key="u.id" :value="u.id">{{ u.id }} - {{ u.label }}</option>
                  </select>
                </div>
                <div class="flex items-center h-11 mt-7">
                  <label class="flex items-center cursor-pointer">
                    <div class="relative">
                      <input type="checkbox" v-model="formData.conversionStandardUom" class="sr-only" />
                      <div :class="['block w-14 h-8 rounded-full', formData.conversionStandardUom ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-700']"></div>
                      <div :class="['dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition', formData.conversionStandardUom ? 'transform translate-x-6' : '']"></div>
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-400">Conversion standard UOM</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Step 3: Gestion des stocks -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">PARAMÈTRES DE GESTION DES STOCKS (ÉTAPE 3/5)</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Commandes en attente (backorders) *</label>
                  <select v-model="formData.backorders" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° de série requis *</label>
                  <select v-model="formData.numeroSerieRequis" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Vérification disponibilité *</label>
                  <select v-model="formData.verificationDisponibilite" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Code statut lot</label>
                  <input v-model="formData.codeStatutLot" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Durée de vie (jours)</label>
                  <input v-model.number="formData.dureeVieJours" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Méthode de gestion des lots *</label>
                  <select v-model="formData.methodeLot" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="l in lotManagements" :key="l.id" :value="l.id">{{ l.id }} - {{ l.label }}</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Step 4: Planification & Logistique -->
            <div v-if="currentStep === 4" class="space-y-6">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">PLANIFICATION & LOGISTIQUE (ÉTAPE 4/5)</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Code ABC *</label>
                  <select v-model="formData.codeABC" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="a in codeABCs" :key="a.id" :value="a.id">{{ a.id }} - {{ a.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Méthode d'engagement *</label>
                  <select v-model="formData.methodeEngagement" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="e in engagementMethods" :key="e.id" :value="e.id">{{ e.id }} - {{ e.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° planificateur</label>
                  <input v-model="formData.numeroPlanificateur" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° acheteur</label>
                  <input v-model="formData.numeroAcheteur" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Niveau de coût inventaire *</label>
                  <select v-model="formData.niveauCoutInventaire" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option value="1">1 - Niveau article</option>
                    <option value="2">2 - Niveau branch/plant</option>
                    <option value="3">3 - Niveau localisation</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Message flash article</label>
                  <input v-model="formData.messageFlash" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Groupe de réapprovisionnement</label>
                  <input v-model="formData.groupeReapprovisionnement" type="text" placeholder="Ex: GR-BULK" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Groupe de dispatch</label>
                  <input v-model="formData.groupeDispatch" type="text" placeholder="Ex: DISP-VRAC" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
              </div>
            </div>

            <!-- Step 5: Tarification & Remarques -->
            <div v-if="currentStep === 5" class="space-y-6">
              <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">TARIFICATION & REMARQUES (ÉTAPE 5/5)</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <!-- Basic Info -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Catégorie *</label>
                  <input v-model="formData.categorie" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" required />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Coût Standard (XOF) *</label>
                  <input v-model.number="formData.coutStandard" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" required />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Prix Standard (XOF) *</label>
                  <input v-model.number="formData.prixStandard" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" required />
                </div>
                
                <!-- Pricing groups -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Groupe prix client</label>
                  <input v-model="formData.groupePrixClient" type="text" placeholder="Ex: GPC-01" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Niveau de prix vente *</label>
                  <select v-model="formData.niveauPrixVente" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="n in salePriceLevels" :key="n.id" :value="n.id">{{ n.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Méthode prix achat *</label>
                  <select v-model="formData.methodePrixAchat" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                    <option v-for="m in purchasePriceMethods" :key="m.id" :value="m.id">{{ m.label }}</option>
                  </select>
                </div>

                <!-- Messages & Remarks -->
                <div class="md:col-span-2">
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Message d'impression</label>
                  <textarea v-model="formData.messageImpression" rows="2" placeholder="Saisir le message à imprimer sur la facture/reçu" class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90"></textarea>
                </div>
                <div class="md:col-span-2">
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Message commande</label>
                  <textarea v-model="formData.messageCommande" rows="2" placeholder="Saisir le message à afficher lors d'une commande" class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90"></textarea>
                </div>
                <div class="md:col-span-2">
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Remarques / Notes</label>
                  <textarea v-model="formData.remarques" rows="3" placeholder="Notes et remarques internes relatives au produit" class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90"></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer (Always Pinned at the bottom, does not scroll) -->
          <div class="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
            <button
              v-if="currentStep > 1"
              @click="currentStep--"
              class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:bg-white/5 transition-colors"
            >
              Précédent
            </button>
            <button
              @click="$emit('close')"
              v-else
              class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:bg-white/5 transition-colors"
            >
              Annuler
            </button>

            <button
              v-if="currentStep < 5"
              @click="currentStep++"
              class="flex items-center justify-center rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
            >
              Suivant
            </button>
            <button
              v-else
              @click="handleSave"
              :disabled="isSaving"
              :class="[
                'flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs transition-colors',
                isSaving ? 'bg-success-600 opacity-70 cursor-not-allowed' : 'bg-success-500 hover:bg-success-600'
              ]"
            >
              <template v-if="isSaving">
                En cours...
              </template>
              <template v-else>
                {{ initialData ? 'Mise à jour' : 'Enregistrer' }}
              </template>
            </button>
          </div>

        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import Modal from '@/components/ui/Modal.vue'

// Import Services & Models
import { articleTypeService } from '@/services/articleType.service'
import { lineTypeService } from '@/services/lineType.service'
import { actionCodeService } from '@/services/actionCode.service'
import { indicatorService } from '@/services/indicator.service'
import { unitOfMeasureService } from '@/services/unitOfMeasure.service'
import { storageTypeService } from '@/services/storageType.service'
import { countryService } from '@/services/country.service'
import { glService } from '@/services/gl.service'
import { lotManagementService } from '@/services/lotManagement.service'
import { codeABCService } from '@/services/codeABC.service'
import { engagementMethodService } from '@/services/engagementMethod.service'

const props = defineProps<{ initialData?: any }>()
const emit = defineEmits(['close', 'save'])

const currentStep = ref(1)
const isSaving = ref(false)

const formData = reactive({
  // Etape 1
  codeArticle: '',
  description: '',
  referenceFabricant: '',
  typeStockage: '',
  codeGL: '',
  typeLigne: '',
  indicateur: '',
  groupePrix: 0,
  
  // Etape 2
  uomPrimaire: '',
  uomSecondaire: '',
  uomAchat: '',
  uomPrix: '',
  uomExpedition: '',
  uomPoids: '',
  uomVolume: '',
  conversionStandardUom: false,

  // Etape 3
  backorders: 'Non',
  numeroSerieRequis: 'Non',
  verificationDisponibilite: 'Oui',
  codeStatutLot: '',
  dureeVieJours: 0,
  methodeLot: '',
  codeABC: '',
  methodeEngagement: '',
  numeroPlanificateur: '',
  numeroAcheteur: '',
  niveauCoutInventaire: '1',
  messageFlash: '',

  // Etape 4
  groupeReapprovisionnement: '',
  groupeDispatch: '',

  // Etape 5
  prixStandard: 0,
  coutStandard: 0,
  categorie: '',
  groupePrixClient: '',
  niveauPrixVente: '1',
  methodePrixAchat: '2',
  messageImpression: '',
  messageCommande: '',
  remarques: ''
})

// Options
const articleTypes = ref<any[]>([])
const lineTypes = ref<any[]>([])
const actionCodes = ref<any[]>([])
const indicators = ref<any[]>([])
const unitOfMeasures = ref<any[]>([])
const storageTypes = ref<any[]>([])
const countries = ref<any[]>([])
const glCodes = ref<any[]>([])
const lotManagements = ref<any[]>([])
const codeABCs = ref<any[]>([])
const engagementMethods = ref<any[]>([])

const salePriceLevels = ref([
  { id: '1', label: '1 - Niveau article' },
  { id: '2', label: '2 - Niveau branch/plant' }
])

const purchasePriceMethods = ref([
  { id: '1', label: '1 - Dernier coût' },
  { id: '2', label: '2 - Coût standard' },
  { id: '3', label: '3 - Coût moyen pondéré' }
])

// Computed pour filtrer les UOM
const weightUnits = computed(() => unitOfMeasures.value.filter(u => ['KG', 'MT'].includes(u.id)))
const volumeUnits = computed(() => unitOfMeasures.value.filter(u => ['L3', 'GA', 'BL', 'DM'].includes(u.id)))

onMounted(async () => {
  // Load referential data
  articleTypes.value = await articleTypeService.getArticleTypes()
  lineTypes.value = await lineTypeService.getLineTypes()
  actionCodes.value = await actionCodeService.getActionCodes()
  indicators.value = await indicatorService.getIndicators()
  unitOfMeasures.value = await unitOfMeasureService.getUnits()
  storageTypes.value = await storageTypeService.getStorageTypes()
  countries.value = await countryService.getCountries()
  glCodes.value = await glService.getGLCodes()
  lotManagements.value = await lotManagementService.getLotManagements()
  codeABCs.value = await codeABCService.getCodeABCs()
  engagementMethods.value = await engagementMethodService.getEngagementMethods()

  if (props.initialData) {
    Object.assign(formData, props.initialData)
  }
})

const handleSave = () => {
  if (isSaving.value) return
  isSaving.value = true
  emit('save', { ...formData })
}
</script>
