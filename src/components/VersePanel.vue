<template>
  <AccordianContent title="Daily Verse" v-if="verse.enabled" :config="config" scrollItem="versePanelRef">

    <div v-if="verse.props.verseRef" class="text-xl font-bold text-gray-800 flex gap-2 items-center relative">
      {{ verse.props.verseRef }}
      <div v-if="verse.props?.copyright" class="font-normal text-sm cursor-pointer"
        @click="showCopyright = !showCopyright">
          (c)
      </div>
      <div v-if="showCopyright" 
        @mouseout="showCopyright = false" 
        @click="showCopyright = false"
        class="absolute left-0 m-6">
        <div class="bg-white border-gray-500 border-2 rounded-md shadow-lg cursor-pointer">
          <div class="text-xs text-gray-500 p-4">{{ verse.props?.copyright }}</div>    
        </div>
      </div>
    </div>

    <Markdown :source="verse.content || ''" class="text-xl text-gray-800"></Markdown>
      
  </AccordianContent>
</template>

<script lang="ts" setup>

  import { computed, defineProps, ref } from 'vue';
  import AccordianContent from '@/components//AccordionContent.vue';
  import Markdown from '@/components/Markdown.vue';
  
  const props = defineProps(['config']);
  const showCopyright = ref(false);

  const verse = computed(() => props?.config?.sections?.verse || {});

</script>
