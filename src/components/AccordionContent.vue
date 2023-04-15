<template>
  <div>
    <Disclosure :defaultOpen=defaultOpen>
      <DisclosureButton className="flex w-full justify-between rounded-lg 
          bg-skin-primary bg-opacity-89 hover:bg-opacity-70 text-gray-900 
          px-4 py-2 text-left text-sm font-medium 
          focus:outline-none focus-visible:ring 
          focus-visible:ring-skin-primary focus-visible:ring-opacity-75"
          @click="onClick"
          >
        {{ title || '' }}
        <ChevronUpIcon
            :class="isOpen ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-purple-500"
          />
      </DisclosureButton>
      <div v-show="isOpen">
        <DisclosurePanel static className="px-4 pt-4 pb-2 text-sm">
          <div ref="contentRef">
            <slot :isContainerOpen="isOpen"></slot>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  </div>
</template>

<script lang="ts" setup>

  import { defineProps, inject, nextTick, Ref, ref, watch } from 'vue';
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
  import { ChevronUpIcon } from '@heroicons/vue/20/solid';
  import { track } from '@/services/metrics';
  import { scrollContent } from '@/services/scroll';

  const props = defineProps(['title', 'defaultOpen', 'config', 'scrollItem']);
  const isOpen = ref(props.defaultOpen);
  const contentRef = ref(null);

  // used to do scrolling.
  const panelsRefs = inject('panelRefs');

  // inject the opened section
  const openedSection:any = inject('openedSection');

  // watch for changes to it so only one opened at a time.
  watch(openedSection, () => {
    if (openedSection.value != props.title) {
      isOpen.value = false;
    }
  });

  const onClick = () => {
  
    if (!isOpen.value) {

      track('Panel Open', {
        beaconPanel: props.title
      });

      // set the opened section.
      // will trigger the watch above and close other sections.
      openedSection.value = props.title;

      // event the panel is open.
      nextTick(() => {
        if (contentRef.value) {
          const parent = (contentRef.value as HTMLElement).parentElement;
          if (parent) {
            scrollContent(props.scrollItem, panelsRefs);
          }
        }
      });
      
    }

    isOpen.value = !isOpen.value;
  }

</script>