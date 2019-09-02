<template>
  <div class="the-loading">
    <slot />
    <div v-if="value" class="the-loading__overlay columns is-vcentered">
      <div class="column">
        <progress class="progress is-large is-info" max="100">100%</progress>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({
    required: false,
    default: false,
  })
  private value!: boolean;
}
</script>

<style lang="scss" scoped>
.the-loading {
  position: relative;

  &__overlay {
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(100,100,100,.4);
  }

}
</style>