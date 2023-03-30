<template>
  <AccordianContent title="Special Message" 
    v-if="content" default-open="true" 
    :config="config" scrollItem="specialPanelRef">
    <Markdown :source="content" class="text-lg"></Markdown>
  </AccordianContent>
</template>

<script lang="ts" setup>

  import { defineProps, computed } from 'vue';
  import AccordianContent from '@/components/AccordionContent.vue';
  import Markdown from '@/components/Markdown.vue';
  
  const props = defineProps(['config', 'scrollContainer']);
  const content = computed(() => props.config?.special?.content || '');

</script>
