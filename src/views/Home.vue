<template>
  <div class="home">
    <intro />
    <about />
    <mailing-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Intro from '@/components/home/Intro.vue';


@Component({
  components: {
    Intro,
    About: () => import(/* webpackPrefetch: true */ '@/components/home/About.vue'),
    MailingList: () => import(/* webpackPrefetch: true */ '@/components/forms/MailingList.vue'),
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
