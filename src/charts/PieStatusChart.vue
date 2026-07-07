<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  data: Array<{ name: string; value: number }>
}>();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const renderChart = () => {
  if (!chartRef.value) return;
  if (!chartInstance) chartInstance = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,20,45,0.8)",
      textStyle: { color: "#e8fbff" }
    },
    series: [
      {
        type: "pie",
        radius: ["30%", "72%"],
        roseType: "area",
        data: props.data,
        itemStyle: {
          color: function (params: any) {
            const colorList = ["#22c9ff", "#36e0c2", "#ffc45c", "#ff7a8c"];
            return colorList[params.dataIndex % colorList.length];
          }
        },
        label: { color: "#e6f3ff" }
      }
    ]
  };
  chartInstance.setOption(option);
};

watch(() => props.data, renderChart, { deep: true });
onMounted(renderChart);
</script>

<style scoped></style>