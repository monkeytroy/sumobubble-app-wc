<template>
  <div class="group cursor-pointer 
    hover:underline hover:text-skin-primary
      flex flex-col gap-0 items-center text-gray-500" 
      @click="emit('click')">

    <div class="p-1 bg-transparent border-transparent rounded-full
      border-2 group-hover:border-skin-primary/60">
      <slot></slot>
    </div>
    <span class="">{{text}}</span>
  </div>
</template>

<script lang="ts" setup>

  import { defineProps, defineEmits } from 'vue';

  const props = defineProps(['icon', 'text']);
  const emit = defineEmits(['click']);

</script>