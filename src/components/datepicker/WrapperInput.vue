<template>
  <p class="control has-addons flatpickr" data-wrap="true" data-clickOpens="false" :class="{ [`has-addons-${alignment}`]: alignment }">
    <input class="input" :class="inputClass" type="text" :placeholder="placeholder" :value="value" data-input/>
    <slot></slot>
  </p>
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
    alignment: String,
  },
};
</script>
