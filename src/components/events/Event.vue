<template>
  <article class="media" v-if="event">
    <figure class="media-left">
      <p class="image is-128px">
        <img :src="event.image" :alt="event.name" loading="lazy" width="128" height="128">
      </p>
      <div class="event-link" v-if="event.where.url">
        <a
          class="link is-info"
          :href="event.where.url"
          :aria-label="`Link to ${event.where.url}`"
        >
          Link
        </a>
      </div>
    </figure>
    <div class="media-content">
      <div class="content">
        <div>
          <strong>{{ event.name }}</strong>
          <br>
          <small>{{ event.when.toMillis() | toDate }}</small>
          <br>
          <p>
            {{event.note}}
          </p>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">{{ event.where.name }}</div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Event as EventModel } from '@/models/Event';

@Component
export default class Event extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  private event!: EventModel;
}
</script>

<style lang="scss" scoped>
small {
  white-space: nowrap;
}

.media {
  flex: 1 0 0%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  .media-content {
    overflow: visible;
    max-width: 100%;

    div {
      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
  }
}

.is-128px {
  width: 128px;
  max-height: 300px;
}

.event-link {
  display: flex;
  width: 100%;

  a {
    padding: 5px;
    margin: auto;
  }
}
</style>
