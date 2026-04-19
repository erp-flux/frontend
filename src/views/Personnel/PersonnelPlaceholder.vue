<template>
  <AdminLayout>
    <div class="mb-6">
      <h2 class="text-title-md2 font-bold text-black dark:text-white">
        Gestion du Personnel
      </h2>
    </div>

    <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div class="flex flex-col items-center justify-center py-20">
        <div class="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserCircleIcon class="h-10 w-10" />
        </div>
        <h3 class="mb-2 text-xl font-bold text-black dark:text-white">Module en construction</h3>
        <p class="text-center text-gray-500 dark:text-gray-400">
          Le module de gestion du personnel sera implémenté très prochainement.<br />
          Revenez bientôt pour gérer vos agents et employés.
        </p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { UserCircleIcon } from '@/icons'
</script>
