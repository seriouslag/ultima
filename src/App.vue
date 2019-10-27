<template>
  <div id="app">
    <div>
      <div>
        <router-view/>
      </div>
    </div>
     <the-footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import TheFooter from '@/components/TheFooter.vue';

@Component({
  components: {
    TheFooter,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  min-width: 100%;
  flex-direction: column;
  display: flex;

  div {
    
    flex: 1 0 0%;
  }
  
  > div {
    // display: flex;
    flex-direction: column;
    flex: 1 0 0%;
    flex-basis: auto;
    display: -webkit-flex; 

    > div {
      // display: flex;
      flex-direction: row;
      flex: 1 0 0%;
    }
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
