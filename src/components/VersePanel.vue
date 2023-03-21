<template>
  <AccordianContent title="Daily Verse" v-if="content">
    <Markdown :source="content" class="text-xl"></Markdown>
  </AccordianContent>
</template>

<script setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from './AccordionContent.vue';
  import Markdown from './Markdown.vue'
  
  const props = defineProps(['config']);
  const content = computed(() => props?.config?.verse?.content || '');

</script>
