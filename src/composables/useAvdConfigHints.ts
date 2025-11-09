export const useAvdConfigHints = () => {
  const hintsMap = new Map<string, { title: string; content: string }>([
    ['avd-name', { title: 'AVD Name', content: 'The name of this AVD'}],
    ['avd-id', { title: 'AVD Id', content: 'Identification name used to save an AVD on disk. This AVD name can also be used with Android command line tools.'}],
    ['startup-orientation', { title: 'Default Orientation', content: 'Sets the initial orientation of the device. During AVD emulation you can also rotate the device screen.'}],
    ['front-camera', { title: 'Front Camera', content: 'None - no camera installed for AVD<br/>Emulated - use a simulated camera<br/>Device - use host computer webcam or built-in camera' }],
    ['back-camera', { title: 'Back Camera', content: 'None - no camera installed for AVD<br/>VirtualScene - use a virtual camera in a simualted environment<br/>Emulated - use a simulated camera<br/>Device - use host computer webcam or built-in camera' }],
    ['network-speed', { title: 'Network Speed', content: 'Sets the initial state of the simulated network transfer rate used by AVD. The network speed can also be adjusted in the emulator.' }],
    ['network-latency', { title: 'Network Latency', content: 'Sets the initial state of the simulated network transfer latency used by AVD. Latency is the delay in processing data across the network. The latency speed can also be adjusted in the emulator.' }],
    ['graphics', { title: 'Graphics Rendering', content: 'Choose how the graphics should be rendered in the emulator.<p><b>Hardware</b><br/>Use your computer\'s graphics card for faster rendering.</p><p><b>Software</b><br/>Emulate the graphics in software, use this to work around issues with your computer\'s graphics card.</p>' }],
    ['boot-option', { title: 'Boot Option', content: 'Choose how the virtual device should start.<p><b>Cold boot</b><br/>Start as from a power-up.</p><p><b>Quick boot</b><br/>Start from the state that was saved when the device last exited.</p><p><b>Choose from snapshot</b><br/>Start from the chosen snapshot.</p>' }],
    ['multi-core-cpu', { title: 'Number of cores', content: 'Select the number of CPU cores for the emulator to use.' }],
    ['ram', { title: 'Device RAM', content: 'The amount of physical RAM on the device.<br/>1 MB = 1024 KB<br/>1 GB = 1024 MB' }],
    ['vm-heap', { title: 'Virtual Machine Heap', content: 'The amount of RAM available to Java virtual machine (VM) to allocate to running apps on the device. A larger VM heap allows applications to run longer between garbage collection events.' }],
    ['internal-storage', { title: 'Internal Flash', content: 'The amount of non-removable space available to store data on the device.' }],
    ['sd-card-studio-managed', { title: 'Built-in SD Card Size', content: 'The amount of removable space available to store data on the device. We recommend at least 100 MB in order to use the camera in the emulator.' }],
    ['sd-card-external-file', { title: 'Location of external SD Card image', content: 'Choose a file path to an existing SD Card image. Using an external SD Card is useful when sharing SD Card data (picture, media, files, etc.) between Android Virtual Devices. See http://d.android.com/tools/help/mksdcard.html for more details.' }],
    ['sd-card-no-sdcard', { title: 'No SD Card', content: 'No SDCard available on this device. The amount of removeable space is 0 on this device.' }],
    ['enable-device-frame', { title: 'Enable device frame', content: 'Enable a frame around the Android emulator window that mimics the look of a real Android device. Click on Show Advanced Settings for more options.' }],
    ['enable-keyboard-input', { title: 'Enable keyboard input', content: 'Lets you enter text and interact with AVD using your hardware computer keyboard in addition to the on-screen soft keyboard.' }],
  ]);

  return {
    hintsMap
  }
}