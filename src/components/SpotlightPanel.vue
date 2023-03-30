<template>
  <AccordianContent title="Spotlight" 
    v-if="config?.verse?.enabled && url" 
    :config="config" scrollItem="spotlightPanelRef">
    <iframe :src="url"
      frameborder="0" 
      class="w-full h-48"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  </AccordianContent>
</template>

<script lang="ts"  setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from '@/components/AccordionContent.vue';

  const props = defineProps(['config']);
  const url = computed(() => props?.config?.vod?.url);

</script>
