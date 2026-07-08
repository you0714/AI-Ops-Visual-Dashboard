<template>
  <article
    class="metric-card"
    data-testid="metric-card"
  >
    <div class="metric-card__label">
      {{ metric.label }}
    </div>
    <div class="metric-card__value">
      {{ formatMetricValue(metric.value, metric.unit) }}
    </div>
    <div
      class="metric-card__trend"
      :class="`metric-card__trend--${metric.status}`"
    >
      <span>{{ trendSymbol }}</span>
      <strong>{{ formatPercent(metric.trend) }}</strong>
      <em>较昨日</em>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { SummaryMetric } from '@/types/dashboard'
import { formatMetricValue, formatPercent } from '@/utils/format'

const props = defineProps<{
  metric: SummaryMetric
}>()

const trendSymbol = computed(() => {
  if (props.metric.status === 'down') {
    return '↓'
  }
  if (props.metric.status === 'stable') {
    return '→'
  }
  return '↑'
})
</script>

<style scoped>
.metric-card {
  padding: 14px 16px;
  background: linear-gradient(135deg, rgb(8 24 40 / 92%), rgb(6 16 32 / 94%));
  border: 1px solid rgb(92 170 210 / 18%);
  border-left: 3px solid #2ee6ff;
  border-radius: 10px;
  box-shadow: inset 0 0 24px rgb(46 230 255 / 4%);
  backdrop-filter: blur(10px);
}

.metric-card__label {
  color: #90aabd;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.metric-card__value {
  margin: 8px 0 6px;
  color: #f4fbff;
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
  text-shadow: 0 0 12px rgb(46 230 255 / 24%);
}

.metric-card__trend {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 12px;
}

.metric-card__trend--up strong { color: #47d16c; }
.metric-card__trend--down strong { color: #ff7a90; }
.metric-card__trend--stable strong { color: #ffd96b; }

.metric-card__trend em {
  color: #7ea4b8;
  font-style: normal;
}
</style>