<template>
    <modal
        :value="value"
        @input="cancel"
    >   
        <div slot="header">
            <slot name="header"/>
        </div>
        <slot />
        <div
            slot="footer"
            class="buttons"
        >
            <button
                class="button is-info"
                @click="cancel"
            >
                Cancel
            </button>
            <slot name="confirm" />
        </div>
    </modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

import Modal from './Modal.vue';

@Component({
    components: {
        Modal,
    },
})
export default class ConfirmModal extends Vue {
    @Prop({
        required: true,
        default: false,
    })
    private value: boolean = false;

    @Prop({
        default: false,
    })
    private disableClose: boolean = false;

    @Emit('delete')
    private emitDelete() {
        return;
    }

    @Emit('input')
    private cancel() {
        return false;
    }
}
</script>