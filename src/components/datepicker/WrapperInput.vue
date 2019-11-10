<template>
  <p class="control has-addons flatpickr" data-wrap="true" data-clickOpens="false" :class="{ [`has-addons-${alignment}`]: alignment }">
    <input class="input" :class="inputClass" type="text" :placeholder="placeholder" :value="value" data-input/>
    <slot></slot>
  </p>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class WrapperInput extends Vue {

  @Prop({
    type: String,
    default: () => 'Pick date',
  })
  private placeholder!: string;

  @Prop({
    type: [Object, Array],
    default: () => ({}),
  })
  private inputClass!: any;

  @Prop({
    type: String,
  })
  private value!: string;

  @Prop({
    type: String,
  })
  private alignment!: string;

}
</script>
