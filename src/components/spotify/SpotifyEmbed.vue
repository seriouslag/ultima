<template>
<div class="spotifyEmbed">
    <iframe
      src="https://open.spotify.com/follow/1/?uri=spotify:artist:37p4s09KnrIDHmAofWHphw&size=detail&theme=light&show-count=0"
      width="200"
      height="75"
      scrolling="no"
      frameborder="0"
      style="border:none; overflow:hidden;"
      allowtransparency="true"
      title="spotify widget"
    ></iframe>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpotifyEmbed extends Vue {}
</script>

<style lang="scss" scoped>
  .spotifyEmbed {
    max-height: 100px;
    display: flex;
    justify-content: center
  }
</style>