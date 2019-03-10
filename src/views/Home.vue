<template>
  <div class="home">
    <Intro />
    <About />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Intro from '@/components/Intro.vue'; // @ is an alias to /src
import About from '@/components/About.vue';

@Component({
  components: {
    Intro,
    About,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
