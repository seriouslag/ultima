<template>
    <div>
        image: {{ hasImage }}
    <picture-upload
        ref="pictureInput"
        @change="onChanged"
        @remove="onRemoved"
        :width="500"
        :removable="true"
        removeButtonClass="button is-danger"
        :height="500"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="button is-info"
        size="10MB"
        :customStrings="customStrings"
        :crop="false"
    ></picture-upload>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

import firebase from 'firebase/app';
import 'firebase/storage';

import PictureUpload from '@/components/PictureInput/PictureInput.vue';

@Component({
    components: {
        PictureUpload,
    },
})
export default class ImageUpload extends Vue {
    private customStrings = {
        upload: '<p>Your device does not support file uploading.</p>', // HTML allowed
        drag: 'Drag an image or <br>click here to select a file', // HTML allowed
        tap: 'Tap here to select a photo <br>from your gallery', // HTML allowed
        change: 'Change Photo', // Text only
        remove: 'Remove Photo', // Text only
        select: 'Select a Photo', // Text only
        selected: '<p>Photo successfully selected!</p>', // HTML allowed
        fileSize: 'The file size exceeds the limit', // Text only
        fileType: 'This file type is not supported.', // Text only
        aspect: 'Landscape/Portrait', // Text only
    };

    private storage = firebase.storage();

    private hasImage = false;
    private file: string = '';

    private dropzoneOptions = {
        thumbnailWidth: 150,
        maxFilesize: 4,
        addRemoveLinks: true,
        uploadMultiple: false,
        autoProcessQueue: false,
    };

    private onChanged(file: string) {
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