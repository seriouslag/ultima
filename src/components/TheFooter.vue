<template>
  <footer class="the-footer">
    Copyright © Ultima {{ year }}
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheFooter extends Vue {
  get year() {
    return new Date().getFullYear();
  }
}
</script>

<style lang="scss" scoped>
  .the-footer {
    padding: 1em;
    background-color: #363636;
    color: whitesmoke;
  }
</style>