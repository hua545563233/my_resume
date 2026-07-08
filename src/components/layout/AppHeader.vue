<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Menu } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

const activeIndex = ref("/about");
const drawerVisible = ref(false);

const menuItems = [
  { path: "/about", label: "关于我" },
  { path: "/experience", label: "工作经历" },
  { path: "/education", label: "教育背景" },
  { path: "/skills", label: "技能" },
  { path: "/projects", label: "项目作品" },
];

watch(
  () => route.path,
  (path) => {
    activeIndex.value = path;
  },
  { immediate: true }
);

function handleSelect(path: string) {
  router.push(path);
  drawerVisible.value = false;
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

      <!-- Desktop nav -->
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        class="hidden md:flex border-none! bg-transparent!"
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

      <!-- Mobile hamburger -->
      <button class="md:hidden p-2" @click="drawerVisible = true">
        <el-icon :size="22"><Menu /></el-icon>
      </button>
    </div>

    <!-- Mobile drawer -->
    <el-drawer v-model="drawerVisible" direction="ltr" size="70%" title="导航">
      <el-menu
        :default-active="activeIndex"
        class="border-none!"
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
    </el-drawer>
  </header>
</template>
