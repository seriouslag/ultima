<template>
    <div>
        <loading
            v-model="loading"
        >
            <h3 class="title is-3">New Event</h3>
            <event-form
                :event="null"
                @submit="createEvent"
                @validationChanged="handleValidationChange"
                :disabled="loading"
            />
        </loading>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventForm, { SubmitEvent } from '@/components/forms/EventForm.vue';
import Loading from '@/components/loading/Loading.vue';
import firebase from 'firebase/app';
import 'firebase/storage';

import { Event } from '@/models/Event';
import { RawFileData } from '@/models/FileData';

@Component({
    components: {
        EventForm,
        Loading,
    },
})
export default class EventNew extends Vue {

    private isInvalid = true;
    private storage = firebase.storage().ref();
    private loading = false;

    private async createEvent(submitEvent: SubmitEvent) {
        console.log('creating new event', submitEvent);
        const { event, image } = submitEvent;
        let url: string|null = null;
        if (!this.isInvalid) {
            this.loading = true;
            try {
                // upload image to firebase
                if (image) {
                    url = await this.uploadImageAndReturnUrl(image);
                } else {
                    url = null;
                }
                // get image url
            } catch {
                url = null;
                console.log('failed to get url');
            }
            try {
                const response = await this.$firestore.collection('events')
                    .add({
                        name: event.name,
                        image: url,
                        note: event.note,
                        when: new Date(event.when),
                        where: event.where,
                    });
                this.$router.push({ name: 'adminEvents' });
            } catch (e) {
                console.log('Failed to create new event');
            } finally {
                this.loading = false;
            }
        }
    }

    private uploadImageAndReturnUrl(image: RawFileData): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let imgRef = this.storage.child(`events/${image.name()}`);
            try {
                const check = await imgRef.getDownloadURL();
                // found image append random id to end of imgRed
                const lastIndexOfExt = image.name().lastIndexOf(`.${image.ext}`);
                const newName = `${image.name().substring(0, lastIndexOfExt)}-${this.getRandomInt(1, 9999)}.${image.ext}`;
                imgRef = this.storage.child(`events/${newName}`);
            } catch (e) {
                console.log(e);
                // do nothing?
            }
            const uploadTask = imgRef.put(image.file, {
                contentType: image.type,
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

    private getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    private handleValidationChange(value: boolean) {
        this.isInvalid = value;
    }
}
</script>

