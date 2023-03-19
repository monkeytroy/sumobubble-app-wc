<template>
  <Disclosure v-slot="{ open }" :defaultOpen=defaultOpen>
    <DisclosureButton className="flex w-full justify-between rounded-lg 
        bg-skin-primary bg-opacity-89 hover:bg-opacity-70 text-gray-900 
        px-4 py-2 text-left text-sm font-medium 
        focus:outline-none focus-visible:ring 
        focus-visible:ring-skin-primary focus-visible:ring-opacity-75"
        @click="onClick"
        >
      {{ title || '' }}
      <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-purple-500"
        />
    </DisclosureButton>
    <div v-show="open">
      <DisclosurePanel static className="px-4 pt-4 pb-2 text-sm text-gray-500">
        <slot :isContainerOpen="isOpen"></slot>
      </DisclosurePanel>
    </div>
  </Disclosure>
</template>

<script setup>

  import { defineProps, ref } from 'vue';
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
  import { ChevronUpIcon } from '@heroicons/vue/20/solid';
  
  const props = defineProps(['title', 'defaultOpen']);

  const isOpen = ref(props.defaultOpen);

  const onClick = (e) => {
    isOpen.value = !isOpen.value;
  }

</script>