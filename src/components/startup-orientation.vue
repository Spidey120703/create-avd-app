<script setup lang="ts">
import { useAvdConfigStore } from '../stores/useAvdConfig';

const store = useAvdConfigStore();

</script>

<template>
  <fieldset class="form-item">
    <legend>Startup orientation:</legend>
    <div class="ml-32 flex">
      <div class="radio--card" @mousedown.stop.prevent="store.setHintsById('startup-orientation')">
        <input type="radio" id="portrait" v-model="store.config.hw.initialOrientation" value="portrait" @focus="store.setHintsById('startup-orientation')" @blur="store.resetHints" />
        <label for="portrait">
          <div class="label__icon">
            <div class="w-6 h-12 bg-#afb1b3 rounded-.85 relative">
              <div class="absolute inset-.2 rounded-.85 bg-#2b2d30 flex flex-col items-center">
                <div class="mt-.5 w-2 h-.55 rounded-full bg-#afb1b3"></div>
              </div>
            </div>
          </div>
          <div class="label__text">Portrait</div>
        </label>
      </div>

      <div class="radio--card" @mousedown.stop.prevent="store.setHintsById('startup-orientation')"  >
        <input type="radio" id="landscape" v-model="store.config.hw.initialOrientation" value="landscape" @focus="store.setHintsById('startup-orientation')" @blur="store.resetHints" />
        <label for="landscape">
          <div class="label__icon">
            <div class="w-12 h-6 bg-#afb1b3 rounded-.85 relative">
              <div class="absolute inset-.2 rounded-.85 bg-#2b2d30 flex flex-row items-center">
                <div class="ml-.5 w-.55 h-2 rounded-full bg-#afb1b3"></div>
              </div>
            </div>
          </div>
          <div class="label__text">Landscape</div>
        </label>
      </div>
    </div>
  </fieldset>
</template>