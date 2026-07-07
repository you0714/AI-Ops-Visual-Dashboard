<template>
<main class="big-screen-layout">
  <div class="big-screen-layout__canvas">
    <!-- 顶部头部 -->
    <header class="screen-header">
      <div class="screen-header__side">
        <div>实训课程</div>
        <strong>AI运维可视化大屏作业</strong>
      </div>

      <div class="screen-header__title">
        <h1>AI运维监控可视化大屏</h1>
        <p>AI Operation Visual Large Screen</p>
      </div>

      <div class="screen-header__time">
        <button class="btn-refresh" @click="handleRefreshAll">手动刷新</button>
        <span style="margin-left:12px">{{ nowTime }}</span>
      </div>
    </header>

    <!-- 顶部指标卡片行 -->
    <section class="metric-grid">
      <MetricCard
        v-for="item in dashboardStore.metrics"
        :key="item.title"
        :title="item.title"
        :value="item.value"
        :rate="item.rate"
      />
    </section>

    <!-- 中间三栏图表区域 -->
    <section class="dashboard-grid">
      <div class="dashboard-grid__side">
        <div class="base-panel">
          <div class="base-panel__header">
            <h2>容器资源占比</h2>
            <span class="base-panel__tag">Docker</span>
          </div>
          <div class="base-panel__body chart">
            <PieChart :data="dashboardStore.pieData" />
          </div>
        </div>
        <div class="base-panel">
          <div class="base-panel__header">
            <h2>机房访问排名</h2>
            <span class="base-panel__tag">机房节点</span>
          </div>
          <div class="base-panel__body chart">
            <CityChart :data="dashboardStore.cityData" />
          </div>
        </div>
      </div>

      <div class="dashboard-grid__center">
        <div class="base-panel">
          <div class="base-panel__header">
            <h2>运维中枢态势总览</h2>
            <span class="base-panel__tag">核心视图</span>
          </div>
          <div class="base-panel__body chart chart--map">
            <CenterChart />
          </div>
        </div>
        <div class="base-panel">
          <div class="base-panel__header">
            <h2>运维能力雷达图</h2>
            <span class="base-panel__tag">技能评估</span>
          </div>
          <div class="base-panel__body chart">
            <RadarChart :data="dashboardStore.radarData" />
          </div>
        </div>
      </div>

      <div class="dashboard-grid__side">
        <div class="base-panel">
          <div class="base-panel__header">
            <h2>服务器负载趋势</h2>
            <span class="base-panel__tag">实时监控</span>
          </div>
          <div class="base-panel__body chart">
            <TrendChart :data="dashboardStore.trendData" />
          </div>
        </div>
        <AlarmList />
      </div>
    </section>

    <!-- 底部实时动态栏 -->
    <section class="activity-panel base-panel">
      <div class="base-panel__header">
        <h2>实时运维动态</h2>
        <span class="base-panel__tag">实时推送</span>
      </div>
      <div class="base-panel__body">
        <ul class="activity-list">
          <li
            class="activity-list__item"
            v-for="item in dashboardStore.activityList"
            :key="item.id"
            :class="{
              'activity-list__item--success': item.type === 'success',
              'activity-list__item--warning': item.type === 'warn'
            }"
          >
            <time>{{ item.time }}</time>
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboardStore";
import { refreshAllData } from "@/services/dashboardService";

// 引入全部子组件
import MetricCard from "@/components/MetricCard.vue";
import PieChart from "@/charts/PieChart.vue";
import CityChart from "@/charts/CityChart.vue";
import CenterChart from "@/charts/CenterChart.vue";
import RadarChart from "@/charts/RadarChart.vue";
import TrendChart from "@/charts/TrendChart.vue";
import AlarmList from "@/components/AlarmList.vue";

const dashboardStore = useDashboardStore();
const nowTime = ref("");

// 手动刷新所有图表数据
const handleRefreshAll = async () => {
  await refreshAllData();
  alert("所有监控数据已刷新");
};

// 实时时钟
const updateTime = () => {
  const date = new Date();
  nowTime.value = date.toLocaleString("zh-CN");
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
  // 30秒自动全局刷新数据
  setInterval(() => {
    refreshAllData();
  }, 30000);
});
</script>

<style scoped></style>