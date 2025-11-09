<script setup lang="ts">
import { useAvdConfigStore } from '../stores/useAvdConfig';

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

</script>

<template>
  <div class="form-item-group">
    <div class="form-item-group__title">Network</div>
    <div class="form-item-group__items">
      <div class="form-item">
        <label for="network-speed" class="w-16 block">Speed:</label>
        <select id="network-speed" v-model="store.config.runtime.network.speed" class="select w-24" @click.stop="store.setHintsById('network-speed')" @focus="store.setHintsById('network-speed')" @blur="store.resetHints">
          <option v-for="o in SpeedOptions" :value="o.value">{{ o.label }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="network-latency" class="w-16 block">Latency:</label>
        <select id="network-latency" v-model="store.config.runtime.network.latency" class="select w-24" @click.stop="store.setHintsById('network-latency')" @focus="store.setHintsById('network-latency')" @blur="store.resetHints">
          <option v-for="o in LatencyOptions" :value="o.value">{{ o.label }}</option>
        </select>
      </div>
    </div>
  </div>
</template>