<template>
  <AdminLayout>
    <PageBreadcrumb pageTitle="Gestion des Produits" />

    <div class="space-y-6">
      <!-- Create Button & Actions -->
      <div class="flex justify-end">
        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
        >
          <PlusIcon class="w-5 h-5" />
          Nouveau Produit
        </button>
      </div>

      <!-- Products Table -->
      <ComponentCard title="Catalogue des Produits" desc="Liste des articles et produits configurés.">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Code Article</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Désignation</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Type / Ligne</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Stock Securité</p>
                </th>
                <th class="px-5 py-3 text-right sm:px-6 text-gray-500 text-theme-xs dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-sm font-semibold text-brand-500">{{ product.codeArticle }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ product.description }}
                  </span>
                  <span class="block text-gray-400 text-theme-xs">
                    {{ product.categorie }}
                  </span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <div class="flex flex-col gap-1">
                    <span class="text-xs text-gray-600">Type: {{ product.typeArticle }}</span>
                    <span class="text-xs text-gray-600">Ligne: {{ product.typeLigne }}</span>
                  </div>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="block text-gray-800 text-theme-sm dark:text-white/90">
                    {{ product.stockSecurite }} {{ product.uniteMesureBase }}
                  </span>
                </td>
                <td class="px-5 py-4 sm:px-6 text-right">
                  <div class="flex justify-end gap-3">
                    <button @click="viewProduct(product)" class="text-gray-500 hover:text-brand-500 transition-colors" title="Voir">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button @click="editProduct(product)" class="text-gray-500 hover:text-brand-500 transition-colors" title="Modifier">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmDelete(product)" class="text-gray-500 hover:text-error-500 transition-colors" title="Supprimer">
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

    <ProductFormModal v-if="isModalOpen" :initialData="selectedProduct" @close="closeModal" @save="handleSave" />
    <ProductDetailModal v-if="isDetailModalOpen" :product="selectedProduct" @close="isDetailModalOpen = false" />
    <ConfirmationModal v-if="isDeleteModalOpen" title="Supprimer le produit" :message="`Êtes-vous sûr de vouloir supprimer ${selectedProduct?.description} ?`" @confirm="handleDelete" @cancel="isDeleteModalOpen = false" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import ProductFormModal from './ProductFormModal.vue'
import ProductDetailModal from './ProductDetailModal.vue'
import ConfirmationModal from '@/components/ui/ConfirmationModal.vue'
import { productService } from '@/services/product.service'
import type { Product } from '@/models/product.interface'

const products = ref<Product[]>([])
const isModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

const loadProducts = async () => {
  const data = await productService.getProducts()
  products.value = [...data].reverse()
}

const openCreateModal = () => {
  selectedProduct.value = null
  isModalOpen.value = true
}

const viewProduct = (product: Product) => {
  selectedProduct.value = product
  isDetailModalOpen.value = true
}

const editProduct = (product: Product) => {
  selectedProduct.value = product
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProduct.value = null
}

const handleSave = async (productData: any) => {
  if (selectedProduct.value?.id) {
    await productService.updateProduct(selectedProduct.value.id, productData)
  } else {
    await productService.addProduct(productData)
  }
  await loadProducts()
  closeModal()
}

const confirmDelete = (product: Product) => {
  selectedProduct.value = product
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (selectedProduct.value) {
    await productService.deleteProduct(selectedProduct.value.id)
    await loadProducts()
    isDeleteModalOpen.value = false
    selectedProduct.value = null
  }
}

onMounted(loadProducts)
</script>
