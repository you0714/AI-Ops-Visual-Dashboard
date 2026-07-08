<template>
  <main class="big-screen-layout">
    <div class="big-screen-layout__canvas">
      <header class="screen-header">
        <div class="screen-header__identity">
          <span class="screen-header__badge">AI 运维平台</span>
          <p>7 × 24 智能联动 · 业务感知 · 自动处置</p>
        </div>

        <div class="screen-header__title">
          <h1>智能运维指挥中心</h1>
          <p>实时业务态势 · 全局事件编排 · 自动化决策支持</p>
        </div>

        <div class="screen-header__meta">
          <div class="screen-header__clock">
            <span class="screen-header__dot"></span>
            <time :datetime="nowTime">{{ nowTime }}</time>
          </div>
          <div class="screen-header__pill">数据源 · 实训联动平台</div>
        </div>
      </header>

      <section class="hero-panel">
        <div class="hero-panel__content">
          <div class="hero-panel__eyebrow">指挥中枢概览</div>
          <h2>
            全局服务健康度维持在 {{ healthScore }}，本轮自动联动已完成 {{ alertCount }} 项重点响应。
          </h2>
          <p>
            业务链路、订单流量、教学访问与资源下载已形成统一感知与闭环处置，异常模式能够在数秒内被识别并推送。
          </p>
          <div class="hero-panel__chips">
            <span class="hero-pill hero-pill--good">自动巡检已启用</span>
            <span class="hero-pill hero-pill--accent">AI 诊断命中 4 条异常模式</span>
            <span class="hero-pill hero-pill--warm">同步周期 10s</span>
          </div>
        </div>

        <div class="hero-panel__stats">
          <div class="hero-stat">
            <span>联动节点</span>
            <strong>12</strong>
          </div>
          <div class="hero-stat">
            <span>重点业务</span>
            <strong>4</strong>
          </div>
          <div class="hero-stat">
            <span>响应时长</span>
            <strong>4.8s</strong>
          </div>
        </div>
      </section>

      <section v-if="!dashboardData" class="dashboard-state">
        <span>运维数据正在接入中...</span>
      </section>

      <template v-else>
        <section class="metric-grid">
          <MetricCard
            v-for="item in summaryItems"
            :key="item.key"
            :metric="item"
          />
        </section>

        <section class="dashboard-grid">
          <div class="dashboard-grid__column dashboard-grid__column--left">
            <BasePanel title="业务链路占比" tag="流量分布">
              <div class="panel-card panel-card--stacked">
                <div class="panel-card__summary">
                  <p>本日关键业务流量已按类型拆解，教学访问与实训任务占据大部分表现。</p>
                </div>
                <div class="panel-card__chart">
                  <PieStatusChart :data="dashboardData.categories" />
                </div>
              </div>
            </BasePanel>

            <BasePanel title="地域负载排行" tag="节点压力">
              <div class="panel-card panel-card--stacked">
                <div class="panel-card__summary">
                  <p>华北与华东节点负载持续领先，需保持双路由冗余与缓存预热。</p>
                </div>
                <div class="panel-card__chart">
                  <BarRankingChart :data="dashboardData.ranking" />
                </div>
              </div>
            </BasePanel>
          </div>

          <div class="dashboard-grid__column dashboard-grid__column--center">
            <BasePanel title="全域拓扑态势" tag="中枢视图">
              <div class="panel-card panel-card--map">
                <div class="panel-card__summary">
                  <p>节点之间的数据链路已形成动态联动，服务拓扑与告警路径可实时追踪。</p>
                </div>
                <div class="panel-card__chart panel-card__chart--map">
                  <MapOverviewChart :data="dashboardData.hubNodes" />
                </div>
              </div>
            </BasePanel>

            <div class="dashboard-grid__split">
              <BasePanel title="健康度仪表" tag="系统稳定性">
                <div class="panel-card panel-card--stacked">
                  <div class="panel-card__summary">
                    <p>系统健康度是整体稳定性的核心信号，当前受业务峰值和联动调度影响较小。</p>
                  </div>
                  <div class="panel-card__chart">
                    <GaugeHealthChart :value="healthGaugeValue" />
                  </div>
                </div>
              </BasePanel>

              <BasePanel title="运营能力雷达" tag="能力评估">
                <div class="panel-card panel-card--stacked">
                  <div class="panel-card__summary">
                    <p>平台在交付规范、前端工程与数据建模方面稳健，性能优化仍有上升空间。</p>
                  </div>
                  <div class="panel-card__chart">
                    <RadarAbilityChart :data="dashboardData.radar" />
                  </div>
                </div>
              </BasePanel>
            </div>
          </div>

          <div class="dashboard-grid__column dashboard-grid__column--right">
            <BasePanel title="吞吐趋势监测" tag="实时线图">
              <div class="panel-card panel-card--stacked">
                <div class="panel-card__summary">
                  <p>实时吞吐曲线呈现持续上升趋势，峰值出现在下午高峰窗口。</p>
                </div>
                <div class="panel-card__chart">
                  <LineTrendChart :data="dashboardData.trend" />
                </div>
              </div>
            </BasePanel>

            <BasePanel title="告警联动日志" tag="事件快照">
              <ul class="activity-list">
                <li
                  v-for="item in activityItems"
                  :key="item.id"
                  class="activity-list__item"
                  :class="{
                    'activity-list__item--warning': item.level === 'warning',
                    'activity-list__item--success': item.level === 'success',
                  }"
                >
                  <time>{{ item.time }}</time>
                  <strong>{{ item.title ?? item.message }}</strong>
                  <span>{{ item.location ?? item.level }}</span>
                </li>
              </ul>
            </BasePanel>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import BarRankingChart from '@/charts/BarRankingChart.vue'
