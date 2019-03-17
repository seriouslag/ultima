<template>
    <a
        class="link navbar-item"
        @click="signout()"
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
    this.$router.push({ name: 'login' });
  }
}
</script>
