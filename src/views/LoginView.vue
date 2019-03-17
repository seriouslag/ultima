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

  get user() {
    return this.$store.getters.user;
  }
}
</script>

<style lang="scss" scoped>

</style>