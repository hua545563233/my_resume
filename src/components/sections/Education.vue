<script setup lang="ts">
import { useResume } from "@/composables/useResume";
import { School } from "@element-plus/icons-vue";

const { education } = useResume();
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">教育背景</h2>

    <div class="grid gap-4">
      <div
        v-for="item in education"
        :key="item.school"
        class="flex items-start gap-4 p-5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
      >
        <div
          class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0"
        >
          <el-icon :size="22" color="#409EFF"><School /></el-icon>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            {{ item.school }}
          </h3>
          <p class="text-gray-600">{{ item.major }} · {{ item.degree }}</p>
          <p class="text-sm text-gray-400 mt-1">
            {{ item.startDate }} — {{ item.endDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
