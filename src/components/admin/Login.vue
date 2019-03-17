<template>
  <form>
    <p class="help is-danger">
      {{ error }}
    </p>
    <div
      class="field"
    >
      <div
        class="control has-icons-left"
      >
        <input
          v-validate="'required|email'"
          class="input is-primary is-medium"
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          aria-autocomplete="email username"
        >
        <span
          class="icon is-small is-left"
        >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="#000000" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
          </svg>
        </span>
      </div>
      <p class="help is-danger">
        {{ errors.first('email') }}
      </p>
    </div>
    <div
      class="field"
    >
      <div
        class="control has-icons-left"
      >
        <input
          v-validate="'required'"
          class="input is-primary is-medium"
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          aria-autocomplete="current-password"
        >
        <span
          class="icon is-small is-left"
        >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
          </svg>
        </span>
      </div>
      <p class="help is-danger">
        {{ errors.first('password') }}
      </p>
    </div>
    <div
      class="field"
    >
      <div
        class="control"
      >
        <button
          class="button is-link"
          type="submit"
          @click.prevent="login(email, password)"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import firebase from 'firebase/app';

@Component
export default class Login extends Vue {
  private email: string = '';
  private password: string = '';

  private error: string = '';

  private async login(email: string, password: string): Promise<void> {
    this.error = '';
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      this.error = JSON.parse(JSON.stringify(e)).message;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
