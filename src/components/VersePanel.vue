<template>
  <AccordianContent title="Daily Verse" v-if="config?.verse?.enabled">
    <div v-if="config.verse.verseRef" class="text-xl font-bold text-gray-800">{{ config.verse.verseRef }}</div>
    <Markdown :source="content" class="text-xl text-gray-800"></Markdown>
    <div v-if="config.verse.copyright" 
      class="text-xs text-gray-500 my-2">{{ config.verse.copyright }}</div>
  </AccordianContent>
</template>

<script setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from './AccordionContent.vue';
  import Markdown from './Markdown.vue'
  
  const props = defineProps(['config']);

  const content = computed(() => props?.config?.verse?.content || '');

</script>
