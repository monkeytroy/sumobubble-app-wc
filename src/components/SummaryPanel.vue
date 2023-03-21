<template>
  <!--<AccordianContent title="Welcome!" default-open="true">-->
    <div class="flex-col space-y-4" v-if="content">
      
      <div class="flex select-none" 
        :class="isLogoCenter ? 'justify-center': 'justify-start'">
        <img :src="config?.customer?.logo?.url" class="max-w-full max-h-24"/>
      </div>

      <Markdown :source="content" class="text-lg"></Markdown>
      
      <div></div>
    </div>
  <!--</AccordianContent>-->
</template>

<script setup>

  import { defineProps, computed } from 'vue';
  //import AccordianContent from './AccordionContent.vue';
  import Markdown from './Markdown.vue';

  const props = defineProps(['config']);
  
  const content = computed(() => props.config?.summary?.content || '');

  const isLogoCenter = computed( e => props.config?.customer?.logo?.align == 'center');

</script>
