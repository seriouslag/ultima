<template>
<div class="spotifyPlayerEmbed">
    <iframe
      src="https://open.spotify.com/embed/album/5qm1cdeZd9BmUEFWg5N57b"
      width="300"
      height="300"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
      title="spotify player"
    ></iframe>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpotifyPlayerEmbed extends Vue {}
</script>

<style lang="scss" scoped>
  .spotifyPlayerEmbed {
    min-height: 250px;
    display: flex;
    justify-content: center;

    iframe {
      min-height: 250px;
    }
  }
</style>