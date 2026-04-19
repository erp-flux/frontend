<template>
  <Modal :fullScreenBackdrop="true" :closeOnBackdrop="false" @close="$emit('close')">
    <template #body>
      <div class="relative z-10 w-full max-w-[900px] mx-auto p-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
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
            :title="modalTitle" 
            desc="Saisie et soumission de la demande RH pour traitement."
            className="border-none shadow-none !bg-transparent"
          >
          <!-- Stepper Indicator -->
          <div class="mb-8 flex justify-between items-center px-2">
            <div v-for="step in 6" :key="step" class="flex items-center flex-1 last:flex-none">
              <div :class="[
                'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors font-bold',
                currentStep >= step ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-200 text-gray-400'
              ]">
                <span v-if="currentStep > step">✓</span>
                <span v-else>{{ step }}</span>
              </div>
              <div v-if="step < 6" :class="['h-[2px] flex-1 mx-2', currentStep > step ? 'bg-brand-500' : 'bg-gray-200']"></div>
            </div>
          </div>
          
          <div class="mb-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ getStepTitle(currentStep) }}
          </div>

          <!-- Étape 1 : Action & Identité -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 border-b border-gray-100 dark:border-gray-800 pb-6">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Type d'action *</label>
                <select v-model="hrRequest.typeAction" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option value="CRÉER">Créer — Nouvel employé</option>
                  <option value="MODIFIER">Modifier — Données existantes</option>
                  <option value="SUSPENDRE">Suspendre — Mise en veille</option>
                  <option value="RÉINTÉGRER">Réintégrer — Retour d'absence</option>
                  <option value="DÉPART">Départ — Fin de contrat / Démission</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Priorité *</label>
                <select v-model="hrRequest.priorite" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option value="STANDARD">Standard</option>
                  <option value="HAUTE">Haute</option>
                  <option value="URGENTE">Urgente</option>
                </select>
              </div>
            </div>

            <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">A. Identité Civile</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nom de famille *</label>
                <input v-model="formData.nom" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Prénom(s) *</label>
                <input v-model="formData.prenom" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Genre *</label>
                <select v-model="formData.genre" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90">
                  <option value="Masculin">Masculin</option>
                  <option value="Féminin">Féminin</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Date de naissance *</label>
                <input v-model="formData.dateNaissance" type="date" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Lieu de naissance *</label>
                <input v-model="formData.lieuNaissance" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                 <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nationalité *</label>
                 <input v-model="formData.nationalite" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
               <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Type de pièce *</label>
                  <select v-model="formData.typePieceIdentite" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                    <option value="Carte d'Identité">Carte d'Identité</option>
                    <option value="Passeport">Passeport</option>
                  </select>
               </div>
               <div>
                 <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° Pièce *</label>
                 <input v-model="formData.numeroPieceIdentite" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
               </div>
               <div>
                 <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° CNSS *</label>
                 <input v-model="formData.numeroCNSS" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
               </div>
            </div>
            
             <!-- Gestion Documentaire -->
             <div class="mt-4">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Pièces Jointes (CNI, CV, Relevé Bancaire)</label>
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-600 dark:hover:border-gray-500">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Cliquez pour téléverser</span> ou glissez-déposez</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PDF, JPG ou PNG (MAX. 5Mo)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" multiple @change="handleFileUpload" />
                    </label>
                </div>
                <!-- Liste des fichiers simulés -->
                <ul v-if="files.length > 0" class="mt-3 space-y-2">
                    <li v-for="(file, index) in files" :key="index" class="flex items-center justify-between p-2 text-sm text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-md">
                        <span class="truncate">{{ file.name }}</span>
                        <button @click="removeFile(index)" class="text-error-500 hover:text-error-700">Retirer</button>
                    </li>
                </ul>
            </div>
          </div>
          
          <!-- Étape 2 : Contacts -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">B. Contacts & Personne de référence</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div class="md:col-span-2">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Adresse complète</label>
                <input v-model="formData.adresseComplete" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Téléphone mobile *</label>
                <input v-model="formData.telephoneMobile" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                 <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Email personnel</label>
                 <input v-model="formData.emailPersonnel" type="email" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <h5 class="text-sm font-medium mb-3 text-gray-800 dark:text-white/90">Contact en cas d'urgence</h5>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                    <div>
                        <label class="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-400">Nom & Prénom *</label>
                        <input v-model="formData.contactUrgence.nomPrenom" type="text" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
                    </div>
                     <div>
                        <label class="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-400">Lien de parenté *</label>
                        <input v-model="formData.contactUrgence.lienParente" type="text" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
                    </div>
                     <div>
                        <label class="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-400">Téléphone *</label>
                        <input v-model="formData.contactUrgence.telephone" type="text" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
                    </div>
                </div>
            </div>
          </div>

          <!-- Étape 3 : Poste & Contrat -->
          <div v-if="currentStep === 3" class="space-y-6">
            <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">C. Poste, Affectation & Contrat</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Intitulé du poste *</label>
                <select v-model="formData.intitulePoste" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                  <option v-for="poste in POSTES" :key="poste" :value="poste">{{ poste }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Département *</label>
                <select v-model="formData.departement" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                  <option v-for="dept in DEPARTEMENTS" :key="dept" :value="dept">{{ dept }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Site / Lieu de travail *</label>
               <select v-model="formData.siteTravail" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                  <option v-for="site in SITES" :key="site" :value="site">{{ site }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Grade / Classification *</label>
                <select v-model="formData.grade" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                  <option v-for="grade in GRADES" :key="grade" :value="grade">{{ grade }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Type de contrat *</label>
                <select v-model="formData.typeContrat" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                  <option value="Prestataire">Prestataire</option>
                </select>
              </div>
               <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Régime de travail *</label>
                <select v-model="formData.regimeTravail" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                  <option value="5j/7 — Standard">5j/7 — Standard</option>
                  <option value="3x8 — Rotation 3 quarts">3x8 — Rotation 3 quarts</option>
                  <option value="2x8">2x8</option>
                </select>
              </div>
              <div>
                 <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Responsable N+1 *</label>
                 <input v-model="formData.responsableN1" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div>
                 <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Date de prise de poste *</label>
                 <input v-model="formData.dateEmbauche" type="date" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
              <div v-if="formData.typeContrat === 'CDD'">
                 <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Date de fin CDD *</label>
                 <input v-model="formData.dateFinContrat" type="date" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
              </div>
            </div>
          </div>
          
          <!-- Étape 4 : Rémunération & Banque -->
          <div v-if="currentStep === 4" class="space-y-6">
            <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">D. Rémunération & Avantages</h4>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-5">
                 <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Salaire brut mensuel *</label>
                    <input v-model.number="formData.salaireBrutMensuel" type="number" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
                 </div>
                 <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Monnaie *</label>
                    <select v-model="formData.monnaie" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                      <option value="XOF">XOF</option>
                      <option value="GNF">GNF</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </select>
                 </div>
                 <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Mode de paiement *</label>
                    <select v-model="formData.modePaiementSalaire" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                      <option value="Virement">Virement bancaire</option>
                      <option value="Chèque">Chèque</option>
                      <option value="Espèces">Espèces</option>
                    </select>
                 </div>
             </div>
             
             <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
               <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">F. Coordonnées Bancaires</h4>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                 <div>
                   <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nom de la banque *</label>
                   <input v-model="formData.banque" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
                 </div>
                 <div>
                   <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">N° de compte / IBAN *</label>
                   <input v-model="formData.numeroCompte" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90" />
                 </div>
               </div>
             </div>
          </div>
          
          <!-- Étape 5 : Accès & Sécurité -->
          <div v-if="currentStep === 5" class="space-y-6">
             <h4 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white/90">E. Accès Système & Habilitations</h4>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                   <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Profil utilisateur Fluxaa.io *</label>
                   <select v-model="formData.profilFluxaa" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 dark:border-gray-700 dark:text-white/90">
                     <option v-for="profil in PROFILS_FLUXAA" :key="profil" :value="profil">{{ profil }}</option>
                   </select>
                </div>
             </div>
             
             <div>
                <label class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-400">Habilitations Sécurité / Sectorielles</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div v-for="hab in HABILITATIONS" :key="hab" class="flex items-center">
                    <input 
                      type="checkbox" 
                      :id="hab" 
                      :value="hab" 
                      v-model="formData.habilitationsSpecifiques"
                      class="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    >
                    <label :for="hab" class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">{{ hab }}</label>
                  </div>
                </div>
             </div>
          </div>
          
          <!-- Étape 6 : Workflow & Validation -->
          <div v-if="currentStep === 6" class="space-y-6">
             <div class="rounded-xl border border-warning-200 bg-warning-50 p-6 dark:border-warning-500/20 dark:bg-warning-500/10 mb-6">
               <h4 class="text-sm font-semibold mb-2 text-warning-800 dark:text-warning-300">Phase de Validation & Approbation</h4>
               <p class="text-xs text-warning-700 dark:text-warning-400">
                 Dès la confirmation, cette demande passera par le circuit d'approbation ci-dessous. 
                 <span v-if="needsDGApproval" class="font-bold">Attention: Le seuil d'approbation DG est atteint.</span>
               </p>
             </div>
             
             <div class="space-y-4">
                <div class="flex flex-col space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
                    
                    <!-- Etape 1 -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            1
                        </div>
                        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                            <div class="flex items-center justify-between mb-1">
                                <div class="font-bold text-gray-800 dark:text-white text-sm">Demandeur</div>
                            </div>
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Initiation de la demande</div>
                        </div>
                    </div>
                    
                    <!-- Etape 2 -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            2
                        </div>
                         <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                            <div class="flex items-center justify-between mb-1">
                                <div class="font-bold text-gray-800 dark:text-white text-sm">Responsable N+1</div>
                            </div>
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Avis hiérarchique</div>
                        </div>
                    </div>
                    
                    <!-- Etape 3 -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            3
                        </div>
                         <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                            <div class="flex items-center justify-between mb-1">
                                <div class="font-bold text-gray-800 dark:text-white text-sm">Ressources Humaines</div>
                            </div>
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Validation administrative</div>
                        </div>
                    </div>
                    
                    <!-- DG -- Optional based on logic -->
                     <div v-if="needsDGApproval" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-warning-200 bg-warning-50 text-warning-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            DG
                        </div>
                         <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-warning-50 dark:bg-warning-900/10 p-4 rounded border border-warning-200 dark:border-warning-800">
                            <div class="flex items-center justify-between mb-1">
                                <div class="font-bold text-gray-800 dark:text-white text-sm">Direction Générale</div>
                            </div>
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Approbation finale d'exception requise (Salaire / Grade)</div>
                        </div>
                    </div>

                </div>
             </div>
          </div>

          <!-- Actions Footer -->
          <div class="mt-8 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
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
              v-if="currentStep < 6"
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
                Soumission...
              </template>
              <template v-else>
                Soumettre au Workflow
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
import { ref, reactive, onMounted, computed } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import { GRADES, POSTES, PROFILS_FLUXAA, HABILITATIONS, DEPARTEMENTS, SITES } from '@/mocks/personnel.mock'
import { personnelService } from '@/services/personnel.service'
import type { HRRequest, PersonnelMember, Gender, ContractType, WorkRegime } from '@/models/personnel.interface'

const props = defineProps<{
  initialData?: PersonnelMember | null
}>()
const emit = defineEmits(['close', 'save'])

const currentStep = ref(1)
const isSaving = ref(false)
const files = ref<File[]>([])

const getStepTitle = (step: number) => {
  const titles = [
    '',
    'Étape 1 : Type d\'Action & Identité Civile',
    'Étape 2 : Contacts & Urgences',
    'Étape 3 : Affectation & Contrat',
    'Étape 4 : Rémunération & Coordonnées Bancaires',
    'Étape 5 : Profil & Habilitations Systèmes',
    'Étape 6 : Initiation du Workflow'
  ]
  return titles[step]
}

const hrRequest = reactive({
  typeAction: 'CRÉER',
  priorite: 'STANDARD',
  notes: ''
})

const formData = reactive({
  nom: '', prenom: '', genre: 'Masculin' as Gender, dateNaissance: '', lieuNaissance: '',
  nationalite: 'Togolaise', typePieceIdentite: 'Carte d\'Identité', numeroPieceIdentite: '',
  numeroCNSS: '',
  adresseComplete: '', telephoneMobile: '', emailPersonnel: '', emailProfessionnel: '',
  contactUrgence: { nomPrenom: '', lienParente: '', telephone: '' },
  intitulePoste: '', departement: '', siteTravail: '', grade: '', typeContrat: 'CDI' as ContractType,
  regimeTravail: '5j/7 — Standard' as WorkRegime, responsableN1: '', dateEmbauche: '', dateFinContrat: '',
  salaireBrutMensuel: 0, monnaie: 'XOF', modePaiementSalaire: 'Virement',
  banque: '', numeroCompte: '',
  profilFluxaa: '', habilitationsSpecifiques: [] as string[]
})

const modalTitle = computed(() => {
  if (hrRequest.typeAction === 'CRÉER') return 'Nouvel Employé - Demande RH'
  return `Demande RH : ${hrRequest.typeAction}`
})

// Détection de la règle d'approbation DG
const needsDGApproval = computed(() => {
  if (formData.salaireBrutMensuel >= 2500000) return true
  if (['Directeur Général', 'Directeur des Opérations'].includes(formData.intitulePoste)) return true
  if (['N10', 'N11', 'N12'].some(g => formData.grade.includes(g))) return true
  return false
})

onMounted(() => {
  if (props.initialData) {
    hrRequest.typeAction = 'MODIFIER'
    Object.assign(formData, props.initialData)
    // Deep merge for nested objects if necessary
    if (props.initialData.contactUrgence) {
       Object.assign(formData.contactUrgence, props.initialData.contactUrgence)
    }
  }
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
        files.value.push(target.files[i])
    }
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const handleSave = async () => {
  if (isSaving.value) return
  isSaving.value = true
  
  // Create the request object
  const newRequest: HRRequest = {
    id: Math.random().toString(36).substr(2, 9),
    referenceDemande: `RH-2025-${Math.floor(100 + Math.random() * 900)}`,
    typeAction: hrRequest.typeAction as any,
    priorite: hrRequest.priorite as any,
    dateDemande: new Date().toISOString().split('T')[0],
    demandeur: 'Connecté (Admin)',
    statusGlobal: 'EN COURS',
    matriculeConcerne: hrRequest.typeAction === 'CRÉER' ? 'EMP-NEW' : (props.initialData?.matricule || 'Unknown'),
    nomComplet: `${formData.nom} ${formData.prenom}`,
    departement: formData.departement,
    poste: formData.intitulePoste,
    steps: {
      demandeur: { label: 'Initiation', status: 'APPROUVÉ', date: new Date().toISOString().split('T')[0] },
      n1: { label: 'Avis N+1', status: 'EN ATTENTE' },
      rh: { label: 'Validation RH', status: 'EN ATTENTE' },
      do: { label: 'Approbation DO', status: 'EN ATTENTE' },
      dg: { label: 'Approbation DG', status: needsDGApproval.value ? 'EN ATTENTE' : 'NON REQUIS' },
      system: { label: 'Création Système', status: 'EN ATTENTE' }
    },
    data: { ...formData }
  }

  try {
    await personnelService.saveHRRequest(newRequest)
    
    // Application directe des modifications pour faire fonctionner le tableau du répertoire
    if (['CRÉER', 'MODIFIER', 'RÉINTÉGRER'].includes(hrRequest.typeAction)) {
      await personnelService.savePersonnel({
         ...props.initialData,
         ...formData,
         id: props.initialData?.id || Math.random().toString(36).substr(2, 9),
         matricule: props.initialData?.matricule || 'EMP-' + Math.floor(1000 + Math.random() * 9000),
         statutAgent: hrRequest.typeAction === 'RÉINTÉGRER' ? 'Actif' : (props.initialData?.statutAgent || 'Actif'),
         statutAccesSys: props.initialData?.statutAccesSys || 'Actif',
      } as unknown as PersonnelMember)
    } else if (hrRequest.typeAction === 'SUSPENDRE' && props.initialData?.id) {
       await personnelService.savePersonnel({
         ...props.initialData,
         ...formData,
         statutAgent: 'Suspendu'
       } as unknown as PersonnelMember)
    } else if (hrRequest.typeAction === 'DÉPART' && props.initialData?.id) {
       await personnelService.savePersonnel({
         ...props.initialData,
         ...formData,
         statutAgent: 'Départ'
       } as unknown as PersonnelMember)
    }

    emit('save', newRequest)
  } finally {
    isSaving.value = false
  }
}
</script>
