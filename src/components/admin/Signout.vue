<template>
    <a
        class="link navbar-item"
        @click="signout()"
        tabindex="0"
    >
        Signout
    </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import firebase from 'firebase/app';

@Component
export default class Signout extends Vue {
  private signout(): void {
    firebase.auth().signOut();
  }
}
</script>
