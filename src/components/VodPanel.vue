<template>
  <AccordianContent title="Spotlight" 
    v-if="url">
    <iframe :src="url" 
      frameborder="0" 
      class="w-full h-48"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  </AccordianContent>
</template>

<script setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from './AccordionContent.vue';

  const props = defineProps(['config']);
  const url = computed(() => props?.config?.vod?.url);

</script>
