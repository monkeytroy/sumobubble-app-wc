<template>
  <div class="border-t border-gray-900">
    <Disclosure as="div" class="py-6 px-4" v-slot="{ open }">
      <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
        <span class="text-base font-semibold leading-7">{{title}}</span>
        <span class="ml-6 flex h-7 items-center">
          <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
          <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
        </span>
      </DisclosureButton>
      <DisclosurePanel as="div" class="mt-4">
        <slot></slot>
      </DisclosurePanel>
    </Disclosure>
  </div>    
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['config', 'title']);

</script>