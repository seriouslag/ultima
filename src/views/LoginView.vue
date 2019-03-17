<template>
  <div>
    <login @login="handleLogin" v-if="!user" />
    <signout v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Login from '@/components/admin/Login.vue';
import Signout from '@/components/admin/Signout.vue';

import firebase from 'firebase/app';

@Component({
  components: {
    Login,
    Signout,
  },
})
export default class LoginView extends Vue {

  private handleLogin() {
    if (this.$route.query && this.$route.query.redirect) {
      const redirect = this.$route.query.redirect;
      if (redirect) {
        this.$router.push({ path: String(redirect) });
      }
    }
  }

  get user() {
    return this.$store.getters.user;
  }
}
</script>

<style lang="scss" scoped>

</style>