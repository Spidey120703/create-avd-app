<script setup lang="ts">
import { ref, watch } from 'vue';

const SizeUnitOptions = [
  { label: 'KB', value: 'K' },
  { label: 'MB', value: 'M' },
  { label: 'GB', value: 'G' },
];

const convertToKB = (val: number, unit: string): number => {
    switch (unit) {
        case 'K':
            return val;
        case 'M':
            return val << 10;
        case 'G':
            return val << 20;
        default:
            return val;
    }
};

const convertFromKB = (valInKB: number, unit: string): number => {
    switch (unit) {
        case 'K':
            return valInKB;
        case 'M':
            return valInKB >> 10;
        case 'G':
            return valInKB >> 20;
        default:
            return valInKB;
    }
};

const props = withDefaults(defineProps<{
    id?: string,
    targetUnit?: string,
    numberOnly?: boolean,
    disabled?: boolean,
}>(), {
    targetUnit: 'M',
    numberOnly: true,
    disabled: false,
});

const modelValue = defineModel<string | number>({
    type: [String, Number],
    required: true,
});

const size = ref<number>(0);
const unit = ref<string>('M');

if (typeof modelValue.value === 'number') {
    size.value = modelValue.value;
} else {
    if (/^[0-9]+$/.test(modelValue.value)) {
        size.value = Number(modelValue.value);
    } else if (/^[0-9]+[KMG]$/.test(modelValue.value)) {
        const initSize = Number(modelValue.value.slice(0, -1));
        const initUnit = modelValue.value.slice(-1);
        size.value = convertFromKB(
            convertToKB(initSize, initUnit),
            unit.value
        );
    } else {
        throw new Error(`Invalid modelValue: ${modelValue.value}`);
    }
}

watch(
    unit,
    (newVal, oldVal) => {
        const valInKB = convertToKB(size.value, oldVal!);
        size.value = convertFromKB(valInKB, newVal);
        const targetValue = convertFromKB(valInKB, props.targetUnit);
        if (props.numberOnly) {
            modelValue.value = targetValue;
        } else {
            modelValue.value = `${targetValue}${props.targetUnit}`;
        }
    },
    { immediate: false }
);

watch(
    size,
    (newVal, oldVal) => {
        if (/^[0-9-]+$/.test(newVal as unknown as string) === false) {
            size.value = oldVal;
            return;
        }
        const valInKB = convertToKB(newVal, unit.value);
        const targetValue = convertFromKB(valInKB, props.targetUnit);
        if (props.numberOnly) {
            modelValue.value = targetValue;
        } else {
            modelValue.value = `${targetValue}${props.targetUnit}`;
        }
    },
    { immediate: false }
);

const emit = defineEmits(['focus', 'blur'])

</script>

<template>
  <div class="flex flex-row gap-3">
    <input :id="id" v-model="size" class="input flex-1 w-0" :disabled="disabled" @focus="event => emit('focus', event)" @blur="event => emit('blur', event)" />
    <select class="select w-20" v-model="unit" :disabled="disabled">
        <option v-for="o in SizeUnitOptions" :value="o.value">{{ o.label }}</option>
    </select>
  </div>
</template>