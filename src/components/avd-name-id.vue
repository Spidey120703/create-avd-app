<script setup lang="ts">
import { watch } from 'vue';
import { useAvdConfigStore } from '../stores/useAvdConfig';


const store = useAvdConfigStore();

watch(
  () => store.config.avd.ini.displayname,
  (newName) => {
    // Generate AVD ID from display name
    if (/[^a-zA-Z0-9._\-() ]/.test(newName)) {
      // Invalid characters present, do not update AVD ID
      store.setTips('The AVD name can contain only the characters a-z A-Z 0-9 . _ - ( )');
      return;
    }
    store.resetTips();
    const avdId = newName
      .trim()
      .replace(/[() ]/g, "_")
      .split("_")
      .filter((part, index, arr) => index === 0 || index === arr.length - 1 || part.length > 0)
      .join("_");
    store.config.AvdId = avdId;
  }
);

</script>

<template>
  <div>
    <!-- AVD Name -->
    <div class="form-item">
      <label for="avd-name" class="w-20 block">AVD Name:</label>
      <input id="avd-name" v-model="store.config.avd.ini.displayname" type="text" class="input flex-1" @focus="store.setHintsById('avd-name')" @blur="store.onBlur" />
    </div>
    <div class="gap"></div>
    <!-- AVD ID -->
    <div class="form-item">
      <label class="w-20 block">AVD ID:</label> 
      <span :tabindex="1" class="flex-1 text-12px" @focus="store.setHintsById('avd-id')" @blur="store.resetHints">{{ store.config.AvdId }}</span>
    </div>
  </div>
</template>