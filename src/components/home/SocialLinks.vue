<template>
<div role="navigation" aria-label="Social links">
  <ul class="socialLinks">
    <li>
      <a href="https://www.facebook.com/ULTIMASynthwave/" aria-label="Link to Ultima's Facebook page">
        <svg viewBox="0 0 24 24">
          <path fill="#a25387" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
        </svg>
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/ultimasynthwave/" aria-label="Link to Ultima's Instagram page">
        <svg viewBox="0 0 24 24">
          <path fill="#a25387" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
        </svg>
      </a>
    </li>
    <li>
      <a href="https://ultimasynthwave.bandcamp.com/" aria-label="Link to Ultima's Bandcamp page">
        <svg viewBox="0 0 24 24">
          <path fill="#a25387" d="M22,6L15.5,18H2L8.5,6H22Z" />
        </svg>
      </a>
    </li>
    <li>
      <a href="https://open.spotify.com/artist/37p4s09KnrIDHmAofWHphw" aria-label="Link to Ultima's Spotify artist page">
        <svg viewBox="0 0 24 24">
          <path fill="#a25387" d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
      </a>
    </li>
    <li>
      <a href="https://www.youtube.com/channel/UChI1UkjH1-I_0jN5zBUhPsA" aria-label="Link to Ultima's YouTube channel">
        <svg viewBox="0 0 24 24">
          <path fill="#a25387" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
        </svg>
      </a>
    </li>
  </ul>
</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SocialLinks extends Vue {}
</script>

<style lang="scss" scoped>
  .socialLinks {
    display: flex;
    justify-content: space-around;
    a {
        min-width: 30px;
        min-height: 30px;
        max-width: 64px;
        max-height: 64px;
        height: 4vw;
        width: 4vw;
        display: block;
      svg {
        width: 100%;
        height: 100%;

        path {
          fill: white;
        }

        &:hover {
          path {
            fill: rgb(162, 83, 135);
          }
        }
      }
    }
  }
</style>