<template>
    <div class="unauthorized">
        <h3 class="title is-3">
            Unauthorized
        </h3>
        <p>
            This account is registered but does not have the required privileges.
        </p>
        <p>
            Please contact the webmaster if you believe you have received this screen in error.
        </p>
        <div class="section">
            <signout />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Signout from '@/components/admin/Signout.vue';

@Component({
    components: {
        Signout,
    },
})
export default class Unauthorized extends Vue {}
</script>

<style lang="scss" scoped>
.unauthorized {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
