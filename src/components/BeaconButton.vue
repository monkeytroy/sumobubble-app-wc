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

        <div class="p-2 grow rounded-b-3xl overflow-hidden flex flex-col">
          <div class="overflow-y-auto p-2 grow flex flex-col gap-4" ref="scrollContainer">
            <SummaryPanel :config="config" v-if="page=='home'" ></SummaryPanel>
            <SpecialPanel :config="config" v-if="page=='home'" ></SpecialPanel>             
            <ContactPanel :config="config" v-if="page=='contact'"></ContactPanel>
            <PrayerPanel :config="config" v-if="page=='prayer'"></PrayerPanel>
            <VersePanel :config="config" v-if="page=='verse'"></VersePanel>
            <SpotlightPanel :config="config" v-if="page=='spotlight'"></SpotlightPanel>
            <FunnyPanel :config="config" v-if="page=='funny'"></FunnyPanel>
          </div>
        </div>

        <div class="rounded-b-3xl bg-gray-200 h-full
          text-2xs font-semibold select-none">

          <div class="flex flex-wrap justify-evenly gap-2 uppercase p-2">

            <LowerNavButton @click="page='home'" text="Back"
              v-if="page != 'home'">
              <ChevronLeftIcon class="h-6 w-6"/>
            </LowerNavButton>

            <LowerNavButton @click="page='contact'" text="Contact"
              v-if="page == 'home' && config?.sections?.contact?.enabled">
              <UsersIcon class="h-6 w-6"/>
            </LowerNavButton>

            <LowerNavButton @click="page='prayer'" text="Request"
              v-if="page == 'home' && config?.sections?.prayer?.enabled">
              <img class="h-6 w-6 text-black" 
                src="data:image/png;base64,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"/>
            </LowerNavButton>

            <LowerNavButton @click="page='verse'" text="Verse"
              v-if="page == 'home' && config?.sections?.verse?.enabled">
              <BookOpenIcon class="h-6 w-6"/>
            </LowerNavButton>

            <LowerNavButton @click="page='spotlight'" text="Spotlight"
              v-if="page == 'home' && config?.sections?.spotlight?.enabled">
              <TvIcon class="h-6 w-6"/>
            </LowerNavButton>

            <LowerNavButton @click="page='funny'" text="Funny"
              v-if="page == 'home' && config?.sections?.funny?.enabled">
              <FaceSmileIcon class="h-6 w-6"/>
            </LowerNavButton>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import { ref, defineProps, provide, computed } from 'vue';
  import SummaryPanel from '@/components/SummaryPanel.vue';
  import SpecialPanel from '@/components/SpecialPanel.vue';
  import ContactPanel from '@/components/ContactPanel.vue';
  import PrayerPanel from '@/components/PrayerPanel.vue';
  import VersePanel from '@/components/VersePanel.vue';
  import SpotlightPanel from '@/components/SpotlightPanel.vue';
  import FunnyPanel from '@/components/FunnyPanel.vue';
  import { ChevronLeftIcon, XCircleIcon } from '@heroicons/vue/20/solid';
  import { track } from '@/services/metrics';
  import tinycolor from "tinycolor2";
  import { UsersIcon, FaceSmileIcon, BookOpenIcon, StarIcon, TvIcon } 
    from '@heroicons/vue/24/outline';
  import { getTextColorByBrightness } from '@/services/theme';
  import LowerNavButton from './LowerNavButton.vue';

  const props = defineProps(['config']);
  const open = ref(true);

  const page = ref('home');

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