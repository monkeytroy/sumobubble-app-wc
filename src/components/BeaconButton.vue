<template>
  <div class="fixed bottom-6 right-6 z-50">

    <button class="h-12 w-12 select-none
      flex items-center justify-center
      p-2 rounded-full
      text-gray-900 bg-skin-primary hover:opacity-80"
      @click="onClick" 
      >
      <span class="font-semibold text-2xl">B</span>
    </button>
  
    <div class="absolute -left-96 mr-4 bottom-0 z-10" 
      :class="open ? 'visible': 'hidden'">
      
      <div class="w-screen max-w-md rounded-3xl bg-white
        text-sm shadow-lg ring-1 ring-gray-900/5 p-2 flex"
        style="max-height: 90vh !important">

          <div class="rounded-t-3xl absolute inset-x-0 top-0 p-4 
            text-gray-800 bg-skin-primary bg-opacity-40
            text-2xl font-bold select-none
            flex justify-between items-center uppercase z-20">
            {{ config?.customer?.title }}
            <XCircleIcon class="w-6 h-6 cursor-pointer hover:text-gray-600" 
              @click="close">
            </XCircleIcon>
          </div>

          <div class="overflow-y-auto px-2 mt-16">
            <ul role="list" class="space-y-2">
              <li class="relative">
                <SummaryPanel :config="config"></SummaryPanel>
              </li>
              <li class="relative">
                <SpecialPanel :config="config"></SpecialPanel>
              </li>
              <li class="relative">
                <ContactPanel :config="config"></ContactPanel>
              </li>
              <li class="relative">
                <VersePanel :config="config"></VersePanel>
              </li>
              <li class="relative">
                <VodPanel :config="config"></VodPanel>
              </li>
              <li class="relative">
                <FunnyPanel :config="config"></FunnyPanel>
              </li>
            </ul>
          </div>

      </div>
    </div>

  </div>
</template>

<script setup>

  import { ref, defineProps } from 'vue';
  import SummaryPanel from './SummaryPanel.vue';
  import SpecialPanel from './SpecialPanel.vue';
  import ContactPanel from './ContactPanel.vue';
  import VersePanel from './VersePanel.vue';
  import VodPanel from './VodPanel.vue';
  import FunnyPanel from './FunnyPanel.vue';
  import { XCircleIcon } from '@heroicons/vue/20/solid';

  const props = defineProps(['config']);

  const open = ref(false);

  const onClick = () => {
    open.value = !open.value;
  }

  const close = () => {
    open.value = false;
  }

</script>