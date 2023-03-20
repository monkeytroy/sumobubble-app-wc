<template>
  <div>
    <div class="fixed bottom-6 right-6 z-40 select-none">
      <img src="../assets/i-icon.png" 
        class="w-12 h-12 select-none
        cursor-pointer shadow-sm
        hover:opacity-80 hover:shadow-md
        bg-white rounded-full"
        @click="onClick"/>
    </div>
    <div class="fixed bottom-6 right-0 mx-4 sm:right-2 z-50 
      max-w-full sm:max-w-md" 
      :class="open ? 'visible': 'hidden'">
      
      <div class="rounded-3xl bg-white
        text-sm ring-1 ring-gray-900/5 flex flex-col
        shadow-md"
        style="max-height: 90vh !important">

        <div class="rounded-t-3xl 
          bg-skin-primary bg-opacity-40
          text-2xl font-bold select-none">
          <div class="flex justify-between items-center uppercase p-4 text-gray-800">
            {{ config?.customer?.title }}
            <XCircleIcon class="w-6 h-6 cursor-pointer hover:text-gray-600" 
              @click="close">
            </XCircleIcon>
          </div>
        </div>

        <div class="p-2 grow rounded-b-3xl overflow-hidden flex flex-col">
          <div class="overflow-y-auto p-2">
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