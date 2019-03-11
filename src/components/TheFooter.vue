<template>
  <footer class="footer">
    Copyright © Ultima {{ year }}
  </footer>
</template>

<script type="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TheFooter extends Vue {
  get year() {
    return new Date().getFullYear();
  }
}
</script>

<style lang="scss" scoped>
  footer {
    background-color: #363636;
    color: whitesmoke;
  }
</style>