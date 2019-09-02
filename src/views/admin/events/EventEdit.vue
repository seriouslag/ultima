<template>
  <div>
    <loading v-model="loading">
      <h3 class="title is-3">Edit Event</h3>
      <event-form
          v-if="event" 
          :event="event"
          @submit="updateEvent"
          @validationChanged="handleValidationChange"
          :disabled="loading"
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
    </loading>
    <confirm-modal
        v-model="deleteModal"
        v-if="event"
      >
        <span
          slot="header"
        >
            Delete event: {{ event.name || event.id }}
        </span>
        <p>
            Are you sure you want to delete this event?
        </p>
        <button
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
import EventForm, { SubmitEvent } from '@/components/forms/EventForm.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import Loading from '@/components/loading/Loading.vue';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FileData } from '@/models/FileData';

@Component({
    components: {
        EventForm,
        ConfirmModal,
        Loading,
    },
})
export default class EventEdit extends Vue {
  private eventSubscription: (() => void) | null = null;
  private event: firebase.firestore.DocumentData | undefined | null = null;
  private loading = true;
  private deleteModal = false;

  private isInvalid = true;

  private date = new Date();
  private storage = firebase.storage().ref();

  private mounted() {
    this.loading = true;
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

  private async updateEvent(submitEvent: SubmitEvent) {
      this.loading = true;
      console.log('updating', submitEvent);
      const { event, image } = submitEvent;
      // update event
      if (!event || this.isInvalid) {
        console.log('no event supplied');
        this.loading = true;
      }
      let url: string|null = '';
      try {
        if (!image) {
          url = event.image;
        } else {
          url = await this.uploadImageAndReturnUrl(image);
        }
      } catch (e) {
        url = null;
        console.log('failed to get url');
      }
      try {
        const response = await this.$firestore.collection('events').doc(this.$route.params.id)
            .update({
                name: event.name,
                image: url,
                note: event.note,
                when: new Date(event.when),
                where: event.where,
            });
        this.$router.push({ name: 'adminEvents' });
      } catch (e) {
          console.log('failed to update event');
      } finally {
        this.loading = true;
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

  private uploadImageAndReturnUrl(image: FileData): Promise<string> {
      return new Promise((resolve, reject) => {
          const imgRef = this.storage.child(`events/${image.name}`);
          const uploadTask = imgRef.put(image.file, {
              contentType: `image/${image.ext}`,
          });

          uploadTask.on('state_changed', (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                      console.log('Upload is paused');
                      break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                      console.log('Upload is running');
                      break;
              }
          }, (error) => {
              console.log('error', error);
              reject(error);
          }, async () => {
              console.log('success');
              try {
                  const url = await uploadTask.snapshot.ref.getDownloadURL();
                  resolve(url);
              } catch (e) {
                  reject(e);
              }
          });
      });
    }
}
</script>
