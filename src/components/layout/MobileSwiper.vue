<script setup lang="ts">
import { ref, watch, nextTick, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import AboutMe from "@/components/sections/AboutMe.vue";
import Experience from "@/components/sections/Experience.vue";
import Education from "@/components/sections/Education.vue";
import Skills from "@/components/sections/Skills.vue";
import Projects from "@/components/sections/Projects.vue";

const route = useRoute();
const router = useRouter();

const slideOrder = [
  "/about",
  "/experience",
  "/education",
  "/skills",
  "/projects",
];

const initialSlide = computed(() => {
  const idx = slideOrder.indexOf(route.path);
  return idx >= 0 ? idx : 0;
});

const swiperRef = ref<SwiperType | null>(null);
const isUpdatingFromRouter = ref(false);

function onSwiperInit(swiper: SwiperType) {
  swiperRef.value = swiper;
}

function onSlideChange(swiper: SwiperType) {
  if (isUpdatingFromRouter.value) return;
  const path = slideOrder[swiper.activeIndex];
  if (path && path !== route.path) {
    router.push(path);
  }
}

watch(
  () => route.path,
  (path) => {
    const index = slideOrder.indexOf(path);
    if (
      index >= 0 &&
      swiperRef.value &&
      swiperRef.value.activeIndex !== index
    ) {
      isUpdatingFromRouter.value = true;
      swiperRef.value.slideTo(index);
      nextTick(() => {
        isUpdatingFromRouter.value = false;
      });
    }
  }
);
</script>

<template>
  <div class="h-[calc(100dvh-3.5rem)]">
    <Swiper
      :modules="[Pagination]"
      :initial-slide="initialSlide"
      :pagination="{ type: 'bullets', clickable: true }"
      @slide-change="onSlideChange"
      @swiper="onSwiperInit"
      class="h-full"
    >
      <SwiperSlide class="overflow-y-auto">
        <AboutMe />
      </SwiperSlide>
      <SwiperSlide class="overflow-y-auto">
        <Experience />
      </SwiperSlide>
      <SwiperSlide class="overflow-y-auto">
        <Education />
      </SwiperSlide>
      <SwiperSlide class="overflow-y-auto">
        <Skills />
      </SwiperSlide>
      <SwiperSlide class="overflow-y-auto">
        <Projects />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:deep(.swiper-pagination-bullet-active) {
  background-color: #409eff;
}
:deep(.swiper-pagination) {
  bottom: 8px;
}
</style>
