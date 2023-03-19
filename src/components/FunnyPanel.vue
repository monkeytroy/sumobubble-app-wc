<template>
  <AccordianContent title="Funny" v-if="funny" v-slot="{isContainerOpen}">
    <div v-if="isContainerOpen">
      <div v-for="fun in funny" :key="fun" class="text-xl">
        <Markdown :source="fun" class="mb-2"></Markdown>
      </div>
    </div>
  </AccordianContent>
</template>

<script setup>

  import { computed, defineProps } from 'vue';
  import AccordianContent from './AccordionContent.vue';
  import Markdown from './Markdown.vue'
  
  const props = defineProps(['config']);

  const funny = computed(() => {
    let val = props.config?.funny?.content || '';
    if (!val) { 
      val = props.config?.funny?.daily || '';
    }
    return Array.isArray(val) ? val : [val];
  });

</script>