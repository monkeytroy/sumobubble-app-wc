<template>
  <AccordianContent title="Daily Verse" v-if="verse.enabled" :config="config" scrollItem="versePanelRef">

    <div v-if="verse.props.verseRef" class="text-xl font-bold text-gray-800 flex gap-2 align-top">
      {{ verse.props.verseRef }}
      <Popover v-if="verse.props?.copyright" v-slot="{ open }" class="font-normal text-sm" >
        <PopoverButton>
          (c)
        </PopoverButton>

        <PopoverPanel class="absolute left-0 p-2 bg-white border-gray-500 border-2 rounded-md shadow-lg">
          <div class="text-xs text-gray-500 my-2">{{ verse.props?.copyright }}</div>    
        </PopoverPanel>
      </Popover>
    </div>

    <Markdown :source="verse.content || ''" class="text-xl text-gray-800"></Markdown>
      
  </AccordianContent>
</template>

<script lang="ts" setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from '@/components//AccordionContent.vue';
  import Markdown from '@/components/Markdown.vue';
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
  
  const props = defineProps(['config']);

  const verse = computed(() => props?.config?.sections?.verse || {});

</script>
