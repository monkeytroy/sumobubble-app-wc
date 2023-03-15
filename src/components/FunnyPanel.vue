<template>
  <AccordianContent title="Funny"
    v-if="content">
    <Markdown :source="content"></Markdown>
  </AccordianContent>
</template>

<script setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from './AccordionContent.vue';
  import Markdown from './Markdown.vue'
  
  const props = defineProps(['config']);
  const content = computed(() => props.config?.funny?.content || '');

</script>
