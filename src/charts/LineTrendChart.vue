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
  if (!chartRef.value) return;
  if (!chartInstance) chartInstance = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 20, 45, 0.8)",
      textStyle: { color: "#e8fbff" }
    },
    grid: { left: 10, right: 10, top: 30, bottom: 30 },
    xAxis: {
      type: "category",
      data: props.data.map(item => item.time),
      axisLine: { lineStyle: { color: "rgba(70,165,255,0.2)" } },
      axisLabel: { color: "#a6d8ff" },
      axisTick: { lineStyle: { color: "rgba(70,165,255,0.2)" } }
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "rgba(70,165,255,0.2)" } },
      splitLine: { lineStyle: { color: "rgba(70,165,255,0.1)" } },
      axisLabel: { color: "#a6d8ff" }
    },
    series: [
      {
        data: props.data.map(item => item.value),
        type: "line",
        smooth: true,
        color: "#22c9ff",
        lineStyle: { width: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(34, 201, 255, 0.4)" },
              { offset: 1, color: "rgba(34, 201, 255, 0)" }
            ]
          }
        }
      }
    ]
  };

  chartInstance.setOption(option);
};

watch(() => props.data, renderChart, { deep: true });
onMounted(renderChart);
</script>

<style scoped></style>