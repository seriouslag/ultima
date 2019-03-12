<template>
<section class="about section">
  <div class="columns">
    <div class="column">
      <spotify-embed />
      <spotify-player-embed />
      <div class="section">
        <event-list />
      </div>
    </div>
    <div class="column">
      <h2>Latest updates</h2>
      <instagram-feed />
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import SpotifyEmbed from '@/components/SpotifyEmbed.vue';
import SpotifyPlayerEmbed from '@/components/SpotifyPlayerEmbed.vue';
import InstagramFeed from '@/components/InstagramFeed.vue';
import EventList from '@/components/EventList.vue';

@Component({
  components: {
    SpotifyEmbed,
    SpotifyPlayerEmbed,
    InstagramFeed,
    EventList,
  },
})
export default class About extends Vue {
}
</script>

<style lang="scss" scoped>

.about {
  background: white;

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