<script setup lang="ts">
import { ref, watch } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { useAvdConfigStore } from "./composables/useAvdConfig";
import EmulatedPerformance from "./components/emulated-performance.vue";
import MemoryAndStorage from "./components/memory-and-storage.vue";

const greetMsg = ref("");
const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}

const CameraOptions = [
  { label: 'None', value: 'none' },
  { label: 'Emulated', value: 'emulated' }, 
  { label: 'VirtualScene', value: 'virtualscene' }
];

const SpeedOptions = [
  { label: 'Full', value: 'full' },
  { label: 'LTE', value: 'lte' }, 
  { label: 'HSDPA', value: 'hsdpa' },
  { label: 'UMTS', value: 'umts' },
  { label: 'EDGE', value: 'edge' },
  { label: 'GPRS', value: 'gprs' },
  { label: 'HSCSD', value: 'hscsd' },
  { label: 'GSM', value: 'gsm' },
];

const LatencyOptions = [
  { label: 'None', value: 'none' },
  { label: 'UMTS', value: 'umts' },
  { label: 'EDGE', value: 'edge' },
  { label: 'GPRS', value: 'gprs' },
];

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
  <main class="bg-#2b2d30 w-full h-full flex flex-col">
    <header class="bg-#4b4b4b text-white p-6 flex flex-row gap-6 items-center">
      <img src="./assets/icon.svg" alt="Android Studio Logo" />
      <h1 class="font-normal! text-6">Android Virtual Device (AVD)</h1>
    </header>
    <main class="p-6 flex flex-col flex-1">
      <section class="flex-1 flex flex-row gap-2">
        <div class="flex-1 b-.5px b-solid b-#1e1f22 p-2 pr-4 overflow-auto">
          <form class="form min-w-420px h-0">
            <div>
              <!-- AVD Name -->
              <div class="form-item">
                <label for="avd-name" class="w-20 block">AVD Name:</label>
                <input id="avd-name" v-model="store.config.avd.ini.displayname" type="text" class="input flex-1" @blur="store.onBlur" />
              </div>
              <div class="gap"></div>
              <!-- AVD ID -->
              <div class="form-item">
                <label class="w-20 block">AVD ID:</label>
                <span class="flex-1 text-12px">{{ store.config.AvdId }}</span>
              </div>
            </div>
            <hr />
            <!-- Device -->
            <div class="form-item">
              <label class="flex-1 flex">
                <span class="flex-1">Pixel 6 Pro</span>
                <span class="flex-1">6.7 1440x3120 560dpi</span>
              </label>
              <button type="button" class="btn">Change...</button>
            </div>
            <hr />
            <!-- Operating System -->
            <div class="form-item">
              <label class="flex-1 flex">
                <span class="flex-1">Tiramisu</span>
                <span class="flex-1">Android 13.0 x86_64</span>
              </label>
              <button type="button" class="btn">Change...</button>
            </div>
            <hr />
            <!-- Preferred ABI -->
            <div class="form-item">
              <label for="preferred-abi" class="w-24 block">Preferred ABI:</label>
              <select id="preferred-abi" class="select w-24">
                <option value="Optimal">Optimal</option>
              </select>
            </div>
            <hr />
            <!-- Startup orientation -->
            <fieldset class="form-item">
              <legend>Startup orientation:</legend>
              <div class="ml-32 flex">
                <div class="radio--card">
                  <input type="radio" id="portrait" v-model="store.config.hw.initialOrientation" value="portrait" />
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

                <div class="radio--card">
                  <input type="radio" id="landscape" v-model="store.config.hw.initialOrientation" value="landscape" />
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
            <hr />
            <!-- Camera -->
            <div class="form-item-group">
              <div class="form-item-group__title">Camera</div>
              <div class="form-item-group__items">
                <div class="form-item">
                  <label for="front-camera" class="w-12 block">Front:</label>
                  <select id="front-camera" v-model="store.config.hw.camera.front" class="select w-32">
                    <option v-for="o in CameraOptions" :value="o.value">{{ o.label }}</option>
                  </select>
                </div>

                <div class="form-item">
                  <label for="back-camera" class="w-12 block">Back:</label>
                  <select id="back-camera" v-model="store.config.hw.camera.back" class="select w-32">
                    <option v-for="o in CameraOptions" :value="o.value">{{ o.label }}</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <!-- Network -->
            <div class="form-item-group">
              <div class="form-item-group__title">Network</div>
              <div class="form-item-group__items">
                <div class="form-item">
                  <label for="network-speed" class="w-16 block">Speed:</label>
                  <select id="network-speed" v-model="store.config.runtime.network.speed" class="select w-24">
                    <option v-for="o in SpeedOptions" :value="o.value">{{ o.label }}</option>
                  </select>
                </div>

                <div class="form-item">
                  <label for="network-latency" class="w-16 block">Latency:</label>
                  <select id="network-latency" v-model="store.config.runtime.network.latency" class="select w-24">
                    <option v-for="o in LatencyOptions" :value="o.value">{{ o.label }}</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <!-- Emulated Performance -->
            <EmulatedPerformance />
            <hr />
            <!-- Memory and Storage -->
            <MemoryAndStorage />
            <hr />
            <!-- Device Frame -->
            <div class="form-item-group">
              <div class="form-item-group__title">Device Frame</div>
              <div class="form-item-group__items">
                <div class="form-item">
                  <input type="checkbox" id="enable-device-frame" class="checkbox" />
                  <label for="enable-device-frame" class="ml-2">Enable device frame</label>
                </div>
                <div class="form-item">
                  <label for="custom-skin-definition" class="w-48 block">Custom skin definition:</label>
                  <select id="custom-skin-definition" v-model="store.config.skin.path" class="select flex-1">
                    <option value="_no_skin">No Skin</option>
                    <option value="pixel_6_pro">pixel_6_pro</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div class="form-item-group">
              <div class="form-item-group__title w-60!">Keyboard</div>
              <div class="form-item-group__items">
                <div class="form-item">
                  <input type="checkbox" id="enable-keyboard-input" class="checkbox" />
                  <label for="enable-keyboard-input" class="ml-2">Enable keyboard input</label>
                </div>
              </div>
            </div>
            <div class="pt-2 w-full"></div>
          </form>
        </div>
        <section class="w-475px c-#dfe1e5">
          <header class="p-4">
            <h2 class="m-0 text-15px">AVD Name</h2>
          </header>
          <hr class="b-#dfe1e5 b-t-1px b-l-none b-r-none b-b-none m-0"/>
          <main class="p-4 text-12px">
            <span>The name of this AVD</span>
          </main>
        </section>
      </section>
      <footer class="text-12px text-#dfe1e5 min-h-6.5">
        <span v-if="store.tips"><span class="c-#db5c5c text-16px inline mr-2 vertical-mid">⚠</span>{{ store.tips }}</span>
      </footer>
    </main>
    <footer class="b-t-2 b-t-solid b-t-#1e1f22 text-white px-4 py-3">
      <div class="flex flex-row justify-end gap-4">
        <button class="btn">Cancel</button>
        <button class="btn btn--flat">Finish</button>
      </div>
    </footer>
  </main>
</template>

<style lang="scss" scoped>

</style>