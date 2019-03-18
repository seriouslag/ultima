<template>
    <div>
        <h3 class="title is-3">New Event</h3>
        <event-form
            :event="null"
            @submit="createEvent"
            @validationChanged="handleValidationChange"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventForm from '@/components/forms/EventForm.vue';

import { Event } from '@/models/Event';

@Component({
    components: {
        EventForm,
    },
})
export default class EventNew extends Vue {

    private isInvalid = true;

    private async createEvent(event: Event) {
        if (!this.isInvalid) {
            try {
                const response = await this.$firestore.collection('events')
                    .add({
                        name: event.name,
                        image: event.image,
                        note: event.note,
                        when: new   Date(event.when),
                        where: event.where,
                    });
                this.$router.push({ name: 'adminEvents' });
            } catch (e) {
                console.log('Failed to create new event');
            }
        }
    }

    private handleValidationChange(value: boolean) {
        this.isInvalid = value;
    }
}
</script>

