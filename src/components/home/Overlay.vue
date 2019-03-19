<template>
<div class="overlay">
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Overlay extends Vue {}
</script>

<style lang="scss" scoped>
  .overlay {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(rgba(17,17,17, 0.5) 10%, rgba(17,17,17, 0.7) 30%, rgba(17,17,17, 0.85) 70%);
  }
</style>
