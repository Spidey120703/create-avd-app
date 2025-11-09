<script setup lang="ts">
// import { invoke } from "@tauri-apps/api/core";
import { useAvdConfigStore } from "./stores/useAvdConfig";
import AvdNameId from "./components/avd-name-id.vue";
import Device from "./components/device.vue";
import OperatingSystem from "./components/operating-system.vue";
import PreferredAbi from "./components/preferred-abi.vue";
import StartupOrientation from "./components/startup-orientation.vue";
import Camera from "./components/camera.vue";
import Network from "./components/network.vue";
import EmulatedPerformance from "./components/emulated-performance.vue";
import MemoryAndStorage from "./components/memory-and-storage.vue";
import DeviceFrame from "./components/device-frame.vue";
import Keyboard from "./components/keyboard.vue";

// const greetMsg = ref("");
// const name = ref("");

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//   greetMsg.value = await invoke("greet", { name: name.value });
// }


const store = useAvdConfigStore();


</script>

<template>
  <main class="bg-#2b2d30 w-full h-full flex flex-col" @focusout="store.resetHints">
    <header class="bg-#4b4b4b text-white p-6 flex flex-row gap-6 items-center">
      <img src="./assets/icon.svg" alt="Android Studio Logo" />
      <h1 class="font-normal! text-6">Android Virtual Device (AVD)</h1>
    </header>
    <main class="p-6 flex flex-col flex-1">
      <section class="flex-1 flex flex-row gap-2">
        <div class="flex-1 b-.5px b-solid b-#1e1f22 p-2 pr-4 overflow-auto">
          <form class="form min-w-420px h-0">
            <!-- AVD Name & AVD ID -->
            <AvdNameId />
            <hr />
            <!-- Device -->
            <Device />
            <hr />
            <!-- Operating System -->
            <OperatingSystem />
            <hr />
            <!-- Preferred ABI -->
            <PreferredAbi />
            <hr />
            <!-- Startup orientation -->
            <StartupOrientation />
            <hr />
            <!-- Camera -->
            <Camera />
            <hr />
            <!-- Network -->
            <Network />
            <hr />
            <!-- Emulated Performance -->
            <EmulatedPerformance />
            <hr />
            <!-- Memory and Storage -->
            <MemoryAndStorage />
            <hr />
            <!-- Device Frame -->
            <DeviceFrame />
            <hr />
            <Keyboard />
            <div class="pt-2 w-full"></div>
          </form>
        </div>
        <section class="w-475px c-#dfe1e5">
          <template v-if="store.hints">
            <header class="p-4">
              <h2 class="m-0 text-15px">{{ store.hints.title }}</h2>
            </header>
            <hr class="b-#dfe1e5 b-t-1px b-l-none b-r-none b-b-none m-0"/>
            <main class="p-4 text-12px line-height-18px">
              <div v-html="store.hints.content"></div>
            </main>
          </template>
          <div v-else class="w-100% h-100% flex items-center justify-center text-13px">
            <span>Nothing Selected</span>
          </div>
        </section>
      </section>
      <footer class="text-12px text-#dfe1e5 min-h-6.5">
        <span v-if="store.tips"><span class="c-#db5c5c text-16px inline mr-2 vertical-mid">⚠</span>{{ store.tips }}</span>
      </footer>
    </main>
    <footer class="b-t-2 b-t-solid b-t-#1e1f22 text-white px-4 py-3">
      <div class="flex flex-row justify-end gap-4">
        <button type="button" class="btn">Cancel</button>
        <button type="button" class="btn btn--flat">Finish</button>
      </div>
    </footer>
  </main>
</template>

<style lang="scss" scoped>

</style>