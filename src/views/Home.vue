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
import About from '@/components/home/About.vue';
import MailingList from '@/components/forms/MailingList.vue';

@Component({
  components: {
    Intro,
    About,
    MailingList,
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
