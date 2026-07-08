<template>
  <div ref="chartRef" class="chart" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  value: number
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value)

  chart.setOption({
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 220,
        endAngle: -40,
        min: 90,
        max: 100,
        radius: '88%',
        center: ['50%', '58%'],
        progress: {
          show: true,
          width: 18,
          roundCap: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#2ee6ff' },
              { offset: 0.5, color: '#7ef2b2' },
              { offset: 1, color: '#ffd96b' },
            ]),
            shadowBlur: 12,
            shadowColor: 'rgba(46, 230, 255, 0.28)',
          },
        },
        axisLine: {
          lineStyle: {
            width: 16,
            color: [[1, 'rgba(92, 170, 210, 0.16)']],
          },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: {
          show: true,
          length: '72%',
          width: 6,
          itemStyle: { color: '#f4fbff' },
        },
        title: {
          show: true,
          offsetCenter: ['0%', '-20%'],
          color: '#8fb0c2',
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}',
          color: '#f4fbff',
          fontSize: 30,
          fontWeight: 700,
          offsetCenter: ['0%', '18%'],
        },
        data: [{ value: props.value, name: '健康度' }],
      },
    ],
  })
}

onMounted(() => {
  requestAnimationFrame(() => renderChart())
})

watch(() => props.value, renderChart, { flush: 'post' })

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
