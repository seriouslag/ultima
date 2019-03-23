<template>
  <div ref="container" id="picture-input" class="picture-input">
    <canvas
          ref="previewCanvas"
          class="picture-preview"
          :id="`id-${id}`"
        ></canvas>
    <!-- <div v-if="!supportsUpload" v-html="strings.upload"></div>
    <div v-else-if="supportsPreview">
      <div
        class="preview-container"
        :style="{maxWidth: previewWidth + 'px', height: previewHeight + 'px', borderRadius: radius + '%'}"
      >
        
        <div
          v-if="!imageSelected && !plain"
          class="picture-inner"
          :style="{top: -previewHeight + 'px', marginBottom: -previewHeight + 'px', fontSize: fontSize, borderRadius: radius + '%', zIndex: zIndex + 2}"
        >
          <span v-if="supportsDragAndDrop" class="picture-inner-text" v-html="strings.drag"></span>
          <span v-else class="picture-inner-text" v-html="strings.tap"></span>
        </div>
      </div>
      <button
        @click.prevent="selectImage"
        :class="buttonClass"
      >{{ strings.change }}</button>
      <button
        v-if="imageSelected && removable"
        @click.prevent="removeImage"
        :class="removeButtonClass"
      >{{ strings.remove }}</button>
      <button
        v-if="imageSelected && toggleAspectRatio && width !== height"
        @click.prevent="rotateImage"
        :class="aspectButtonClass"
      >{{ strings.aspect }}</button>
    </div>
    <div v-else>
      <button
        v-if="!imageSelected"
        @click.prevent="selectImage"
        :class="buttonClass"
      >{{ strings.select }}</button>
      <div v-else>
        <div v-html="strings.selected"></div>
        <button
          v-if="!hideChangeButton"
          @click.prevent="selectImage"
          :class="buttonClass"
        >{{ strings.change }}</button>
        <button
          v-if="removable"
          @click.prevent="removeImage"
          :class="removeButtonClass"
        >{{ strings.remove }}</button>
      </div>
    </div> -->
    <input
      ref="fileInput"
      type="file"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

import Cropper from 'cropperjs';

@Component
export default class PictureInput extends Vue {
  public $refs!: {
    previewCanvas: HTMLCanvasElement,
  };
  private id = new Date().toString();
  private image = this.$refs.previewCanvas;

  private cropper!: Cropper;

  private mounted() {
    this.image = this.$refs.previewCanvas;
    this.cropper = new Cropper(this.image, {
      aspectRatio: 16 / 9,
      crop(event: any) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      },
    });
  }
}
</script>
