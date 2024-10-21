<template>
  <view class="container">
    <view class="input-area">
      <textarea v-model="dialogueContent" placeholder="请输入对话内容" />
    </view>
    <view class="button-area">
      <button @click="analyzeDialogue">分析对话</button>
      <button @click="suggestReply">建议回复</button>
    </view>
    <view class="result-area">
      <text>{{ result }}</text>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const dialogueContent = ref('')
    const result = ref('')

    const analyzeDialogue = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: dialogueContent.value }),
        })
        const data = await response.json()
        result.value = data.analysis
      } catch (error) {
        console.error('分析对话时出错:', error)
        result.value = '分析失败,请稍后重试'
      }
    }

    const suggestReply = async () => {
      try {
        const response = await fetch('/api/suggest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: dialogueContent.value }),
        })
        const data = await response.json()
        result.value = data.suggestion
      } catch (error) {
        console.error('生成建议回复时出错:', error)
        result.value = '生成建议失败,请稍后重试'
      }
    }

    return {
      dialogueContent,
      result,
      analyzeDialogue,
      suggestReply,
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}
.input-area {
  margin-bottom: 20px;
}
.input-area textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  padding: 10px;
}
.button-area {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.result-area {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 100px;
}
</style>