import { ref, onMounted, onUnmounted } from "vue";

export function useMediaQuery(query: string) {
  const matches = ref(false);
  let mql: MediaQueryList | null = null;

  function onChange(event: MediaQueryListEvent) {
    matches.value = event.matches;
  }

  onMounted(() => {
    mql = window.matchMedia(query);
    matches.value = mql.matches;
    mql.addEventListener("change", onChange);
  });

  onUnmounted(() => {
    if (mql) {
      mql.removeEventListener("change", onChange);
    }
  });

  return matches;
}
