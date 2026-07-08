<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMediaQuery } from "@/composables/useMediaQuery";

const route = useRoute();
const router = useRouter();
const isDesktop = useMediaQuery("(min-width: 768px)");

const activeIndex = ref("/about");

const menuItems = [
  { path: "/about", label: "关于我" },
  { path: "/experience", label: "工作经历" },
  { path: "/education", label: "教育背景" },
  { path: "/skills", label: "技能" },
  { path: "/projects", label: "项目作品" },
];

const currentLabel = computed(
  () => menuItems.find((m) => m.path === route.path)?.label || ""
);

watch(
  () => route.path,
  (path) => {
    activeIndex.value = path;
  },
  { immediate: true }
);

function handleSelect(path: string) {
  router.push(path);
}
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200"
  >
    <div
      class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between"
    >
      <span class="text-lg font-bold text-gray-800">Resume</span>

      <!-- Desktop nav tabs -->
      <el-menu
        v-if="isDesktop"
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        class="border-none! bg-transparent!"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.path"
          :index="item.path"
        >
          {{ item.label }}
        </el-menu-item>
      </el-menu>

      <!-- Mobile: current section label -->
      <span v-else class="text-sm text-gray-500">{{ currentLabel }}</span>
    </div>
  </header>
</template>
