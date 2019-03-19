<template>
    <div>
    image: {{ hasImage }}
    <picture-upload
        ref="pictureInput"
        @change="onChanged"
        @remove="onRemoved"
        :width="500"
        :removable="true"
        removeButtonClass="ui red button"
        :height="500"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="ui button primary"
        :customStrings="{
            upload: '<h1>Upload it!</h1>',
            drag: 'Click or drag an image here'
        }"
>

</picture-upload>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

import firebase from 'firebase/app';
import 'firebase/storage';

import PictureUpload from 'vue-picture-input';

@Component({
    components: {
        PictureUpload,
    },
})
export default class ImageUpload extends Vue {
    private storage = firebase.storage();

    private hasImage = false;
    private file = '';

    private dropzoneOptions = {
        thumbnailWidth: 150,
        maxFilesize: 4,
        addRemoveLinks: true,
        uploadMultiple: false,
        autoProcessQueue: false,
    };

    private onChanged(file) {
        if (file) {
            this.hasImage = true;
            this.file = file;
        } else {
            this.hasImage = false;
            this.file = '';
        }
      }

      private onRemoved() {
          this.hasImage = false;
      }

}
</script>

<style lang="scss" scoped>

</style>