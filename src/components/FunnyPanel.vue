<template>
  <AccordianContent title="Funny" 
    v-if="funny && config?.funny?.enabled" 
    v-slot="{isContainerOpen}"
    :config="config" scrollItem="funnyPanelRef">
    <div>
      <div v-if="meme">
        <img :src="meme"/>
      </div>

      <div v-if="funny && isContainerOpen">
        <div ref="listContainRef">
          <div v-for="(value, index) in funny" :key="value" class="text-xl delay-0 delay-2000">
            <Markdown :source="value" 
              class="mb-2 opacity-0 transition-opacity duraton-1000"
              :class="transClasses[index]"></Markdown>
          </div>
        </div>
      </div>
    </div>
  </AccordianContent>
</template>

<script lang="ts" setup>

  import { computed, defineProps, nextTick, onMounted, ref, watch } from 'vue';
  import AccordianContent from '@/components/AccordionContent.vue';
  import Markdown from '@/components/Markdown.vue'
  
  const props = defineProps(['config']);
  const first = ref(false);

  const funny = computed(() => {
    const lines = props.config?.funny?.lines || '';
    return Array.isArray(lines) ? lines : [lines];
  });

  const meme = computed(() => {
    return props.config?.funny?.meme || '';
  });

  const listContainRef = ref(null);
  const transClasses = ref([] as string[]);
  
  watch(listContainRef, () => {
    transClasses.value = [];
    nextTick(() => {
      mute();
    });
  });

  const mute = () => {
    transClasses.value = [];
    let newTransClasses: string[] = [];

    for (let i = 0; i < funny.value.length; i++) {
      newTransClasses.push(`opacity-100 delay-${i == 0 ? '0' : '2000'}`);
    }
    transClasses.value = newTransClasses;
  }

</script>