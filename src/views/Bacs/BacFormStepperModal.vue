<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="false" @close="$emit('close')">
    <template #body>
      <!-- Modal Container -->
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

          <!-- Modal Header (Pinned) -->
          <div class="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ initialData ? 'Modifier le Bac' : 'Nouveau Bac' }}
            </h3>
            <p class="text-xs text-gray-500 mt-1">Saisissez les informations techniques et opérationnelles du bac</p>

            <!-- Stepper Indicator -->
            <div class="mt-6 flex justify-between items-center px-1">
              <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-1 last:flex-none">
                <div :class="[
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors font-bold text-sm shadow-theme-xs',
                  currentStep >= index + 1 ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                ]">
                  <span v-if="currentStep > index + 1">✓</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div v-if="index < steps.length - 1" :class="['h-[2px] flex-1 mx-2', currentStep > index + 1 ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-800']"></div>
              </div>
            </div>
            <!-- Stepper Labels -->
            <div class="flex justify-between px-1 mt-2">
              <div v-for="(step, index) in steps" :key="'label-'+index" class="text-xs font-medium text-gray-500 max-w-[80px] hidden sm:block" :class="index === steps.length - 1 ? 'text-right' : (index === 0 ? 'text-left' : 'text-center flex-1')">
                {{ step }}
              </div>
            </div>
          </div>

          <!-- Modal Body (Scrollable area) -->
          <div class="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Step 1: Identification -->
              <div v-show="currentStep === 1" class="space-y-4">
            <h4 class="text-md font-semibold text-gray-800 dark:text-white">Identification du Bac</h4>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Tank ID *</label>
                <input v-model="formData.tankId" type="text" required class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Localisation physique</label>
                <input v-model="formData.localisation" type="text" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>
            
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Description du bac</label>
              <textarea v-model="formData.description" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white"></textarea>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Statut</label>
                <select v-model="formData.statut" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="En service">En service</option>
                  <option value="Hors service">Hors service</option>
                  <option value="En inspection interne">En inspection interne</option>
                  <option value="En nettoyage">En nettoyage</option>
                  <option value="En réparation">En réparation</option>
                  <option value="Réservé">Réservé</option>
                  <option value="Mis au rebut">Mis au rebut</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Usage du bac</label>
                <select v-model="formData.usage" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="STO — Stockage">STO — Stockage</option>
                  <option value="BLD — Blending">BLD — Blending</option>
                  <option value="BLG — Grand blending">BLG — Grand blending</option>
                  <option value="HLD — Holding (rétention)">HLD — Holding (rétention)</option>
                  <option value="WIP — Travaux en cours">WIP — Travaux en cours</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Type de bac</label>
                <select v-model="formData.typeBac" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="CYL — Cylindrique vertical">CYL — Cylindrique vertical</option>
                  <option value="HOR — Cylindrique horizontal">HOR — Cylindrique horizontal</option>
                  <option value="SPH — Sphérique">SPH — Sphérique</option>
                  <option value="CON — Conique">CON — Conique</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Toit</label>
                <select v-model="formData.toit" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="FIX — Toit fixe">FIX — Toit fixe</option>
                  <option value="FLT — Toit flottant interne">FLT — Toit flottant interne</option>
                  <option value="EFR — Toit flottant externe">EFR — Toit flottant externe</option>
                  <option value="DM — Dôme">DM — Dôme</option>
                  <option value="CIC — Toit conique">CIC — Toit conique</option>
                </select>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Produit courant</label>
              <select v-model="formData.produitCourant" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                <option value="Gasoil (GO)">Gasoil (GO)</option>
                <option value="Gasoil 50ppm (GO50)">Gasoil 50ppm (GO50)</option>
                <option value="Jet A-1 (JA1)">Jet A-1 (JA1)</option>
                <option value="Super / Essence (SP)">Super / Essence (SP)</option>
                <option value="FO 180">FO 180</option>
                <option value="FO 380">FO 380</option>
                <option value="LPG / Butane">LPG / Butane</option>
                <option value="Bitume">Bitume</option>
                <option value="Lubrifiants">Lubrifiants</option>
                <option value="Vide / Nettoyé">Vide / Nettoyé</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Dimensions & Capacités -->
          <div v-show="currentStep === 2" class="space-y-4">
            <h4 class="text-md font-semibold text-gray-800 dark:text-white">Dimensions & Capacités</h4>
            
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Capacité nominale (m³) *</label>
                <input v-model="formData.capaciteNominale" type="number" required class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Capacité opérationnelle (m³)</label>
                <input v-model="formData.capaciteOperationnelle" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Volume minimum garanti (m³)</label>
                <input v-model="formData.volumeMinGaranti" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Volume sécurité anti-débordement (m³)</label>
                <input v-model="formData.volumeSecurite" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Diamètre (m)</label>
                <input v-model="formData.diametre" type="number" step="0.01" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Hauteur totale (m)</label>
                <input v-model="formData.hauteurTotale" type="number" step="0.01" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Hauteur de référence (m)</label>
                <input v-model="formData.hauteurReference" type="number" step="0.01" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Poids du toit (t) — toit flottant</label>
                <input v-model="formData.poidsToit" type="number" step="0.01" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Hauteur flottante (m) — toit flottant</label>
                <input v-model="formData.hauteurFlottante" type="number" step="0.01" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Unité de jaugeage</label>
                <select v-model="formData.uniteJaugeage" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="MM — Millimètres">MM — Millimètres</option>
                  <option value="CM — Centimètres">CM — Centimètres</option>
                  <option value="IN — Pouces">IN — Pouces</option>
                  <option value="FT — Pieds">FT — Pieds</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Temp. de référence (°C)</label>
                <select v-model="formData.temperatureReference" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option :value="15">15</option>
                  <option :value="20">20</option>
                  <option :value="25">25</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Pression du bac</label>
                <select v-model="formData.pressionBac" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="ATM — Atmosphérique">ATM — Atmosphérique</option>
                  <option value="PRE — Pressurisé">PRE — Pressurisé</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 3: Systèmes de mesure -->
          <div v-show="currentStep === 3" class="space-y-4">
            <h4 class="text-md font-semibold text-gray-800 dark:text-white">Systèmes de Mesure & Jaugeage</h4>
            
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Système de mesure principal</label>
                <select v-model="formData.systemeMesure" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="ATG — Automatic Tank Gauge (Endress & Hauser)">ATG — Automatic Tank Gauge (Endress & Hauser)</option>
                  <option value="HLA — High Level Alarm (Rosemount)">HLA — High Level Alarm (Rosemount)</option>
                  <option value="Manuel — Sonde manuelle">Manuel — Sonde manuelle</option>
                  <option value="Radar">Radar</option>
                  <option value="Ultrasonique">Ultrasonique</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Type de jaugeage</label>
                <select v-model="formData.typeJaugeage" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="W — Wet dip (lecture directe)">W — Wet dip (lecture directe)</option>
                  <option value="D — Dry dip (hauteur libre)">D — Dry dip (hauteur libre)</option>
                  <option value="X — Jaugeage mécanique">X — Jaugeage mécanique</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Méthode de jaugeage</label>
                <select v-model="formData.methodeJaugeage" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="ATG automatique">ATG automatique</option>
                  <option value="Manuel réglementaire">Manuel réglementaire</option>
                  <option value="Mixte ATG + Manuel">Mixte ATG + Manuel</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">ID Contrôle de process (ATG)</label>
                <input v-model="formData.idControlProcess" type="text" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Réconciliation automatique</label>
                <select v-model="formData.reconciliationAuto" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="Oui — Réconciliation auto activée">Oui — Réconciliation auto activée</option>
                  <option value="Non — Manuelle uniquement">Non — Manuelle uniquement</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Stock cominglé (multi-clients)</label>
                <select v-model="formData.stockComingle" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="Oui — Plusieurs clients dans le bac">Oui — Plusieurs clients dans le bac</option>
                  <option value="Non — Client unique">Non — Client unique</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Tube de jauge Slip Tube — seuil bas (mm)</label>
                <input v-model="formData.slipTubeBas" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Tube de jauge Slip Tube — seuil haut (mm)</label>
                <input v-model="formData.slipTubeHaut" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>
          </div>

          <!-- Step 4: Volumes -->
          <div v-show="currentStep === 4" class="space-y-4">
            <h4 class="text-md font-semibold text-gray-800 dark:text-white">Volumes Opérationnels & Débits</h4>
            
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Volume non pompable (m³)</label>
                <input v-model="formData.volumeNonPompable" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Volume de décharge (m³)</label>
                <input v-model="formData.volumeDecharge" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Volume pipeline (m³)</label>
                <input v-model="formData.volumePipeline" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Décharge maximale (m³/h)</label>
                <input v-model="formData.dechargeMaximale" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Taux de remplissage max (m³/h)</label>
                <input v-model="formData.tauxRemplissageMax" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Alerte stock bas (m³)</label>
                <input v-model="formData.alerteStockBas" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Durée alerte niv. haut (h)</label>
                <input v-model="formData.dureeAlerteNiveauHaut" type="number" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Alertes actives</label>
                <select v-model="formData.alertesActives" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 5: Historique & Maintenance -->
          <div v-show="currentStep === 5" class="space-y-4">
            <h4 class="text-md font-semibold text-gray-800 dark:text-white">Historique & Maintenance</h4>
            
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Date d'installation</label>
                <input v-model="formData.dateInstallation" type="date" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Date dernier nettoyage</label>
                <input v-model="formData.dateDernierNettoyage" type="date" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Date pro. inspection API 653</label>
                <input v-model="formData.dateProchaineInspection" type="date" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Produit précédent</label>
                <select v-model="formData.produitPrecedent" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white">
                  <option value="Gasoil (GO)">Gasoil (GO)</option>
                  <option value="Gasoil 50ppm">Gasoil 50ppm</option>
                  <option value="Jet A-1">Jet A-1</option>
                  <option value="Super">Super</option>
                  <option value="FO 180">FO 180</option>
                  <option value="FO 380">FO 380</option>
                  <option value="LPG">LPG</option>
                  <option value="Bitume">Bitume</option>
                  <option value="Lubrifiants">Lubrifiants</option>
                  <option value="Vide">Vide</option>
                </select>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Remarques / Instructions spéciales</label>
              <textarea v-model="formData.remarques" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white"></textarea>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal Footer (Always Pinned at the bottom, does not scroll) -->
      <div class="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
        <button
          v-if="currentStep > 1"
          type="button"
          @click="currentStep--"
          class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:bg-white/5 transition-colors"
        >
          Précédent
        </button>
        <button
          v-else
          type="button"
          @click="$emit('close')"
          class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:bg-white/5 transition-colors"
        >
          Annuler
        </button>

        <button
          v-if="currentStep < steps.length"
          type="button"
          @click="currentStep++"
          class="flex items-center justify-center rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
        >
          Suivant
        </button>
        <button
          v-else
          type="button"
          @click="handleSubmit"
          class="flex items-center justify-center rounded-lg bg-success-500 hover:bg-success-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs transition-colors"
        >
          {{ initialData ? 'Mise à jour' : 'Enregistrer' }}
        </button>
      </div>

    </div>
  </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import type { Bac } from '@/models/bac.interface'

