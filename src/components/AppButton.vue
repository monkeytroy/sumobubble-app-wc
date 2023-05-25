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
    <div class="fixed bottom-6 right-0 sm:right-0 z-999 max-w-full sm:max-w-md w-full" 
      :class="open ? 'visible': 'hidden'">

      <div class="rounded-3xl bg-white mx-4
        text-sm ring-1 ring-gray-900/5 flex flex-col shadow-md"
        style="max-height: 90vh !important; min-height: 400px !important;">

        <div class="rounded-t-3xl 
          bg-skin-primary brightness-105 h-full
          text-2xl font-bold select-none">
          <div class="flex justify-between items-center uppercase p-4 "
            :class="getTextColorByBrightness(config?.customer?.theme.primary)">
            {{ config?.customer?.title || 'Hello there'}}
            <XCircleIcon class="w-6 h-6 cursor-pointer hover:opacity-70" 
              @click="close">
            </XCircleIcon>
          </div>
        </div>

        <div class="px-2 grow rounded-b-3xl overflow-hidden flex flex-col">
          <div class="px-2 overflow-y-auto grow flex flex-col" ref="scrollContainer" v-if="page=='info'">

            <div class="mb-4">
              <SummaryPanel :config="config"></SummaryPanel>
            </div>

            <div class="mb-4" v-if="config?.summary?.special">
              <SpecialPanel :config="config"></SpecialPanel>             
            </div>

            <div class="mb-4" v-if="config?.sections?.spotlight?.enabled">
              <SpotlightPanel :config="config"></SpotlightPanel>
            </div>

            <AccordionContent title="Contact us!" 
              scrollItem="contactPanelRef"
              v-if="config?.sections?.contact?.enabled">
              <div ref="contactPanelRef">
                <ContactPanel :config="config"></ContactPanel>
              </div>
            </AccordionContent>

            <AccordionContent title="Request more information" 
              scrollItem="infoRequstPanelRef"
              v-if="config?.sections?.info?.enabled">
              <div ref="infoRequstPanelRef">
                <InfoRequestPanel :config="config"></InfoRequestPanel>
              </div>
            </AccordionContent>

          </div>
          <div v-if="page=='ask'" class="block overflow-hidden relative" style="height: 600px">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/suN80wdHOh9pMC-zxLEYt"
              width="100%"
              height="100%"
              frameborder="0">
            </iframe>
          </div>
        </div>

        <div class="rounded-b-3xl bg-gray-200 h-full text-2xs font-semibold select-none"
          v-if="config?.sections?.chatbot?.enabled">
          <div class="flex flex-wrap justify-evenly gap-2 uppercase p-2">

            <LowerNavButton @click="page='info'" text="About Us">
              <InformationCircleIcon class="h-8 w-auto"/>
            </LowerNavButton>            

            <LowerNavButton @click="page='ask'" text="Ask Us">
              <QuestionMarkCircleIcon class="h-8 w-auto"/>
            </LowerNavButton>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import { ref, defineProps, provide, computed } from 'vue';
  import AccordionContent from '@/components/AccordionContent.vue';
  import SummaryPanel from '@/components/SummaryPanel.vue';
  import SpecialPanel from '@/components/SpecialPanel.vue';
  import ContactPanel from '@/components/ContactPanel.vue';
  import InfoRequestPanel from '@/components/InfoRequestPanel.vue';
  import SpotlightPanel from '@/components/SpotlightPanel.vue';
  import { InformationCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
  import { track } from '@/services/metrics';
  import { getTextColorByBrightness } from '@/services/theme';
  import LowerNavButton from './LowerNavButton.vue';

  const props = defineProps(['config']);
  const open = ref(false);

  const page = ref('info');

  const scrollContainer = ref(null);
  const openedSection = ref('');

  const contactPanelRef = ref(null);
  const spotlightPanelRef = ref(null);
  const infoRequstPanelRef = ref(null);

  const panelRefs = {
    scrollContainer,
    contactPanelRef,
    spotlightPanelRef,
    infoRequstPanelRef
  }

  provide('openedSection', openedSection);
    // provide to accordion container for scrolling. 
  provide('panelRefs', panelRefs);

  const onClick = () => {
    
    // event track
    track('InfoChat Opened');

    open.value = !open.value;
  }

  const close = () => {
    open.value = false;
  }

</script>