<template>
  <AccordianContent title="Funny" 
    v-if="funny?.enabled" 
    v-slot="{isContainerOpen}"
    :config="config" scrollItem="funnyPanelRef">
    <div>

      <div v-for="(value, index) in funny.urls">
        <img :key="index" :src="value"/>
      </div>

      <div v-if="funny.content && isContainerOpen">
        <div ref="listContainRef">
          <div v-for="(value, index) in lines" :key="value" class="text-xl delay-0 delay-2000 delay-4000 delay-6000 delay-8000">
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
  //const first = ref(false);

  const funny = computed<IBeaconSection>(() => {
    return props.config?.sections?.funny;
  });

  const lines = computed(() => {
    const content: string = funny.value.content;
    return content.split('\n');
  })

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
    const len = lines.value?.length;
    for (let i = 0; i < len; i++) {
      newTransClasses.push(`opacity-100 delay-${i == 0 || len > 6 ? '0' : '' + i * 2000}`);
    }
    transClasses.value = newTransClasses;
  }

</script>