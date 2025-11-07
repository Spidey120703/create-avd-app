export interface AvdConfig {
  AvdId: string;
  PlayStore: { enabled: boolean };
  abi: { type: string };
  avd: {
    ini: {
      displayname: string;
      encoding: string;
    };
  };
  disk: {
    dataPartition: {
      size: string;
    };
  };
  fastboot: {
    chosenSnapshotFile: string;
    forceChosenSnapshotBoot: boolean;
    forceColdBoot: boolean;
    forceFastBoot: boolean;
  };
  hw: {
    accelerometer: boolean;
    audioInput: boolean;
    battery: boolean;
    camera: {
      back: string;
      front: string;
    };
    cpu: {
      arch: string;
      ncore: number;
    };
    dPad: boolean;
    device: {
      hash2: string;
      manufacturer: string;
      name: string;
    };
    gps: boolean;
    gpu: {
      enabled: boolean;
      mode: string;
    };
    initialOrientation: string;
    keyboard: boolean;
    lcd: {
      density: number;
      height: number;
      width: number;
    };
    mainKeys: boolean;
    ramSize: number;
    sdCard: boolean;
    sensors: {
      orientation: boolean;
      proximity: boolean;
    };
    trackBall: boolean;
  };
  image: {
    sysdir: Record<number, string>;
  };
  runtime: {
    network: {
      latency: string;
      speed: string;
    };
  };
  sdcard?: {
    size: string;
  } | {
    path: string;
  };
  showDeviceFrame: boolean;
  skin: {
    dynamic: boolean;
    name: string;
    path: string;
  };
  tag: {
    display: string;
    displaynames: string;
    id: string;
    ids: string;
  };
  vm: {
    heapSize: number;
  };
}