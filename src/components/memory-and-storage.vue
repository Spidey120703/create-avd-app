<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import SizeInput from './inputs/size-input.vue';
import { useAvdConfigStore } from "../stores/useAvdConfig";

const store = useAvdConfigStore();

watch(
  () => store.config.hw.ramSize,
  (newSize) => {
    if (newSize < 128) {
      store.setTips('RAM must be at least 128 MB. Recommendation is 1 GB.');
      return;
    }
    store.resetTips();
  }
);

watch(
  () => store.config.vm.heapSize,
  (newSize) => {
    if (newSize < 16) {
      store.setTips('VM heap must be at least 16 MB.');
      return;
    }
    store.resetTips();
  }
);

watch(
  () => store.config.disk.dataPartition.size,
  (newSize) => {
    if (Number(newSize.slice(0, -1)) < 2) {
      store.setTips('Internal storage must be at least 2 GB.');
      return;
    }
    store.resetTips();
  }
);

const SDCard = ref<string>('studio-managed');

const sdcard = reactive<{
  size?: string,
  path?: string,
}>(store.config.sdcard || {});

watch(
  () => sdcard.size,
  (newSize) => {
    if (Number(newSize!.slice(0, -1)) < 10) {
      store.setTips('The SD card must be at least 10 MB.');
      return;
    }
    store.resetTips();
  }
);

watch([sdcard, SDCard], () => {
  switch (SDCard.value) {
    case 'studio-managed':
      store.config.sdcard = {
        size: sdcard.size!,
      };
      store.config.hw.sdCard = true;
      break;
    case 'external-file':
      store.config.sdcard = {
        path: sdcard.path!,
      };
      store.config.hw.sdCard = true;
      break;
    case 'no-sd-card':
      delete store.config.sdcard;
      store.config.hw.sdCard = false;
      break;
  }
}, {
    deep: true,
    immediate: true,
});

</script>

<template>
  <div class="form-item-group">
    <div class="form-item-group__title w-32!">Memory and Storage</div>
    <div class="form-item-group__items">
      <!-- RAM -->
      <div class="form-item gap-3">
        <label for="ram" class="w-24 block">RAM:</label>
        <SizeInput id="ram" v-model="store.config.hw.ramSize" class="flex-1" @focus="store.setHintsById('ram')" @blur="store.onBlur" />
      </div>
      <!-- VM Heap -->
      <div class="form-item gap-3">
        <label for="vm-heap" class="w-24 block">VM heap:</label>
        <SizeInput id="vm-heap" v-model="store.config.vm.heapSize" class="flex-1" @focus="store.setHintsById('vm-heap')" @blur="store.onBlur" />
      </div>
      <!-- Internal Storage -->
      <div class="form-item gap-3">
        <label for="internal-storage" class="w-24 block">Internal storage:</label>
        <SizeInput id="internal-storage" v-model="store.config.disk.dataPartition.size" target-unit="G" :number-only="false" class="flex-1" @focus="store.setHintsById('internal-storage')" @blur="store.onBlur" />
      </div>
      <!-- SD Card -->
      <fieldset class="form-item">
        <legend>SD card:</legend>
        <ul class="radio ml-26! flex flex-col gap-3">
          <li @mousedown.stop="store.setHintsById('sd-card-studio-managed')">
            <input type="radio" id="studio-managed" v-model="SDCard" value="studio-managed" @focus="store.setHintsById('sd-card-studio-managed')" @blur="store.resetHints" />
            <label for="studio-managed" class="ml-2 mr-3 w-24">Studio-managed</label>
            <SizeInput v-model="sdcard.size!" :number-only="false" :disabled="SDCard !== 'studio-managed'" class="flex-1" @focus="store.setHintsById('sd-card-studio-managed')" />
          </li>
          <li @mousedown.stop="store.setHintsById('sd-card-external-file')">
            <input type="radio" id="external-file" v-model="SDCard" value="external-file" @focus="store.setHintsById('sd-card-external-file')" @blur="store.resetHints" />
            <label for="external-file" class="ml-2 mr-3 w-24">External file</label>
            <input type="text" v-model="sdcard.path!" :disabled="SDCard !== 'external-file'" class="input flex-1" @blur="store.onBlur" @focus="store.setHintsById('sd-card-external-file')" />
          </li>
          <li @mousedown.stop="store.setHintsById('sd-card-no-sdcard')">
            <input type="radio" id="no-sd-card" v-model="SDCard" value="no-sd-card" @focus="store.setHintsById('sd-card-no-sdcard')" @blur="store.resetHints" />
            <label for="no-sd-card" class="ml-2">No SDCard</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </div>
</template>