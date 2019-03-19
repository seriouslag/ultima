<template>
  <div class="about">
    <navbar>
      <router-link
        slot="logo"
        class="navbar-item"
        :to="{ name: 'home' }"
      >
          Ultima
      </router-link>
      <router-link
        slot="start"
        class="navbar-item"
        :to="{ name: 'admin' }"
        v-if="isAdmin"
      >
        Admin
      </router-link>
      <router-link
        slot="start"
        class="navbar-item"
        :to="{ name: 'adminEvents' }"
        v-if="isAdmin"
      >
        Event
      </router-link>
      <router-link
        slot="start"
        class="navbar-item"
        :to="{ name: 'login' }"
        v-if="!user"
      >
        Login
      </router-link>
      <signout slot="end" v-if="user"/>
    </navbar>
    <div class="section">
        <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/app';
import 'firebase/auth';
import { Component, Vue, Watch } from 'vue-property-decorator';

import Navbar from '@/components/Navbar.vue';
import Login from '@/components/admin/Login.vue';
import Signout from '@/components/admin/Signout.vue';

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
      this.$store.dispatch('setRole', null);
      if (this.$route.name !== 'login') {
        this.$router.push({ name: 'login' });
      }
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
    this.$store.dispatch('setRole', null);
  }

  get role() {
    return this.$store.getters.role;
  }

  get isAdmin() {
    if (this.role) {
      return this.role.toLowerCase() === 'admin';
    }
    return false;
  }

  @Watch('isAdmin')
  private roleWatcher(isAdmin: boolean) {
    if (!isAdmin && this.user) {
      this.$router.replace({ name: 'unauthorized' });
      return;
    }

    if (this.$route.name === 'unauthorized' && this.user) {
      this.$router.push({ name: 'admin' });
      return;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
