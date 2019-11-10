<template>
  <component :value="date" :placeholder="placeholder" 
    :inputClass="inputClass" :alignment="alignment" 
    :is="wrap ? 'WrapperInput' : 'SingleInput'">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import SingleInput from './SingleInput.vue';
import WrapperInput from './WrapperInput.vue';
import Flatpickr from 'flatpickr';

import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

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
  private config!: any;

  @Prop({
    type: String,
  })
  private alignment!: string;

  // @Prop({
  //   type: Object,
  // })
  // private date!: any;

  @Prop({
    type: String,
    default: 'Pick date',
  })
  private placeholder!: string;

  @Prop({
    type: [Object, Array],
    default: () => ({}),
  })
  private inputClass!: any;

  // @Prop({
  //   type: String,
  // })
  // private wrap!: string;

  private datepicker: any = null;
  private selectedDates: any = null;

  @Prop()
  private value!: any;

  private mounted() {
    if (!this.datepicker) {
      this.config.onValueUpdate = this.dateUpdated;
      this.datepicker = Flatpickr(this.$el, this.config);
      console.log(this.config);
      this.setDate(this.value, null);
    }
  }

  @Watch('config')
  private configWatcher(newConfig: any) {
    this.redraw(newConfig);
  }

  @Watch('value')
  private valueWatcher(newValue: any, oldValue: any) {
    this.setDate(newValue, oldValue);
  }

  private beforeDestroy() {
    if (this.datepicker && !this.static) {
      this.datepicker.destroy();
      this.datepicker = null;
    }
  }

  private redraw(newConfig: any) {
    this.datepicker.config = Object.assign(this.datepicker.config, newConfig);
    this.datepicker.redraw();
    this.datepicker.jumpToDate();
  }

  private setDate(newDate: any, oldDate: any) {
    if (newDate) {
      this.datepicker.setDate(newDate);
    }
  }

  private dateUpdated(selectedDates: any, dateStr: any) {
    this.date = dateStr;
  }

  get wrap() {
    return !!this.config.wrap;
  }

  get static() {
    return !!this.config.static;
  }

  get name() {
    return this.wrap ? 'wrapperInput' : 'singleInput';
  }

  get date() {
    return this.selectedDates || this.value;
  }

  set date(newValue: any) {
    if (this.selectedDates !== newValue) {
      this.selectedDates = newValue;
      this.inputEmitter(newValue);
    }
  }

  @Emit('input')
  private inputEmitter(value: any) {
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
