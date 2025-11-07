<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useAvdConfigStore } from "../composables/useAvdConfig";

const store = useAvdConfigStore();

const GraphicOptions = [
  { label: 'Automatic', value: 'auto' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Software', value: 'software' },
];

const bootOption = computed({
  get: () => {
    if (store.config.fastboot.forceColdBoot) {
      return 'cold';
    } else if (store.config.fastboot.forceFastBoot) {
      return 'fast';
    } else {
      return 'default';
    }
  },
  set: (value: string) => {
    if (value === 'cold') {
      store.config.fastboot.forceColdBoot = true;
      store.config.fastboot.forceFastBoot = false;
    } else if (value === 'fast') {
      store.config.fastboot.forceColdBoot = false;
      store.config.fastboot.forceFastBoot = true;
    } else {
      store.config.fastboot.forceColdBoot = false;
      store.config.fastboot.forceFastBoot = false;
    }
  }
});

const enableMultiCore = ref(true);
watch(enableMultiCore, (newValue) => {
  if (!newValue) {
    store.config.hw.cpu.ncore = 1;
  }
});
</script>

<template>
  <div class="form-item-group">
    <div class="form-item-group__title w-48!">Emulated Performance</div>
    <div class="form-item-group__items">
      <!-- Graphic -->
      <div class="form-item">
        <label for="network-speed" class="w-24 block">Graphic:</label>
        <select id="network-speed" v-model="store.config.hw.gpu.mode" class="select w-28">
          <option v-for="o in GraphicOptions" :value="o.value">{{ o.label }}</option>
        </select>
      </div>
      <!-- Boot option -->
      <fieldset class="form-item">
        <legend>Boot option:</legend>
        <ul class="radio ml-24!">
          <li>
            <input type="radio" id="cold-boot" v-model="bootOption" value="cold" />
            <label for="cold-boot" class="ml-2">Cold boot</label>
          </li>
          <li>
            <input type="radio" id="fast-boot" v-model="bootOption" value="fast" />
            <label for="fast-boot" class="ml-2">Quick boot</label>
          </li>
        </ul>
      </fieldset>
      <hr class="m-0!" />
      <!-- Multi-Core CPU -->
      <div class="flex flex-row items-center">
        <input type="checkbox" id="enable-multi-core" v-model="enableMultiCore" class="checkbox" />
        <label for="enable-multi-core" class="ml-2">Multi-Core CPU</label>
        <select v-model="store.config.hw.cpu.ncore" :disabled="!enableMultiCore" class="select w-16 ml-4">
          <option v-for="n in 12" :value="n">{{ n }}</option>
        </select>
      </div>
    </div>
  </div> 
</template>