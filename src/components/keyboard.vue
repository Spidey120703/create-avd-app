<script setup lang="ts">
import { useAvdConfigStore } from "../stores/useAvdConfig";

const store = useAvdConfigStore();
</script>

<template>
  <div class="form-item-group">
    <div class="form-item-group__title w-60!">Keyboard</div>
    <div class="form-item-group__items">
      <div class="form-item" @focusin="store.setHintsById('enable-keyboard-input')" @focusout="store.resetHints">
        <input type="checkbox" id="enable-keyboard-input" class="checkbox" />
        <label for="enable-keyboard-input" class="ml-2">Enable keyboard input</label>
      </div>
    </div>
  </div>
</template>