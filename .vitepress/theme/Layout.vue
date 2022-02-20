<template>
  <Home v-if="page?.relativePath === 'index.md'" />
  <PageLayout v-else />
</template>

<script setup>
import { useData } from 'vitepress'
const { page, theme } = useData()
</script>

<script>
import Home from './Home.vue'
import PageLayout from './PageLayout.vue'

export default {
  components: { Home, PageLayout },
	computed: {
  },
}
</script>
