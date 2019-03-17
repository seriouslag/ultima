<template>
    <section class="section" v-if="localEvent">
        <div class="buttons">
            <router-link
                :to="{ name: 'adminEvents' }"
                class="button is-info"
            >
                Back to events list
            </router-link>
        </div>
        <form
            @submit.prevent="emitSubmit"
        >
            <div class="field">
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Name of event"
                        v-model="localEvent.name"
                        v-validate="'required|max:256'"
                        name="name"
                    >
                </div>
                <p class="help is-danger">
                    {{ errors.first('name') }}
                </p>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Url of image for event"
                        v-model="localEvent.image"
                        name="imageUrl"
                        v-validate="'url|required|max:512'"
                    >
                </div>
                <p class="help is-danger">
                    {{ errors.first('imageUrl') }}
                </p>
            </div>
            <div class="field">
                <div class="control">
                    <textarea
                        class="textarea"
                        placeholder="Event note"
                        v-model="localEvent.note"
                        name="note"
                        v-validate="'max:512'"
                    ></textarea>
                </div>
                <p class="help is-danger">
                    {{ errors.first('note') }}
                </p>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">When</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <datepicker
                                placeholder="Date/Time of event"
                                :config="{
                                    dateFormat: 'm/d/Y',
                                    static: true,
                                    minDate: 'today',
                                    defaultDate: date,
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                }"
                                v-model="date"
                            ></datepicker>
                            <datepicker
                                placeholder="Date/Time of event"
                                :config="{
                                    altInput: true,
                                    altFormat: 'h:i K',
                                    dateFormat: 'H:i',
                                    static: true,
                                    noCalendar: true,
                                    enableTime: true,
                                    enableSeconds: false,
                                    hourIncrement: 1,
                                    minuteIncrement: 10,
                                    defaultHour: 0,
                                    defaultMinute: 0,
                                    time_24hr: false,
                                }"
                                v-model="time"
                            ></datepicker>
                        </div>
                    </div>
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
                                v-model="localEvent.where.name"
                                v-validate="'required|max:144'"
                                name="locationName"
                            >
                            <span class="icon is-small is-left">
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="#000000" d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                </svg>
                            </span>
                        </p>
                        <p class="help is-danger">
                            {{ errors.first('locationName') }}
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded has-icons-left has-icons-right">
                            <input
                                class="input is-success"
                                type="url"
                                placeholder="URL"
                                value=""
                                v-model="localEvent.where.url"
                                v-validate="'url|max:512'"
                                name="locationUrl"
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
                        <p class="help is-danger">
                            {{ errors.first('locationUrl') }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button
                    class="button is-primary"
                    type="submit"
                    :disabled="isInvalid"
                >
                    Save
                </button>
                <slot name="buttons" />
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import Datepicker from 'vue-bulma-datepicker';

import { Event } from '../../models/Event';

@Component({
    components: {
        Datepicker,
    },
})
export default class EventForm extends Vue {
  @Prop({
      required: false,
  })
  private event!: any;

  private localEvent = this.event || {
      name: '',
      image: '',
      when: new Date(),
      where: {
          name: '',
          url: '',
      },
  } as Event;

  private localDate = new Date(this.localEvent.when.toDate ?
    this.localEvent.when.toDate() : this.getRoundedDate(new Date()),
  );
  private date = `${this.localDate.getMonth() + 1}/${this.localDate.getDate()}/${this.localDate.getFullYear()}`;
  private time = `${this.localDate.getHours()}:${this.localDate.getMinutes()}`;

  private getRoundedDate(date: Date) {
    const coeff = 1000 * 60 * 10;
    return new Date(Math.ceil(date.getTime() / coeff) * coeff);
  }

  @Emit('submit')
  private emitSubmit() {
      this.$validator.validate();
      const obj = { ...this.localEvent, when: new Date(`${this.date} ${this.time}`) };
      return obj;
  }

  @Emit('isInvalid')
  private emitIsInvalid(value: boolean) {
      return value;
  }

  get isInvalid() {
      const isInvald = !!this.errors.items.length;
      this.emitIsInvalid(isInvald);
      return isInvald;
  }

}
</script>
