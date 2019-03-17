<template>
    <div>
    
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import firebase from 'firebase/app';

@Component
export default class Admin extends Vue {
  private user: firebase.User | null = null;
  private eventSubscription: (() => void) | null = null;

  private beforeDestory() {
    // Stop listening to changes
    if (this.eventSubscription) {
      this.eventSubscription();
    }
  }
}
</script>
