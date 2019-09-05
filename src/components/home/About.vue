<template>
<section class="about section columns">
    <div class="column">
      <spotify-embed />
      <spotify-player-embed />
      <div class="section">
        <event-list v-show="showEvents" @show="showEvents = true" />
      </div>
    </div>
    <div class="column" v-show="showRightColumn">
      <instagram-feed v-show="showRightColumn" @show="handleShowRightColumn" />
    </div>
</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    SpotifyEmbed: () => import(/* webpackPrefetch: true */ '@/components/spotify/SpotifyEmbed.vue'),
    SpotifyPlayerEmbed: () => import(/* webpackPrefetch: true */ '@/components/spotify/SpotifyPlayerEmbed.vue'),
    InstagramFeed: () => import(/* webpackPrefetch: true */ '@/components/InstagramFeed.vue'),
    EventList: () => import(/* webpackPrefetch: true */ '@/components/events/EventList.vue'),
  },
})
export default class About extends Vue {
  private showRightColumn = false;
  private showEvents = false;

  private handleShowRightColumn(value: boolean) {
    if (!value) { return; }

    this.showRightColumn = true;
  }
}
</script>

<style lang="scss" scoped>

.about {
  background: white;
  margin-bottom: 0 !important;
  margin-top: 0 !important;

  .columns {
    .column {
      .section {
        align-items: center;
        display: flex;
        flex-direction: column;
      }
    }
  }
}

</style>