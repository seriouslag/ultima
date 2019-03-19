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

import SpotifyEmbed from '@/components/spotify/SpotifyEmbed.vue';
import SpotifyPlayerEmbed from '@/components/spotify/SpotifyPlayerEmbed.vue';
import InstagramFeed from '@/components/InstagramFeed.vue';
import EventList from '@/components/events/EventList.vue';

@Component({
  components: {
    SpotifyEmbed,
    SpotifyPlayerEmbed,
    InstagramFeed,
    EventList,
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