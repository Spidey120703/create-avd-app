<script setup lang="ts">
import { ref } from "vue";
import { useAvdConfigStore } from "../stores/useAvdConfig";

const store = useAvdConfigStore();

const FrameSkins = ref([
  { label: 'No Skin', value: '_no_skin' },
])
</script>

<template>
  <div class="form-item-group">
    <div class="form-item-group__title">Device Frame</div>
    <div class="form-item-group__items">
      <div class="form-item" @focusin="store.setHintsById('enable-device-frame')" @focusout="store.resetHints">
        <input type="checkbox" id="enable-device-frame" class="checkbox" />
        <label for="enable-device-frame" class="ml-2">Enable device frame</label>
      </div>
      <div class="form-item">
        <label for="custom-skin-definition" class="w-48 block">Custom skin definition:</label>
        <select id="custom-skin-definition" v-model="store.config.skin.path" class="select flex-1">
          <option v-for="s in FrameSkins" :value="s.value">{{ s.label }}</option>
        </select>
      </div>
    </div>
  </div>
</template>