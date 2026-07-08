<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

const route = useRoute();

watch(
  () => route.path,
  (path) => {
    document.title = getPageTitle(path);
  },
  { immediate: true }
);

function getPageTitle(path: string): string {
  const titles: Record<string, string> = {
    "/about": "关于我 - 个人简历",
    "/experience": "工作经历 - 个人简历",
    "/education": "教育背景 - 个人简历",
    "/skills": "技能 - 个人简历",
    "/projects": "项目作品 - 个人简历",
  };
  return titles[path] || "个人简历";
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
