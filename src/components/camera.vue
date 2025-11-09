<script setup lang="ts">
import { useAvdConfigStore } from '../stores/useAvdConfig';

const CameraOptions = [
  { label: 'None', value: 'none' },
  { label: 'Emulated', value: 'emulated' }, 
  { label: 'VirtualScene', value: 'virtualscene' }
];

const store = useAvdConfigStore();

</script>

<template>
  <div class="form-item-group">
    <div class="form-item-group__title">Camera</div>
    <div class="form-item-group__items">
      <div class="form-item">
        <label for="front-camera" class="w-12 block">Front:</label>
        <select id="front-camera" v-model="store.config.hw.camera.front" class="select w-32" @click.stop="store.setHintsById('front-camera')" @focus="store.setHintsById('front-camera')" @blur="store.resetHints">
          <option v-for="o in CameraOptions" :value="o.value">{{ o.label }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="back-camera" class="w-12 block">Back:</label>
        <select id="back-camera" v-model="store.config.hw.camera.back" class="select w-32" @click.stop="store.setHintsById('back-camera')" @focus="store.setHintsById('back-camera')" @blur="store.resetHints">
          <option v-for="o in CameraOptions" :value="o.value">{{ o.label }}</option>
        </select>
      </div>
    </div>
  </div>
</template>