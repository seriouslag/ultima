<template>
  <input class="input" :class="inputClass" type="text" :placeholder="placeholder" :value="value"/>
</template>

<script>
import BasicInput from './BasicInput';

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Pick date',
    },
    inputClass: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    value: String,
  },
};
</script>
