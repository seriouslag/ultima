<template>
  <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
  >
    <div class="navbar-brand">
      <slot name="logo" />
      <a @click="isOpen = !isOpen"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" :style="{ display: isOpen ? 'none' : 'block' }"></span>
        <span aria-hidden="true" :style="{ display: isOpen ? 'none' : 'block' }"></span>
        <span aria-hidden="true" :style="{ display: isOpen ? 'none' : 'block' }"></span>
        <div
            aria-hidden="true"
            :style="{ display: isOpen ? 'flex' : 'none' }"
        >
          <div>X</div>
        </div>
      </a>
    </div>
    <div
        class="navbar-menu"
        :class="{ menu: isOpen }"
    >
      <div class="navbar-start">
        <slot name="start" />
      </div>
      <div class="navbar-end">
        <slot name="end" />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
  private isOpen = false;
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #a25387;
  color: black;

  &:focus,&:hover,&:active {
    background-color: #a25387;
  }

  .navbar-item {
      padding: 1.5em;
  }

  a,button {
    color: white;

    &.navbar-item {
        &:hover, &:active, &:focus {
            background-color: rgba(36,36,36,0.5);
        }
    }
  }

  a {
      text-align: start;
  }

  .navbar-burger {

    height: initial;
    
    > div {
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      font-size: 1.5em;
      user-select: none;
    }

    span {
      user-select: none;
    }
  }
}

@media screen and (max-width: 1088px) {
  .menu {
    display: block;
    a, button {
        color: black;
    }
  }
}
</style>
