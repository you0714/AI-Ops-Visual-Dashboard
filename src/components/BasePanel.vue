<template>
<section class="base-panel">
  <div v-if="title || tag" class="base-panel__header">
    <h2>{{ title }}</h2>
    <span v-if="tag" class="base-panel__tag">{{ tag }}</span>
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

<style scoped></style>