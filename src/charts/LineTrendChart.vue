<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  data: Array<{ time: string; value: number }>
}>();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const renderChart = () => {
  if (!chartRef.value) return
  chartInstance ??= echarts.init(chartRef.value)

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
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
        return `${item.name}<br/>吞吐 ${item.value ?? 0}`
      },
    },
    grid: { left: 18, right: 12, top: 20, bottom: 24 },
    xAxis: {
      type: 'category',
      data: props.data.map((item) => item.time),
      axisLine: { lineStyle: { color: 'rgba(70, 165, 255, 0.3)' } },
      axisLabel: { color: '#e3f5ff' },
      axisTick: { lineStyle: { color: 'rgba(70, 165, 255, 0.3)' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(70, 165, 255, 0.16)' } },
      axisLabel: { color: '#e3f5ff' },
    },
    series: [
      {
        name: '吞吐量',
        data: props.data.map((item) => item.value),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { width: 3, color: '#2ee6ff' },
        itemStyle: { color: '#7ef2b2', shadowBlur: 10, shadowColor: 'rgba(46, 230, 255, 0.4)' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(46, 230, 255, 0.28)' },
              { offset: 1, color: 'rgba(46, 230, 255, 0.03)' },
            ],
          },
        },
      },
    ],
  }

  chartInstance.setOption(option)
}

watch(() => props.data, renderChart, { deep: true, flush: 'post' });
onMounted(() => {
  requestAnimationFrame(() => renderChart())
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 170px;
  min-height: 170px;
  min-width: 0;
}
</style>