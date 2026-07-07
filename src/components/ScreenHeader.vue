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
      <button class="btn-refresh" @click="handleRefreshAll">手动刷新数据</button>
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
import { refreshAllData } from '@/services/dashboardService'

const now = ref(new Date())
let timer: number | undefined

const clock = computed(() => formatClock(now.value))
const isoNow = computed(() => now.value.toISOString())

// 手动刷新全部图表数据
const handleRefreshAll = async () => {
  await refreshAllData()
  alert("所有运维监控数据已刷新完成")
}

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1_000)
  // 新增30秒自动刷新定时器
  window.setInterval(() => {
    refreshAllData()
  }, 30000)
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
})
</script>

<style scoped></style>