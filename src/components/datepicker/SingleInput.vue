<template>
  <input class="input" :class="inputClass" type="text" :placeholder="placeholder" :value="value"/>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class SingleInput extends Vue {
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

}
</script>
