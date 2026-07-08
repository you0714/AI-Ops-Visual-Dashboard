<template>
  <div
    ref="chartRef"
    class="chart"
    data-testid="chart-ranking"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { RankingItem } from '@/types/dashboard'
import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  data: RankingItem[]
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    backgroundColor: 'transparent',
    grid: { left: 54, right: 18, top: 18, bottom: 24 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(4, 17, 32, 0.92)',
      borderColor: 'rgba(46, 230, 255, 0.3)',
      textStyle: { color: '#f4fbff' },
      formatter: (params: unknown) => {
        const list = Array.isArray(params) ? params : [params]
        const item = list[0] as { name?: string; value?: number } | undefined
        if (!item?.name) {
          return ''
        }
        const value = item.value ?? 0
        return `${item.name}<br/>负载强度 ${value}<br/>建议保持冗余策略`
      },
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(92, 170, 210, 0.18)' } },
      axisLabel: { color: '#e3f5ff' },
    },
    yAxis: {
      type: 'category',
      data: props.data.map((item) => item.city).reverse(),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: '#d6edf7' },
    },
    series: [
      {
        name: '负载强度',
        type: 'bar',
        barWidth: 14,
        data: props.data.map((item) => item.value).reverse(),
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#1d8dff' },
            { offset: 0.55, color: '#2ee6ff' },
            { offset: 1, color: '#7ef2b2' },
          ]),
          shadowBlur: 12,
          shadowColor: 'rgba(46, 230, 255, 0.24)',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 16,
            shadowColor: 'rgba(46, 230, 255, 0.32)',
          },
        },
      },
    ],
  })
}

onMounted(() => {
  requestAnimationFrame(() => renderChart())
})
watch(() => props.data, renderChart, { deep: true, flush: 'post' })
useElementResize(chartRef, () => chart?.resize())

onBeforeUnmount(() => chart?.dispose())
</script>

<style scoped>
.chart {
  width: 100%;
  height: 170px;
  min-height: 170px;
  min-width: 0;
}
</style>
<   