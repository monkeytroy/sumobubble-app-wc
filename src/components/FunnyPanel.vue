<template>
  <div class="select-none">
    <div v-for="(value, index) in funny.urls">
      <img :key="index" :src="value"/>
    </div>

    <div v-if="lines?.length > 0">
      <div ref="listContainRef">
        <div class="delay-0 delay-2000 delay-4000 delay-6000 delay-8000"></div>
        <div v-for="(value, index) in lines" :key="value">
          <Markdown :source="value" 
            class="text-xl mb-2 transition-opacity duraton-1000 opacity-0"
            :class="transClasses[index]"></Markdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import { computed, defineProps, nextTick, onMounted, ref, watch } from 'vue';
  import Markdown from '@/components/Markdown.vue'
  
  const props = defineProps(['config']);

  const funny = computed<ISiteSection>(() => {
    return props.config?.sections?.funny;
  });

  const lines = computed(() => {
    if (funny.value.content) {
      const content: string = funny.value.content;
      return content.split('\n');
    } else {
      return [];
    }
  })

  const listContainRef = ref(null);
  const transClasses = ref([] as string[]);
  
  watch(listContainRef, () => {
    transClasses.value = [];
    setTimeout(() => setupTransClass(), 500);
  });

  // dynamic creation of transition classes to load line by line text. 
  const setupTransClass = () => {
    transClasses.value = [];
    let newTransClasses: string[] = [];
    const len = lines.value?.length || 0;
    for (let i = 0; i < len; i++) {
      newTransClasses.push(`opacity-100 delay-${i == 0 || len > 6 ? '0' : '' + i * 2000}`);  
    }
    transClasses.value = newTransClasses;

  }
 

</script>