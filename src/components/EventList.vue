<template>
<div class="eventList">
  <h3>Upcoming events</h3>
  <article class="media" v-for="(event, i) in events" :key="i">
    <figure class="media-left">
      <p class="image is-128px">
        <img :src="event.image">
      </p>
      <div class="event-link" v-if="event.where.url">
        <a class="link is-info" :href="event.where.url">Link</a>
      </div>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ event.name }}</strong> <small> @ {{event.when.toMillis() | toDate}}</small>
          <br>
          {{event.note}}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          {{ event.where.name }}
        </div>
      </nav>
    </div>
  </article>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EventList extends Vue {
  private events: firebase.firestore.DocumentData[] = [];

  private mounted() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    this.$firestore.collection('events')
        .where('when', '>', today)
        .orderBy('when', 'desc')
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

  h3 {
    padding-bottom: 1em;
  }
}

.is-128px {
  width: 128px;
  max-height: 300px;
}

.event-link {
  display: flex;

  a {
    padding: 5px;
    margin: auto;
  }
}
</style>