import GaugeHealthChart from '@/charts/GaugeHealthChart.vue'
import LineTrendChart from '@/charts/LineTrendChart.vue'
import MapOverviewChart from '@/charts/MapOverviewChart.vue'
import PieStatusChart from '@/charts/PieStatusChart.vue'
import RadarAbilityChart from '@/charts/RadarAbilityChart.vue'
import BasePanel from '@/components/BasePanel.vue'
import MetricCard from '@/components/MetricCard.vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()
const dashboardData = computed(() => dashboardStore.dashboard)
const summaryItems = computed(() => dashboardData.value?.summary ?? [])
const activityItems = computed(() => dashboardData.value?.activities ?? [])
const healthScore = computed(() => {
  const metric = dashboardData.value?.summary.find((item) => item.key === 'health')
  if (!metric) {
    return '98.7%'
  }

  return `${metric.value.toFixed(1)}${metric.unit}`
})
const healthGaugeValue = computed(() => {
  const metric = dashboardData.value?.summary.find((item) => item.key === 'health')
  if (!metric) {
    return 98.7
  }

  return Number(metric.value.toFixed(1))
})
const alertCount = computed(() => activityItems.value.filter((item) => item.level === 'warning').length)
const nowTime = ref('')
let timerId: number | undefined

const updateTime = () => {
  const date = new Date()
  nowTime.value = date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

onMounted(() => {
  updateTime()
  if (!dashboardData.value) {
    void dashboardStore.fetchDashboard()
  }

  timerId = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timerId !== undefined) {
    window.clearInterval(timerId)
  }
})
</script>

<style scoped>
.big-screen-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #040b16;
  color: #eaf8ff;
}

.big-screen-layout__canvas {
  display: grid;
  grid-template-rows: auto auto auto auto minmax(0, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 12px 16px 14px;
  box-sizing: border-box;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgb(6 15 31 / 97%), rgb(4 18 32 / 94%)),
    radial-gradient(circle at top left, rgb(46 230 255 / 24%), transparent 26%),
    radial-gradient(circle at bottom right, rgb(120 240 192 / 18%), transparent 24%),
    linear-gradient(90deg, rgb(46 230 255 / 8%) 1px, transparent 1px),
    linear-gradient(rgb(46 230 255 / 8%) 1px, transparent 1px);
  background-size: auto, auto, auto, 28px 28px, 28px 28px;
  border: 1px solid rgb(92 170 210 / 34%);
  box-shadow:
    inset 0 0 80px rgb(46 230 255 / 10%),
    0 0 40px rgb(46 230 255 / 14%);
}

.screen-header {
  display: grid;
  grid-template-columns: 250px 1fr 280px;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: linear-gradient(90deg, rgb(10 31 50 / 95%), rgb(5 19 36 / 96%));
  border: 1px solid rgb(46 230 255 / 24%);
  border-radius: 14px;
  box-shadow:
    inset 0 0 26px rgb(46 230 255 / 8%),
    0 0 24px rgb(46 230 255 / 10%);
}

.screen-header__identity,
.screen-header__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.screen-header__identity p,
.screen-header__pill {
  margin: 0;
  color: #88adbf;
  font-size: 12px;
}

.screen-header__badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 8px;
  color: #7aefff;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: linear-gradient(90deg, rgb(46 230 255 / 18%), rgb(120 240 192 / 12%));
  border: 1px solid rgb(46 230 255 / 36%);
  border-radius: 999px;
  box-shadow: 0 0 12px rgb(46 230 255 / 18%);
}

.screen-header__title {
  text-align: center;
}

.screen-header__title h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #f5fbff;
  text-shadow: 0 0 18px rgb(46 230 255 / 28%), 0 0 34px rgb(120 240 192 / 14%);
}

.screen-header__title p {
  margin: 4px 0 0;
  color: #83b0c8;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.screen-header__clock {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  color: #2ee6ff;
  font-size: 13px;
  font-weight: 700;
}

.screen-header__dot {
  width: 10px;
  height: 10px;
  background: #47d16c;
  border-radius: 50%;
  box-shadow: 0 0 12px #47d16c;
}

