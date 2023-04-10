<template>
  <AccordianContent title="Spotlight" 
    v-if="spotlight?.enabled && spotlight.urls[0]" 
    :config="config" scrollItem="spotlightPanelRef">

    <p v-if="content" class="text-gray-600 select-none text-xl mb-3">
      {{ content }}
    </p>
        
    <iframe :src="spotlight.urls[0]"
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
  const spotlight = computed(() => props?.config?.sections.spotlight);
  const content = computed(() => props.config?.sections?.spotlight?.content || '');

</script>
