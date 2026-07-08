<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  data: Array<{ name: string; value: number }>
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const palette = ['#2ee6ff', '#47d16c', '#ffd96b', '#ff7a90']

function buildTooltip(params: unknown) {
  const list = Array.isArray(params) ? params : [params]
  const item = list[0] as { name?: string; value?: number } | undefined
  if (!item?.name) {
    return '暂无数据'
  }

  return `${item.name}<br/>占比 ${item.value ?? 0}%<br/>业务负载已归类`
}

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chartInstance ??= echarts.init(chartRef.value)

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(4, 17, 32, 0.92)',
      borderColor: 'rgba(46, 230, 255, 0.3)',
      textStyle: { color: '#f4fbff' },
      formatter: buildTooltip,
    },
    legend: {
      top: '2%',
      left: 'center',
      textStyle: { color: '#8db0c3', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8,
    },
    series: [
      {
        name: '业务流量',
        type: 'pie',
        radius: ['20%', '68%'],
        center: ['50%', '54%'],
        startAngle: 90,
        clockwise: true,
        data: props.data.map((item, index) => ({
          ...item,
          itemStyle: {
            color: palette[index % palette.length],
            shadowBlur: 16,
            shadowColor: 'rgba(46, 230, 255, 0.34)',
          },
          emphasis: {
            scale: true,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(46, 230, 255, 0.42)',
            },
          },
        })),
        label: {
          color: '#f4fbff',
          fontSize: 10,
          formatter: '{b}\n{d}%',
          overflow: 'breakAll',
        },
        labelLine: {
          show: true,
          length: 8,
          length2: 5,
          lineStyle: { color: 'rgba(141, 176, 195, 0.6)' },
        },
      },
    ],
  }

  chartInstance.setOption(option)
}

watch(() => props.data, renderChart, { deep: true, flush: 'post' })
onMounted(() => {
  requestAnimationFrame(() => renderChart())
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 170px;
  min-height: 170px;
  min-width: 0;
}
</style>