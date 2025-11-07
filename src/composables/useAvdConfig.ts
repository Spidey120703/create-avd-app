import { reactive, ref } from "vue";
import { AvdConfig } from "../types/avd-config";
import { defineStore } from "pinia";

export const useAvdConfigStore = defineStore('avd-config', () => {
  const config = reactive<AvdConfig>({
    AvdId: "Pixel_6_Pro_API_33",
    PlayStore: {
      enabled: false,
    },
    abi: {
      type: "x86_64",
    },
    avd: {
      ini: {
        displayname: "Pixel 6 Pro API 33",
        encoding: "UTF-8",
      },
    },
    disk: {
      dataPartition: {
        size: "2G",
      },
    },
    fastboot: {
      chosenSnapshotFile: "",
      forceChosenSnapshotBoot: false,
      forceColdBoot: false,
      forceFastBoot: true,
    },
    hw: {
      accelerometer: true,
      audioInput: true,
      battery: true,
      camera: {
        back: "virtualscene",
        front: "emulated",
      },
      cpu: {
        arch: "x86_64",
        ncore: 4,
      },
      dPad: false,
      device: {
        hash2: "MD5:a8abfd3536f3d35e4ba2041a7b99f40e",
        manufacturer: "Google",
        name: "pixel_6_pro",
      },
      gps: true,
      gpu: {
        enabled: true,
        mode: "auto",
      },
      initialOrientation: "landscape",
      keyboard: true,
      lcd: {
        density: 560,
        height: 3120,
        width: 1440,
      },
      mainKeys: false,
      ramSize: 2048,
      sdCard: true,
      sensors: {
        orientation: true,
        proximity: true,
      },
      trackBall: false,
    },
    image: {
      sysdir: {
        1: "system-images/android-33/google_apis/x86_64/",
      },
    },
    runtime: {
      network: {
        latency: "none",
        speed: "full",
      },
    },
    sdcard: {
      size: "512M",
    },
    showDeviceFrame: true,
    skin: {
      dynamic: true,
      name: 'pixel_6_pro',
      path: "D:\\Users\\Peter\\AppData\\Local\\Android\\Sdk\\skins\\pixel_6_pro",
    },
    tag: {
      display: "Google APIs",
      displaynames: "Google APIs",
      id: "google_apis",
      ids: "google_apis",
    },
    vm: {
      heapSize: 384,
    },
  });

  const tips = ref<string>("");

  const resetTips = () => {
    tips.value = "";
  }

  const setTips = (message: string) => {
    tips.value = message;
  }

  const onBlur = (event: Event) => {
    if (tips.value) {
      (event.target! as HTMLInputElement).focus();
    }
  };

  return {
    config,
    tips,
    resetTips,
    setTips,
    onBlur,
  };
});