.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 280px;
  gap: 10px;
  padding: 12px 14px 14px;
  background: linear-gradient(120deg, rgb(10 31 50 / 94%), rgb(7 18 34 / 94%));
  border: 1px solid rgb(46 230 255 / 28%);
  border-radius: 14px;
  box-shadow:
    inset 0 0 32px rgb(46 230 255 / 8%),
    0 0 24px rgb(46 230 255 / 12%);
}

.hero-panel__content h2 {
  margin: 6px 0 6px;
  color: #f7fcff;
  font-size: 18px;
  line-height: 1.3;
}

.hero-panel__content p {
  margin: 0;
  color: #a4bfcc;
  font-size: 12px;
  line-height: 1.6;
}

.hero-panel__eyebrow {
  display: inline-flex;
  width: fit-content;
  padding: 4px 8px;
  color: #7ae7ff;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: rgb(46 230 255 / 12%);
  border: 1px solid rgb(46 230 255 / 20%);
  border-radius: 999px;
}

.hero-panel__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.hero-pill {
  padding: 6px 10px;
  color: #dff8ff;
  font-size: 11px;
  border-radius: 999px;
}

.hero-pill--good {
  background: rgb(71 209 108 / 16%);
  border: 1px solid rgb(71 209 108 / 26%);
}

.hero-pill--accent {
  background: rgb(46 230 255 / 16%);
  border: 1px solid rgb(46 230 255 / 24%);
}

.hero-pill--warm {
  background: rgb(244 201 107 / 16%);
  border: 1px solid rgb(244 201 107 / 24%);
}

.hero-panel__stats {
  display: grid;
  gap: 10px;
  align-content: start;
}

.hero-stat {
  padding: 12px 14px;
  background: linear-gradient(145deg, rgb(7 22 38 / 84%), rgb(4 14 28 / 90%));
  border: 1px solid rgb(46 230 255 / 20%);
  border-radius: 10px;
  box-shadow: inset 0 0 18px rgb(46 230 255 / 10%);
}

.hero-stat span {
  display: block;
  margin-bottom: 4px;
  color: #84abc1;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-stat strong {
  color: #f7fcff;
  font-size: 18px;
}

.dashboard-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  color: #7edbff;
  font-size: 16px;
  letter-spacing: 0.02em;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.25fr) minmax(0, 0.95fr);
  gap: 8px;
  min-height: 0;
  align-items: start;
}

.dashboard-grid__column {
  display: grid;
  gap: 12px;
  min-height: 0;
  align-content: start;
}

.dashboard-grid__column--center {
  gap: 12px;
}

.dashboard-grid__column--left,
.dashboard-grid__column--right {
  gap: 12px;
}

.panel-card {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  gap: 10px;
}

.panel-card--stacked {
  justify-content: space-between;
}

.panel-card__summary {
  flex-shrink: 0;
}

.panel-card__summary p {
  margin: 0;
  color: #8fb0c2;
  font-size: 12px;
  line-height: 1.7;
}

.panel-card__chart {
  flex: 1 1 auto;
  min-height: 170px;
  min-width: 0;
  height: 170px;
}

.panel-card__chart--map {
  min-height: 250px;
  height: 250px;
}

.dashboard-grid__split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.dashboard-grid__column--right .base-panel,
.dashboard-grid__column--left .base-panel,
.dashboard-grid__column--center .base-panel {
  min-height: 220px;
}

.activity-list {
  display: grid;
  gap: 8px;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
}

.activity-list__item {
  display: grid;
  gap: 3px;
  padding: 10px 10px 10px 12px;
  background: rgb(4 14 28 / 62%);
  border: 1px solid rgb(92 170 210 / 14%);
  border-left: 3px solid rgb(46 230 255 / 50%);
  border-radius: 8px;
}

.activity-list__item time {
  color: #7cb9d9;
  font-size: 11px;
  letter-spacing: 0.08em;
}

.activity-list__item strong {
  color: #f3fbff;
  font-size: 13px;
}

.activity-list__item span {
  color: #8fb0c2;
  font-size: 12px;
}

.activity-list__item--warning {
  border-left-color: rgb(244 201 107 / 82%);
}

.activity-list__item--success {
  border-left-color: rgb(71 209 108 / 82%);
}

@media (max-width: 1500px) {
  .big-screen-layout__canvas {
    overflow: auto;
  }

  .screen-header {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .screen-header__clock {
    justify-content: center;
  }

  .hero-panel {
    grid-template-columns: 1fr;
  }

  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }

  .dashboard-grid__split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 980px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}


.activity-list__item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 8px;
  align-items: center;
  min-height: 54px;
  padding: 10px 12px;
  color: #d6edf7;
  background: rgb(10 28 46 / 76%);
  border-left: 3px solid #2ee6ff;
  border-radius: 8px;
}

.activity-list__item--success {
  border-left-color: #47d16c;
}

.activity-list__item--warning {
  border-left-color: #f9d85e;
}

.activity-list__item time {
  color: #7edbff;
  font-size: 12px;
  font-weight: 700;
}

.activity-list__item strong {
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activity-list__item span {
  color: #8db0c3;
  font-size: 12px;
  text-transform: uppercase;
}
</style>