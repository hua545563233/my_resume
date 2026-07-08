<script setup lang="ts">
import { computed } from "vue";
import { useResume } from "@/composables/useResume";
import { TrophyBase } from "@element-plus/icons-vue";

const { experience } = useResume();

const sortedExperience = computed(() => {
  return [...experience].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return b.startDate.localeCompare(a.startDate);
  });
});
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">工作经历</h2>

    <el-timeline>
      <el-timeline-item
        v-for="item in sortedExperience"
        :key="item.company + item.startDate"
        :timestamp="
          item.startDate + ' — ' + (item.current ? '至今' : item.endDate)
        "
        placement="top"
      >
        <div
          class="p-4 rounded-lg"
          :class="item.current ? 'bg-blue-50 border border-blue-200' : ''"
        >
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ item.company }}
            </h3>
            <el-tag v-if="item.current" type="primary" size="small">
              <el-icon :size="14" class="mr-1"><TrophyBase /></el-icon>
              当前在职
            </el-tag>
          </div>
          <p class="text-gray-600 mt-1">{{ item.role }}</p>
          <ul class="mt-3 space-y-1">
            <li
              v-for="desc in item.description"
              :key="desc"
              class="text-sm text-gray-600 pl-4 relative before:content-['•'] before:absolute before:left-0"
            >
              {{ desc }}
            </li>
          </ul>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
