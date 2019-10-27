<template>
<div>
    <vue-file-agent
        v-model="filesData"
        :multiple="true"
        :deletable="true"
        :accept="'image/*'"
        :max-size="maxFileSize"
        :max-files="maxFiles"
        :help-text="'Choose images or zip files'"
        :error-text="{
            type: 'Invalid file type. Only images are allowed',
            size: `Files should not exceed ${maxFileSize} in size`,
            common: 'Invalid file',
        }"
        :meta="true"
        @select="filesAdded($event)"
        @delete="fileDeleted($event)"
    />
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';

import VueFileAgent from 'vue-file-agent';
import { FileData } from '@/models/FileData';
import 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);

@Component
export default class ImageUpload extends Vue {
    @Prop()
    private value!: FileData|null;

    private filesData: FileData[] = [];
    private maxFiles = 1;
    private maxFileSize = '10MB';
    private filesDataForUpload: FileData[] = [];

    private created() {
        if (this.value) {
            this.filesDataForUpload = [this.value];
            this.filesData = [this.value];
        }
    }

    private filesAdded(filesDataNewlySelected: any) {
      const validFilesData = filesDataNewlySelected.filter((fileData: FileData) => !fileData.error);
      this.filesDataForUpload = this.filesDataForUpload.concat(validFilesData);
    }

    private fileDeleted(deletedData: FileData) {
      this.filesDataForUpload.some((data: FileData, index: number) => {
          if (deletedData === data) {
            this.filesDataForUpload.splice(index, 1);
            return true;
          }
          return false;
      });
    }

    get hasImage(): boolean {
      return !!this.filesDataForUpload.length;
    }

    @Watch('filesDataForUpload')
    private fileWatcher(newVal: FileData[]) {
        this.inputEmitter();
    }

    @Emit('input')
    private inputEmitter(): FileData|null {
        return this.filesDataForUpload[0] ?? null;
    }
}
</script>

<style lang="scss" scoped>

</style>