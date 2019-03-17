<template>
<div>
    <section class="section" v-if="event">
        <form
            @submit.prevent="updateEvent"
        >
            <div class="field">
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Normal input"
                        v-model="event.name"
                    >
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Normal input"
                        v-model="event.image"
                    >
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <datepicker
                        placeholder="Date"
                        :config="{
                            dateFormat: 'm-d-Y',
                            static: true,
                            enableTime: true,
                            enableSeconds: false,
                            hourIncrement: 1,
                            minuteIncrement: 10,
                            minDate: new Date(),
                        }"
                        v-model="date"
                    ></datepicker>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <textarea
                        class="textarea"
                        placeholder="Event note"
                        v-model="event.note"
                    ></textarea>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Where</label>
                </div>
                <div class="field-body">
                    <div class="field">
                    <p class="control is-expanded has-icons-left">
                        <input
                            class="input"
                            type="text"
                            placeholder="Location"
                            v-model="event.where.name"
                        >
                        <span class="icon is-small is-left">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#000000" d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                            </svg>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input
                            class="input is-success"
                            type="url"
                            placeholder="URL"
                            value=""
                            v-model="event.where.url"
                        >
                        <span class="icon is-small is-left">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#000000" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                            </svg>
                        </span>
                        <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                        </span>
                    </p>
                    </div>
                </div>
            </div>
            <button
                class="button is-primary"
                type="submit"
            >
                Save
            </button>
        </form>
    </section>
    <section v-if="!event && !loading">
        This event was not found :(
        <router-link :to="{ name: 'adminEvents' }">
            Back
        </router-link>
    </section>
</div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Datepicker from 'vue-bulma-datepicker';

@Component({
    components: {
        Datepicker,
    },
})
export default class EventEdit extends Vue {
  private eventSubscription: (() => void) | null = null;
  private event: firebase.firestore.DocumentData | undefined = undefined;
  private loading = true;

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
        this.event = doc.data();
        if (this.event) {
            this.date = this.event.when.toDate();
        }
      } else {
          this.event = undefined;
          // console.log('document does not exist anymore');
      }
  }

  private updateEvent() {
      // update event
  }
}
</script>
