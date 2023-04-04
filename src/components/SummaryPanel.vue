<template>
  <div class="flex-col" v-if="content">
    
    <div class="flex select-none mb-4" 
      :class="isLogoCenter ? 'justify-center': 'justify-start'">
      <img :src="config?.customer?.logo?.url" class="max-w-full max-h-24"/>
    </div>

    <div v-for="(val, idx) in content">
      <div v-if="val === ''">&nbsp;</div>
      <Markdown :source="val" class="text-lg"></Markdown>
    </div>
    
    <div></div>
  </div>
</template>

<script lang="ts" setup>

  import { defineProps, computed } from 'vue';
  import Markdown from '@/components/Markdown.vue';

  const props = defineProps(['config']);
  
  const content = computed(() => props.config?.summary?.content.split('\n') || '');

  const isLogoCenter = computed( e => props.config?.customer?.logo?.align == 'center');

</script>
