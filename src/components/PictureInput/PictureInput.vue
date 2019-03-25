<template>
  <div ref="container" id="picture-input" class="picture-input">
    <div>
      <canvas
          ref="previewCanvas"
          class="picture-preview"
          :id="`id-${id}`"
        ></canvas>
        <!-- <img src="https://target.scene7.com/is/image/Target/GUEST_f5d0cfc3-9d02-4ee0-a6c6-ed5dc09971d1" ref="previewCanvas" id="banana" /> -->
    </div>
    <button
      @click.prevent="selectImage"
      class="buttonClass"
    >
      select
    </button>
    <input
      ref="fileInput"
      type="file"
      @change="onFileChange"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

import Cropper from 'cropperjs';
import ImageUpload from '@/components/ImageUpload.vue';
import { Event } from '@/models/Event';

import 'cropperjs/dist/cropper.min.css';

@Component
export default class PictureInput extends Vue {
  public $refs!: {
    previewCanvas: HTMLCanvasElement,
  };
  private id = new Date().getDate().toString();
  private canvas = this.$refs.previewCanvas;
  private imageSrc!: HTMLImageElement;
  private banana = document.getElementById('banana') as HTMLImageElement;

  private cropper!: Cropper;

  private mounted() {
    this.canvas = this.$refs.previewCanvas;
    console.log(this.banana, this.canvas);
    this.cropper = new Cropper(
      this.canvas, {
        aspectRatio: 1 / 1,
        dragMode: 'move' as Cropper.DragMode,
        minCanvasWidth: 200,
        minCanvasHeight: 200,
        minContainerHeight: 200,
        minContainerWidth: 200,
        viewMode: 3,
        crop(event: any) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        },
      },
    );
  }

  private drawImage(img: HTMLCanvasElement, index: number) {
    const canvas = this.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');
    // const src = this.imageSrc;

    if (!ctx) {
      return;
    }

    const image = new Image();
    image.addEventListener('load', async (e) => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0);
      ctx.restore();
    });
    image.src = img.toDataURL();
  }

  private onFileChange(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (!files || !files.length) {
      return;
    }
    let index = 0;
    Array.from(files).forEach((file) => {
      const name = file.name;
      const ext = file.type;
      if (!name || name.lastIndexOf('.') === 0) {
        return;
      }
      const listener: EventListenerOrEventListenerObject = {
        handleEvent: async (e) => {
          const orientation = await this.getOrientation(fileReader.result as ArrayBuffer);
          const base64String = await this.arrayBufferToBase64(fileReader.result as ArrayBuffer, ext);
          this.resetOrientation(base64String, orientation, index++, this.drawImage);
        },
      };

      const fileReader = new FileReader();
      fileReader.addEventListener('load',  async (e: any) => {
          console.log(e.target.result);
          const orientation = await this.getOrientation(e.target.result as ArrayBuffer);
          const base64String = await this.arrayBufferToBase64(e.target.result as ArrayBuffer, ext);
          this.resetOrientation(base64String, orientation, index++, this.drawImage);
      });
      fileReader.readAsArrayBuffer(file);
    });
  }

  // private setLocalImageSrc(dataUrl: string, index: number) {
  //     this.imageSrc = dataUrl;
  //   }

  private arrayBufferToBase64(buffer: ArrayBuffer, ext: string): Promise<string> {
      return new Promise((resolve) => {
        let binary: string = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i = parseInt(String(i), 10) + 1) {
          binary += String.fromCharCode(bytes[i]);
        }
        resolve(`data:image/${ext};base64, ${window.btoa(binary)}`);
      });
    }

    private resetOrientation(
      srcBase64: string,
      orientation: number,
      index: number,
      callback: (a: HTMLCanvasElement, b: number) => void): void {

      const img = new Image();
      img.addEventListener('load', (e: any) => {
          this.handleImageLoad(e, img, orientation, index, callback);
      });
      img.src = srcBase64;
    }
    private handleImageLoad(
      e: Event,
      img: HTMLImageElement,
      orientation: number,
      index: number,
      callback: (a: HTMLCanvasElement, b: number) => void,
    ): Promise<void> {
      return new Promise((resolve) => {
        // Defines canvases max height/width
        // Should match the display size
        const maxSize = 40;
        // uploaded image width/height
        let width = img.width;
        let height = img.height;
        // default ratio
        let ratio = 1;
        // default image offset placement location
        let oXcenter = 0;
        let oYcenter = 0;
        const canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        // set proper canvas dimensions before transform & export
        if (width > height) {
          ratio = height / width;
          if (width > maxSize) {
            height = maxSize * ratio;
            width = maxSize;
            oYcenter = Math.floor(((maxSize - height) / 2) * 10) / 10 ;
          }
        } else {
          ratio = width / height;
          if (height > maxSize) {
            width = maxSize * ratio;
            height = maxSize;
            oXcenter = Math.floor(((maxSize - width) / 2) * 10) / 10;
          }
        }
        // transform context before drawing image
        this.rotateCavasCtx(ctx, orientation, maxSize, maxSize);
        // draw raw image
        ctx.drawImage(img, oXcenter, oYcenter, width, height);
        // export base64
        callback(canvas, index);
        resolve();
      });
    }
    private rotateCavasCtx(
      ctx: CanvasRenderingContext2D,
      orientation: number,
      width: number,
      height: number) {
      switch (orientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }
    }
    private getOrientation(arrayBuffer: ArrayBuffer): Promise<number> {
      /* tslint:disable */
      return new Promise((resolve) => {
        const view = new DataView(arrayBuffer);
        if (view.getUint16(0, false) !== 0xFFD8) {
          resolve(-2);
        }
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
          const marker = view.getUint16(offset, false);
          offset += 2;
          if (marker === 0xFFE1) {
            if (view.getUint32(offset += 2, false) !== 0x45786966) {
              resolve(-1);
            }
            const little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i = parseInt(String(i), 10) + 1) {
              if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else if ((marker & 0xFF00) !== 0xFF00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        resolve(-1);
      });
      /* tslint:enable */
    }
}
</script>

<style lang="css" scoped>

</style>
