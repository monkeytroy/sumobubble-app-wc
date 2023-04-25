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
              <img class="h-6 w-6" src="@/assets/pray.svg"/>
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
  import { UsersIcon, FaceSmileIcon, BookOpenIcon, StarIcon, TvIcon } 
    from '@heroicons/vue/24/outline';
  import { getTextColorByBrightness } from '@/services/theme';
  import LowerNavButton from './LowerNavButton.vue';

  const props = defineProps(['config']);
  const open = ref(false);

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