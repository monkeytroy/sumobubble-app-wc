<template>
  <div v-html="markdownAsHtml"></div>
</template>

<script setup>

  import { defineProps, computed } from 'vue';
  import marked from 'markdown-it';
  
  const props = defineProps(['source']);

  const markdownIt = marked();
  
  const markdownAsHtml = computed(() => {
    return markdownIt.render(props?.source || '');
  });

</script>
