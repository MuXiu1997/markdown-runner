<template>
  <div style="padding: 16px" class="container">
    <n-form ref="formRef" :model="formState">
      <n-form-item label="Markdown 模板">
        <file-input
          v-model:value="formState.markdownTemplate"
          placeholder="请选择 Markdown 模板"
        />
      </n-form-item>
      <n-form-item label="跳过步数">
        <n-input-number
          v-model:value="formState.skipSteps"
          :default-value="0"
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              ghost
              round
              type="primary"
              :disabled="!running"
              style="margin-right: 16px"
              @click="showStep"
            >
              {{ '显示步数' }}
            </n-button>
            <n-button
              ghost
              round
              type="primary"
              :disabled="!running"
              style="margin-right: 16px"
              @click="handleAbort"
            >
              {{ '结束' }}
            </n-button>
            <n-button
              ghost
              round
              type="primary"
              :disabled="running"
              @click="handleRun"
            >
              {{ running ? '运行中' : '开始' }}
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { useElectron } from './use/electron'

const formState = ref({
  markdownTemplate: import.meta.env.VITE_MARKDOWN_TEMPLATE || '',
  skipSteps: 0,
})

const electron = useElectron()

const running = ref(false)
const handleRun = async () => {
  running.value = true
  await electron.run(
    formState.value.markdownTemplate,
    formState.value.skipSteps
  )
  await nextTick()
  running.value = false
}

const handleAbort = async () => {
  await electron.abort()
}

const showStep = async () => {
  await electron.showStep()
}
</script>
