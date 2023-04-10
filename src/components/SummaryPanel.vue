<template>
  <div class="flex-col" v-if="content">
    
    <div class="flex select-none mb-4" 
      :class="isLogoCenter ? 'justify-center': 'justify-start'">
      <img :src="config?.customer?.logo?.url" class="max-w-full max-h-24"/>
    </div>

    <div v-if="content">
      <div id="summaryContent" class="fred text-lg" v-html="safeHTML(content)"></div>
    </div>
    
    <div class=""></div>
  </div>
</template>

<script lang="ts" setup>

  import { defineProps, computed } from 'vue';
  import VueSecureHTML from 'vue-html-secure';

  const props = defineProps(['config']);

  const safeHTML = VueSecureHTML.safeHTML;
  
  const content = computed(() => props.config?.summary?.content || '');

  const isLogoCenter = computed( e => props.config?.customer?.logo?.align == 'center');

</script>
