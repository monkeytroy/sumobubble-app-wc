<template>
    <BeaconButton :config="config" class="font-sans text-left" 
      v-if="config"
      :style="cssRootString">
    </BeaconButton>
</template>

<script lang="ts" setup>
  import { ref, defineProps } from 'vue';
  import BeaconButton from '@/components/BeaconButton.vue'
  import { getConfig } from '@/services/api';
  import { getRGBColor, getAccessibleColor } from '@/services/theme';
  import { metricsInit, track } from '@/services/metrics';

  const props = defineProps({
    customer: String,
  });
  
  // custom dynamic theme for TW
  const config = ref();
  const cssRootString = ref('--color-primary: 200 200 250');

  const init = async () => {
    const res = await getConfig(props.customer);
    if (res.success && res.data) {
      config.value = res.data;

      const customerId = config.value.customerId;
      await metricsInit(customerId, config.value?.isDev);

      track('Config Loaded');

      // event log config loaded.
      const primaryColorConfig = config.value.customer?.theme?.primary;
      if (primaryColorConfig) { 
        const primaryColor = getRGBColor(primaryColorConfig, "primary");
        const a11yColor = getRGBColor(getAccessibleColor(primaryColorConfig), "a11y");

        cssRootString.value = `${primaryColor} ${a11yColor}`;
      } 
    }
  }

  init();
  
</script>

<style>
  @import '@/css/index.css';
</style>