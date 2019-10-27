<template>
    <div
        :class="{ 'is-active': value }"
        class="modal"
        :id="id"
        :aria-labelledby="`${id}-header`"
        :aria-describedby="`${id}-content`"
        :role="role"
    >
        <div
            class="modal-background"
            @click.self="handleBackdropClick()"
        ></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title" :id="`${id}-header`">
                    <slot name="header" />
                </p>
                <button
                    v-if="!disableClose"
                    class="delete"
                    aria-label="close"
                    @click="handleBackdropClick()"
                >
                </button>
            </header>
            <section class="modal-card-body" :id="`${id}-content`">
                <slot />
            </section>
            <footer class="modal-card-foot">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
    @Prop({
        required: true,
        default: false,
    })
    private value!: boolean;

    @Prop({
        required: false,
        default: false,
    })
    private disableClose!: boolean;

    @Prop({
        required: false,
        default: false,
    })
    private alert!: boolean;

    private handleBackdropClick() {
        if (this.disableClose) {
            return;
        }

        this.$emit('input', false);
    }

    get role(): string {
        return this.alert ? 'alertdialog' : 'dialog';
    }

    get id(): string {
        return `id-${Math.random().toString()}`;
    }
}
</script>

