<script setup lang="ts">
import { useResume } from "@/composables/useResume";
import { User, Message, Phone, Link } from "@element-plus/icons-vue";

const { basics } = useResume();

const contacts = [
  { icon: Message, value: basics.email, href: `mailto:${basics.email}` },
  { icon: Phone, value: basics.phone },
  { icon: Link, value: basics.github, href: basics.github },
  { icon: Link, value: basics.linkedin, href: basics.linkedin },
].filter((c) => c.value);
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <el-avatar :size="128" :src="basics.avatar" class="shrink-0">
        <el-icon :size="48"><User /></el-icon>
      </el-avatar>

      <div class="text-center md:text-left">
        <h1 class="text-3xl font-bold text-gray-900">{{ basics.name }}</h1>
        <p class="text-lg text-gray-500 mt-1">{{ basics.title }}</p>

        <div
          class="flex flex-wrap justify-center md:justify-start gap-4 mt-4"
        >
          <a
            v-for="c in contacts"
            :key="c.value"
            :href="c.href"
            :target="c.href ? '_blank' : undefined"
            class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors"
          >
            <el-icon :size="16"><component :is="c.icon" /></el-icon>
            <span>{{ c.value }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">关于我</h2>
      <p class="text-gray-600 leading-relaxed whitespace-pre-line">
        {{ basics.summary }}
      </p>
    </div>
  </div>
</template>
