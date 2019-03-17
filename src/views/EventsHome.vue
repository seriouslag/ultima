<template>
    <div class="events">
      <h2>Upcomming Events</h2>
      <div class="buttons">
        <button class="button is-primary">Add new event</button>
      </div>
      <div class="box" v-for="event of events" :key="event.id">
        <event :event="event" @click.native="handleEvent($event, event.id)" />
        <div class="field is-grouped">
          <p class="control">
            <router-link
                class="button is-info"
                :to="{
                    name: 'editEvent',
                    params: { id: event.id },
                }"
            >
              Edit
            </router-link>
          </p>
          <p class="control">
            <a class="delete is-large has-background-danger"></a>
          </p>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Event from '../components/Event.vue';

import firebase from 'firebase/app';

@Component({
  components: {
    Event,
  },
})
export default class EventsHome extends Vue {
  private eventSubscription: (() => void) | null = null;
  private events: firebase.firestore.DocumentData[] = [];

  private mounted() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    this.eventSubscription = this.$firestore.collection('events')
        .where('when', '>', today)
        .orderBy('when', 'asc')
        .onSnapshot((querySnapshot) => this.handleSnapshot(querySnapshot));
  }

  private beforeDestory() {
    // Stop listening to changes
    if (this.eventSubscription) {
      this.eventSubscription();
    }
  }

  private handleEvent($event: MouseEvent, event: firebase.firestore.DocumentData) {
    // console.log(event);
  }

  private handleSnapshot(docs: firebase.firestore.QuerySnapshot) {
    this.events = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

}
</script>

<style lang="scss" scoped>
.events {
  .box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .is-grouped {
      display: flex;
      justify-content: space-around;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center
      }
    }
  }
}
</style>
