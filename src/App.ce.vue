<template>
    <AppButton :config="config" class="font-sans text-left" 
      v-if="config"
      :style="cssRootString">
    </AppButton>
</template>

<script lang="ts" setup>

  import { ref, defineProps } from 'vue';
  import AppButton from '@/components/AppButton.vue'
  import { getSiteConfig } from '@/services/api';
  import { getRGBColor, getAccessibleColor } from '@/services/theme';
  import { metricsInit, track } from '@/services/metrics';

  const props = defineProps({
    site: String,
  });
  
  // custom dynamic theme for TW
  const config = ref();
  const cssRootString = ref('--color-primary: 200 200 250');

  const init = async () => {
    const res = await getSiteConfig(props.site);
    if (res) {
      config.value = res;

      const customerId = config.value.customerId;
      await metricsInit(customerId, config.value?.isDev);

      track('Config Loaded');

      // event log config loaded.
      const primaryColorConfig = config.value.customer?.theme?.primary || '#aaaaff';
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
<style lang="scss">
  @import '@/css/summary.scss';
</style>