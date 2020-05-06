<template>
  <component
    :value="date"
    :placeholder="placeholder" 
    :inputClass="inputClass"
    :alignment="alignment" 
    :is="wrap ? 'WrapperInput' : 'SingleInput'"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import SingleInput from './SingleInput.vue';
import WrapperInput from './WrapperInput.vue';
import Flatpickr from 'flatpickr';

import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { Instance } from 'flatpickr/dist/types/instance';
import { BaseOptions, DateOption } from 'flatpickr/dist/types/options';

@Component({
  components: {
    SingleInput,
    WrapperInput,
  },
})
export default class Datepicker extends Vue {
  @Prop({
    type: Object,
    default: () => ({}),
  })
  private config!: Partial<BaseOptions>;

  @Prop({
    type: String,
  })
  public alignment!: string;

  @Prop({
    type: String,
    default: 'Pick date',
  })
  public placeholder!: string;

  @Prop({
    type: [Object, Array],
    default: () => ({}),
  })
  public inputClass!: Object|Array<any>;

  @Prop()
  private value!: string;

  private datepicker: Instance|null = null;
  private selectedDates: string|null = null;

  public mounted() {
    if (!this.datepicker) {
      this.config.onValueUpdate = this.dateUpdated;
      this.datepicker = Flatpickr(this.$el, this.config); 
      this.setDate(this.value);
    }
  }

  @Watch('config')
  public configWatcher(newConfig: Partial<BaseOptions>) {
    this.redraw(newConfig);
  }

  @Watch('value')
  public valueWatcher(newValue: string) {
    this.setDate(newValue);
  }

  private beforeDestroy() {
    if (this.datepicker && !this.static) {
      this.datepicker.destroy();
      this.datepicker = null;
    }
  }

  private redraw(newConfig: Partial<BaseOptions>): void {
    if (!this.datepicker) return;
    this.datepicker.config = Object.assign(this.datepicker.config, newConfig);
    this.datepicker.redraw();
    this.datepicker.jumpToDate();
  }

  private setDate(newDate: string|number|Date|DateOption[]) {
    if (newDate && this.datepicker) {
      this.datepicker.setDate(newDate);
    }
  }

  private dateUpdated(selectedDates: Date[], currentDateString: string) {
    this.date = currentDateString;
  }

  public get wrap(): boolean {
    return !!this.config.wrap;
  }

  private get static(): boolean {
    return !!this.config.static;
  }

  private get name(): 'wrapperInput'|'singleInput' {
    return this.wrap ? 'wrapperInput' : 'singleInput';
  }

  public get date(): string {
    return this.selectedDates || this.value;
  }

  public set date(newValue: string) {
    if (this.selectedDates !== newValue) {
      this.selectedDates = newValue;
      this.inputEmitter(newValue);
    }
  }

  @Emit('input')
  private inputEmitter(value: string) {
    return value;
  }

}
</script>

<style lang="stylus">
$calendar_background = #ffffff
$calendar_border_color = #d3d6db

$months_color = #111
$months_background = transparent

$weekdays_background = transparent

$day_text_color = #222324
$day_hover_background_color = #d3d6db

$today_color = #ed6c63
$selected_day_background = #1fc8db

@import '~flatpickr/src/style/flatpickr'

.flatpickr-calendar.hasWeeks
  width: auto !important
</style>
