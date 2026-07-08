<script setup lang="ts">
import { useResume } from "@/composables/useResume";

const { skills } = useResume();
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">技能</h2>

    <div class="space-y-6">
      <div v-for="group in skills" :key="group.category">
        <h3
          class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3"
        >
          {{ group.category }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <el-tag
            v-for="skill in group.items"
            :key="skill"
            size="large"
            class="text-sm!"
          >
            {{ skill }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
