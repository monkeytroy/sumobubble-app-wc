<template>
  <AccordianContent title="Funny" v-if="funny && config?.funny?.enabled" v-slot="{isContainerOpen}">

    <div v-if="meme">
      <img :src="meme"/>
    </div>

    <div ref="listContainRef" v-if="funny">
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
    const lines = props.config?.funny?.lines || '';
    return Array.isArray(lines) ? lines : [lines];
  });

  const meme = computed(() => {
    return props.config?.funny?.meme || '';
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
    if (listContainRef.value) {
      const observer = new MutationObserver(mute);
      observer.observe(listContainRef.value, {
        childList: true,
        subtree: true 
      });
    }
  });

</script>