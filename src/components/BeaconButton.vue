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
    <div class="fixed bottom-6 right-0 sm:right-0 z-999
        max-w-full sm:max-w-md w-full" 
      :class="open ? 'visible': 'hidden'"
      >
      <div class="rounded-3xl bg-white mx-4
        text-sm ring-1 ring-gray-900/5 flex flex-col
        shadow-md"
        style="max-height: 90vh !important">

        <div class="rounded-t-3xl 
          bg-skin-primary bg-opacity-40 h-full
          text-2xl font-bold select-none">
          <div class="flex justify-between items-center uppercase p-4 text-gray-800">
            {{ config?.customer?.title || 'Hello there'}}
            <XCircleIcon class="w-6 h-6 cursor-pointer hover:text-gray-600" 
              @click="close">
            </XCircleIcon>
          </div>
        </div>

        <div class="p-2 grow rounded-b-3xl overflow-hidden flex flex-col">
          <div class="overflow-y-auto p-2" ref="scrollContainer">
            <ul role="list" class="space-y-2">
              <li class="relative">
                <SummaryPanel :config="config"></SummaryPanel>
              </li>
              <li class="relative">
                <SpecialPanel :config="config"></SpecialPanel>
              </li>
              <li class="relative" ref="contactPanelRef">
                <ContactPanel :config="config" ></ContactPanel>
              </li>
              <li class="relative" ref="prayerPanelRef">
                <PrayerPanel :config="config"></PrayerPanel>
              </li>
              <li class="relative" ref="versePanelRef">
                <VersePanel :config="config"></VersePanel>
              </li>
              <li class="relative" ref="spotlightPanelRef">
                <SpotlightPanel :config="config"></SpotlightPanel>
              </li>
              <li class="relative" ref="funnyPanelRef">
                <FunnyPanel :config="config"></FunnyPanel>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import { ref, defineProps, provide } from 'vue';
  import SummaryPanel from '@/components/SummaryPanel.vue';
  import SpecialPanel from '@/components/SpecialPanel.vue';
  import ContactPanel from '@/components/ContactPanel.vue';
  import PrayerPanel from '@/components/PrayerPanel.vue';
  import VersePanel from '@/components/VersePanel.vue';
  import SpotlightPanel from '@/components/SpotlightPanel.vue';
  import FunnyPanel from '@/components/FunnyPanel.vue';
  import { XCircleIcon } from '@heroicons/vue/20/solid';
  import { track } from '@/services/metrics';

  const props = defineProps(['config']);

  const open = ref(false);

  const scrollContainer = ref(null);
  const openedSection = ref('');

  const contactPanelRef = ref(null);
  const versePanelRef = ref(null);
  const spotlightPanelRef = ref(null);
  const funnyPanelRef = ref(null);
  const prayerPanelRef = ref(null);

  const panelRefs = {
    scrollContainer,
    contactPanelRef,
    versePanelRef,
    spotlightPanelRef,
    funnyPanelRef,
    prayerPanelRef
  }

  provide('openedSection', openedSection);
  
  // provide to accordion container for scrolling. 
  provide('panelRefs', panelRefs);

  const onClick = () => {
    
    // event track
    track('Beacon Opened');

    open.value = !open.value;
  }

  const close = () => {
    open.value = false;
  }

</script>