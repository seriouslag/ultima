<template>
    <div class="events">
      <h2 class="title">Upcoming Events</h2>
      <div class="buttons">
        <router-link
          :to="{ name: 'newEvent' }"
          class="button is-primary"
        >
          Add new event
        </router-link>
      </div>
      <div class="box" v-for="(event, index) of events" :key="event.id">
        <event :event="event" />
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
            <a
                @click="confirmDelete(index)"
                class="delete is-large has-background-danger"
            ></a>
          </p>
        </div>
      </div>
      <confirm-modal v-model="deleteModal">
          <span
            slot="header"
            v-if="selectedEventIndex >= 0"
          >
              Delete event: {{ events[selectedEventIndex].name }}
          </span>
          <p>
              Are you sure you want to delete this event?
          </p>
          <button
            class="button is-danger"
            @click="deleteEvent(selectedEventIndex)"
            slot="confirm"
          >
            Delete
          </button>
      </confirm-modal>
    </div>
</template>

<script lang="ts">
import firebase from 'firebase/app';
import { Component, Vue } from 'vue-property-decorator';
import Event from '../components/Event.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';

@Component({
  components: {
    Event,
    ConfirmModal,
  },
})
export default class EventsHome extends Vue {
  private eventSubscription: (() => void) | null = null;
  private events: firebase.firestore.DocumentData[] = [];
  private selectedEventIndex: number = -1;
  private deleteModal = false;

  private mounted() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    this.eventSubscription = this.$firestore.collection('events')
        .where('when', '>', today)
        .orderBy('when', 'asc')
        .limit(50)
        .onSnapshot((querySnapshot) => this.handleSnapshot(querySnapshot));
  }

  private beforeDestory() {
    // Stop listening to changes
    if (this.eventSubscription) {
      this.eventSubscription();
    }
  }

  private confirmDelete(index: number) {
      this.selectedEventIndex = index;
      this.deleteModal = true;

  }

  private handleSnapshot(docs: firebase.firestore.QuerySnapshot) {
    this.events = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  private deleteEvent(index: number) {
      try {
        const response = this.$firestore.collection('events').doc(this.events[index].id).delete();
      } catch (e) {
          console.log('failed to delete document', this.events[index].id, e);
      }

      this.deleteModal = false;
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
