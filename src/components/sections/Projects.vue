<script setup lang="ts">
import { useResume } from "@/composables/useResume";
import { Link, Promotion } from "@element-plus/icons-vue";

const { projects } = useResume();
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">项目作品</h2>

    <div v-if="projects.length === 0" class="text-center text-gray-400 py-12">
      暂无项目
    </div>

    <div v-else class="grid md:grid-cols-2 gap-6">
      <el-card
        v-for="project in projects"
        :key="project.name"
        shadow="hover"
        :body-style="{ padding: '0' }"
      >
        <div
          v-if="project.image"
          class="h-48 bg-gray-100 overflow-hidden"
        >
          <img
            :src="project.image"
            :alt="project.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          v-else
          class="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
        >
          <el-icon :size="48" color="#a0aec0"><Promotion /></el-icon>
        </div>

        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ project.name }}
          </h3>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-1.5 mt-3">
            <el-tag
              v-for="tech in project.techStack"
              :key="tech"
              size="small"
            >
              {{ tech }}
            </el-tag>
          </div>

          <div class="flex gap-4 mt-4">
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              class="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
            >
              <el-icon :size="14"><Link /></el-icon>
              在线预览
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <el-icon :size="14"><Link /></el-icon>
              源代码
            </a>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
