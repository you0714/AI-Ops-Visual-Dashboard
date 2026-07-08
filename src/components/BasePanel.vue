<template>
  <section class="base-panel">
    <div
      v-if="title || tag"
      class="base-panel__header"
    >
      <h2>{{ title }}</h2>
      <span
        v-if="tag"
        class="base-panel__tag"
      >{{ tag }}</span>
    </div>
    <div class="base-panel__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tag?: string
}>()
</script>

<style scoped>
.base-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: linear-gradient(145deg, rgb(10 30 46 / 96%), rgb(4 14 28 / 96%));
  border: 1px solid rgb(46 230 255 / 24%);
  border-radius: 12px;
  box-shadow:
    inset 0 0 28px rgb(46 230 255 / 6%),
    0 0 18px rgb(46 230 255 / 10%);
  backdrop-filter: blur(8px);
}

.base-panel::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  border: 1px solid rgb(120 240 192 / 12%);
  border-radius: inherit;
}

.base-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: linear-gradient(90deg, rgb(46 230 255 / 10%), transparent);
  border-bottom: 1px solid rgb(46 230 255 / 18%);
}

.base-panel__header h2 {
  margin: 0;
  color: #dff7ff;
  font-size: 15px;
}

.base-panel__tag {
  padding: 3px 8px;
  color: #ffd96b;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(90deg, rgb(249 216 94 / 18%), rgb(46 230 255 / 12%));
  border: 1px solid rgb(249 216 94 / 24%);
  border-radius: 999px;
  box-shadow: 0 0 10px rgb(249 216 94 / 10%);
}

.base-panel__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  padding: 6px 8px 8px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>