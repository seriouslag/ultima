<template>
<div class="eventList">
  <h3>Upcoming events</h3>
  <div>
    <event v-for="(event, i) in events" :key="i" :event="event" />
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Event from '@/components/Event.vue';

@Component({
  components: {
    Event,
  },
})
export default class EventList extends Vue {
  private events: firebase.firestore.DocumentData[] = [];

  private mounted() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    this.$firestore.collection('events')
        .where('when', '>', today)
        .orderBy('when', 'asc')
        .limit(5)
        .onSnapshot((querySnapshot) => this.handleSnapshot(querySnapshot));
  }

  private handleSnapshot(docs: firebase.firestore.QuerySnapshot) {
    this.events = docs.docs.map((doc) => doc.data());
  }
}
</script>

<style lang="scss" scoped>
.eventList {
  max-width: 500px;
  div {
    article {
      padding: 1em;

      &:nth-child(even) {
        background: whitesmoke
      }
    }

    .media {
      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center
      }
      .media-content {
        overflow: visible;

        div {
          @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      }
    }

    h3 {
      padding-bottom: 1em;
    }
  }
}

.is-128px {
  width: 128px;
  max-height: 300px;
}

.event-link {
  display: flex;
  width:100%;

  a {
    padding: 5px;
    margin: auto;
  }
}
</style>