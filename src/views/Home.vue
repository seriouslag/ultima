<template>
  <div class="home">
    <intro />
    <about />
    <mailing-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Intro from '@/components/Intro.vue'; // @ is an alias to /src
import About from '@/components/About.vue';
import MailingList from '@/components/MailingList.vue';

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
