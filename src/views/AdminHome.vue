<template>
<div>
    <h3 class="title is-3">Admin home</h3>
        <router-link
            class="button"
            :to="{ name: 'adminEvents' }"
            tag="button"
        >
            Manage Events
        </router-link>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AdminHome extends Vue {}
</script>
