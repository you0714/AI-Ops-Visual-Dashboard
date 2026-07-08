<template>
  <div
    ref="chartRef"
    class="chart"
    data-testid="chart-radar"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { RadarData } from '@/types/dashboard'
import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  data: RadarData
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value || !props.data.indicators.length || !props.data.values.length) {
    return
  }

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    backgroundColor: 'transparent',
    color: ['#2ee6ff'],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(4, 17, 32, 0.92)',
      borderColor: 'rgba(46, 230, 255, 0.3)',
      textStyle: { color: '#f4fbff' },
      formatter: (params: unknown) => {
        const item = params as { data?: { value?: number[] }; name?: string }
        const values = item.data?.value ?? []
        const headline = item.name ?? '能力指数'
        return `${headline}<br/>综合评分 ${values.join(' / ')}<br/>等级：稳定提升`
      },
    },
    radar: {
      center: ['50%', '54%'],
      radius: '68%',
      indicator: props.data.indicators,
      axisName: { color: '#f4fbff', fontSize: 11 },
      splitArea: { areaStyle: { color: ['rgba(46, 230, 255, 0.10)', 'rgba(46, 230, 255, 0.02)'] } },
      axisLine: { lineStyle: { color: 'rgba(92, 170, 210, 0.4)' } },
      splitLine: { lineStyle: { color: 'rgba(92, 170, 210, 0.24)' } },
    },
    series: [
      {
        type: 'radar',
        name: '能力指数',
        data: [{ name: '能力指数', value: props.data.values }],
        areaStyle: { color: 'rgba(46, 230, 255, 0.28)' },
        lineStyle: { width: 2.4, color: '#2ee6ff' },
        symbolSize: 6,
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