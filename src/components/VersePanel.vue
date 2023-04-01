<template>
  <AccordianContent title="Daily Verse" v-if="verse.enabled" :config="config" scrollItem="versePanelRef">

    <div v-if="verse.props.verseRef" class="text-xl font-bold text-gray-800">{{ verse.props.verseRef }}</div>

    <Markdown :source="verse.content || ''" class="text-xl text-gray-800"></Markdown>

    <div v-if="verse.props?.copyright" 
      class="text-xs text-gray-500 my-2">{{ verse.props?.copyright }}</div>
      
  </AccordianContent>
</template>

<script lang="ts" setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from '@/components//AccordionContent.vue';
  import Markdown from '@/components/Markdown.vue'
  
  const props = defineProps(['config']);

  const verse = computed(() => props?.config?.sections?.verse || {});

</script>
