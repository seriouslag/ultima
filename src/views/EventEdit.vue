<template>
<div>
    <h3 class="title is-3">Edit Event</h3>
    <event-form
        v-if="event" 
        :event="event"
        @submit="updateEvent"
        @validationChanged="handleValidationChange"
    >
      <button
        slot="buttons"
        class="button is-danger"
        type="button"
        @click="confirmDelete"
      >
        Delete
      </button>
    </event-form>
    <section v-if="!event && !loading">
        This event was not found :(
        <router-link :to="{ name: 'adminEvents' }">
            Back
        </router-link>
    </section>
    <confirm-modal
      v-model="deleteModal"
    >
          <span
            slot="header"
            v-if="event"
          >
              Delete event: {{ event.name || event.id }}
          </span>
          <p>
              Are you sure you want to delete this event?
          </p>
          <button
            v-if="event"
            class="button is-danger"
            @click="deleteEvent(event.id)"
            slot="confirm"
          >
            Delete
          </button>
      </confirm-modal>
</div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventForm from '../components/forms/EventForm.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';

@Component({
    components: {
        EventForm,
        ConfirmModal,
    },
})
export default class EventEdit extends Vue {
  private eventSubscription: (() => void) | null = null;
  private event: firebase.firestore.DocumentData | undefined | null = null;
  private loading = true;
  private deleteModal = false;

  private isInvalid = true;

  private date = new Date();

  private mounted() {
    this.eventSubscription = this.$firestore.collection('events').doc(this.$route.params.id)
        .onSnapshot((querySnapshot) => this.handleSnapshot(querySnapshot));
  }

  private beforeDestory() {
    // Stop listening to changes
    if (this.eventSubscription) {
      this.eventSubscription();
    }
  }

  private handleSnapshot(doc: firebase.firestore.DocumentSnapshot) {
      this.loading = false;
      if (doc.exists) {
        this.event = { ...doc.data(), id: doc.id };
        if (this.event) {
            this.date = this.event.when.toDate();
        }
      } else {
          this.event = undefined;
          // console.log('document does not exist anymore');
      }
  }

  private async updateEvent(event: any) {
      console.log('updating', event);
      // update event
      if (event && !this.isInvalid) {
        try {
              const response = await this.$firestore.collection('events').doc(this.$route.params.id)
                  .update({
                      name: event.name,
                      image: event.image,
                      note: event.note,
                      when: new Date(event.when),
                      where: event.where,
                  });
              this.$router.push({ name: 'adminEvents' });
          } catch (e) {
              console.log('failed to update event');
          }
      } else {
        console.log('no event supplied');
      }
    }

  private confirmDelete() {
      this.deleteModal = true;
  }

  private deleteEvent(id: string) {
    if (this.event) {
      try {
        const response = this.$firestore.collection('events').doc(id).delete();
        this.$router.push({ name: 'adminEvents' });
      } catch (e) {
          console.log('failed to delete document', id, e);
      }

      this.deleteModal = false;
    }
  }

  private handleValidationChange(value: boolean) {
    this.isInvalid = value;
  }
}
</script>
