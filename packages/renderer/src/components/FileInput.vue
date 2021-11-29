<template>
  <n-upload
    ref="uploadRef"
    class="file-input"
    :file-list="[]"
    style="width: 100%"
    :show-cancel-button="false"
    @update:file-list="handleFileListChange"
  >
    <n-upload-dragger>
      <n-input
        v-model:value="_value"
        class="upload-input"
        :placeholder="placeholder"
      />
    </n-upload-dragger>
  </n-upload>
</template>

<script lang="ts" setup>
import type { MaybeElementRef } from '@vueuse/core'
import type { FileInfo } from 'naive-ui/lib/upload/src/interface'

function useDragAnimation(elRef: MaybeElementRef) {
  onMounted(() => {
    const upload = <HTMLDivElement>unrefElement(elRef)
    const trigger = upload.getElementsByClassName('n-upload-trigger')[0]
    const input = upload.getElementsByClassName('n-input')[0]
    trigger.addEventListener('dragenter', () => {
      input.classList.add('n-input--focus')
    })
    trigger.addEventListener('dragleave', () => {
      input.classList.remove('n-input--focus')
    })
  })
}

const props = defineProps<{
  value: string
  placeholder: string
}>()
const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const uploadRef = ref()
useDragAnimation(uploadRef)

const _value = useVModel(props, 'value', emit)

const handleFileListChange = (fileList: Array<FileInfo>) => {
  if (fileList.length === 0) {
    return
  }
  const file = fileList[0].file
  _value.value = (file as unknown as { path: string }).path
}
</script>

<style scoped>
.file-input::v-deep(.n-upload-trigger) {
  width: 100%;
}

.file-input::v-deep(.n-upload-dragger) {
  padding: unset;
  background-color: unset;
  border: unset;
}

.file-input::v-deep(.n-upload-dragger:hover) {
  border: unset;
}

.file-input::v-deep(.n-upload-dragger) span {
  width: unset;
}

.file-input::v-deep(.n-upload-dragger) input {
  text-align: left;
}
</style>
