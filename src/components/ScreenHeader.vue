<template>
  <header class="screen-header">
    <div class="screen-header__side">
      <span>AI运维实训作业</span>
      <strong>Vue3 + ECharts 可视化监控</strong>
    </div>
    <div class="screen-header__title">
      <h1>AI运维监控可视化大屏</h1>
      <p>AI Operation Visual Large Screen</p>
    </div>
    <div class="screen-header__time">
      <time
        :datetime="isoNow"
        style="margin-left:12px"
      >{{ clock }}</time>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { formatClock } from '@/utils/format'

const now = ref(new Date())
let timer: number | undefined

const clock = computed(() => formatClock(now.value))
const isoNow = computed(() => now.value.toISOString())

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1_000)
  // 30秒自动刷新数据
  window.setInterval(() => {
  }, 30000)
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
})
</script>

<style scoped>
.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid rgba(70,165,255,0.2);
  border-radius: 6px;
  margin-bottom: 12px;
  background: rgba(4,17,32,0.6);
}
.screen-header__title h1 {
  margin: 0;
  font-size: 22px;
  color: #2ee6ff;
}
.screen-header__title p {
  margin: 2px 0 0;
  font-size: 12px;
  color: #9bb9cc;
}
</style>