<template>
  <div class="about">
    <navbar>
      <a
        slot="logo"
        class="navbar-item"
        href="https://ultima.band"
      >
          Ultima
      </a>
      <a
        slot="start"
        class="navbar-item"
        :to="{ name: 'admin' }"
      >
        Admin
      </a>
      <signout slot="end" v-if="user"/>
    </navbar>
    <div class="section columns">
      <div class="column">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Navbar from '@/components/Navbar.vue';
import Login from '@/components/admin/Login.vue';
import Signout from '@/components/admin/Signout.vue';

import firebase from 'firebase/app';

@Component({
  components: {
    Navbar,
    Login,
    Signout,
  },
})
export default class Admin extends Vue {
  private user: firebase.User | null = null;
  private userDocSubscription: (() => void) | null = null;

  private created() {
    firebase
      .auth()
      .onAuthStateChanged(this.handleAuthStateChanged);
  }

  private beforeDestory() {
    // Stop listening to changes
    if (this.userDocSubscription) {
      this.userDocSubscription();
    }
  }

  private handleAuthStateChanged(user: firebase.User | null) {
    this.user = user;
    this.$store.dispatch('setUser', user);
    this.getCurrentUserDocument();
  }

  private async getCurrentUserDocument() {
    if (!this.user) {
      return null;
    }

    this.userDocSubscription = this.$firestore
      .collection('users')
      .doc(this.user.uid)
      .onSnapshot(this.handleUserDocSnapshotChange);
  }

  private handleUserDocSnapshotChange(doc: firebase.firestore.DocumentSnapshot) {
    if (doc.exists) {
      const userData = doc.data();
      if (userData && userData.role) {
        const role = String(userData.role).toLowerCase();
        this.$store.dispatch('setRole', role);

        const redirect = this.$route.query.redirect;
        if (redirect) {
          this.$router.push({ path: String(redirect) });
        }
        return;
      }
    }
    firebase.auth().signOut();
    this.$store.dispatch('setRole', null);
  }
}
</script>

<style lang="scss" scoped>

</style>
