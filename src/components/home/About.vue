<template>
  <main class="about section columns">
    <div class="column">
      <div class="area">
        <section aria-label="Ultima spotify artist highlight">
          <spotify-embed />
        </section>
        <section aria-label="Ultima spotify album player">
          <spotify-player-embed />
        </section>
      </div>
      <aside aria-label="Upcoming scheduled events" class="area">
        <event-list v-show="showEvents" @show="showEvents = true" />
      </aside>
    </div>
    <aside class="column area" v-show="showRightColumn" aria-label="Ultima Instagram's feed">
      <instagram-feed v-show="showRightColumn" @show="handleShowRightColumn" />
    </aside>
  </main>
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