const props = defineProps<{
  initialData?: Bac | null
}>()

const emit = defineEmits(['close', 'save'])

const currentStep = ref(1)
const steps = [
  'Identification',
  'Dimensions',
  'Mesure',
  'Volumes',
  'Maintenance'
]

const formData = ref({
  tankId: '',
  description: '',
  localisation: '',
  statut: 'En service',
  usage: 'STO — Stockage',
  typeBac: 'CYL — Cylindrique vertical',
  toit: 'FIX — Toit fixe',
  produitCourant: 'Vide / Nettoyé',
  capaciteNominale: 0,
  capaciteOperationnelle: 0,
  volumeMinGaranti: 0,
  volumeSecurite: 0,
  diametre: 0,
  hauteurTotale: 0,
  hauteurReference: 0,
  poidsToit: 0,
  hauteurFlottante: 0,
  uniteJaugeage: 'MM — Millimètres',
  temperatureReference: 15,
  pressionBac: 'ATM — Atmosphérique',
  systemeMesure: 'ATG — Automatic Tank Gauge (Endress & Hauser)',
  typeJaugeage: 'W — Wet dip (lecture directe)',
  methodeJaugeage: 'ATG automatique',
  idControlProcess: '',
  reconciliationAuto: 'Non — Manuelle uniquement',
  stockComingle: 'Non — Client unique',
  slipTubeBas: 0,
  slipTubeHaut: 0,
  volumeNonPompable: 0,
  volumeDecharge: 0,
  volumePipeline: 0,
  dechargeMaximale: 0,
  alerteStockBas: 0,
  tauxRemplissageMax: 0,
  dureeAlerteNiveauHaut: 0,
  alertesActives: 'Oui',
  dateInstallation: '',
  dateDernierNettoyage: '',
  dateProchaineInspection: '',
  produitPrecedent: 'Vide',
  remarques: '',
})

onMounted(() => {
  if (props.initialData) {
    formData.value = { ...props.initialData }
  }
})

const handleSubmit = () => {
  emit('save', { ...formData.value })
}
</script>
