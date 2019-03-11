<template>
<div class="intro">
  <div class="background"></div>
  <overlay />
  <div class="container is-centered is-vcentered wrapper">
    <h1>
      <svg viewBox="0 0 60 18">
        <defs>
          <linearGradient id="ultima" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse" >
            <stop stop-color="#f1d4f5" offset="0%"/>
            <stop stop-color="#a25387" offset="100%"/> 
          </linearGradient>
        </defs>
        <text fill="url(#ultima)" style="font-family: 'Cyberpunk';" x="0" y="15" class="b">ULTIMA</text>
      </svg>
    </h1>
    <social-links />
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Overlay from '@/components/Overlay.vue';
import SocialLinks from '@/components/SocialLinks.vue';

@Component({
  components: {
    Overlay,
    SocialLinks,
  },
})
export default class Intro extends Vue {
}
</script>

<style lang="scss" scoped>

.intro {
  display: flex;
  overflow: hidden;
  height: 100vh; // Seems to force the container to recalc size on resizing
  
  .background {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #151515  url("../assets/Colorful_galaxy.jpg") no-repeat;
    background-size: cover;

  }

  .wrapper {
    justify-content: center;
    align-self: center;
    min-width: 80%;

    h1 {
      svg {
        max-width: 1200px;
      }
    }
  }

  .ultima {
    font-family: 'Cyberpunk';
    background: -webkit-linear-gradient(rgb(241, 212, 245), rgb(162, 83, 135));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 5em; 
    font-size: 15vw;
    padding: 0;
    margin: 0
  }
}

</style>