<template>
  <AccordianContent title="Special Message" 
    v-if="content" default-open="true">
    <Markdown :source="content"></Markdown>
  </AccordianContent>
</template>

<script setup>

  import { defineProps, computed } from 'vue';
  import AccordianContent from './AccordionContent.vue';
  import Markdown from './Markdown.vue';
  
  const props = defineProps(['config']);
  const content = computed(() => props.config?.special?.content || '');

</script>
