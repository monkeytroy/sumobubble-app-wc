<template>
  <AccordianContent title="Funny" v-if="funny" v-slot="{isContainerOpen}">
    <div ref="listContainRef">
      <div v-if="isContainerOpen" 
        v-for="(value, index) in funny" :key="value" class="text-xl delay-0 delay-2000">
        <Markdown :source="value" 
          class="mb-2 opacity-0 transition-opacity duraton-1000" 
          :class="transClasses[index]"></Markdown>
      </div>
    </div>
  </AccordianContent>
</template>

<script setup>

  import { computed, defineProps, onMounted, ref } from 'vue';
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

  const listContainRef = ref(null);
  const transClasses = ref([]);
  
  const mute = () => {
    transClasses.value = [];
    let newTransClasses = [];
    setTimeout(() => {
      for (let i = 0; i < funny.value.length; i++) {
        newTransClasses.push(`opacity-100 delay-${i == 0 ? '0' : '2000'}`);
      }
      transClasses.value = newTransClasses;
    }, 400);
  }

  onMounted(() => {
    const observer = new MutationObserver(mute);
    observer.observe(listContainRef.value, {
      childList: true,
      subtree: true 
    });
  });

</script>