import { ref, onMounted, onUnmounted } from "vue";

export function useCustomBreakpoints() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  const updateBreakpoints = () => {
    isMobile.value = window.matchMedia("(max-width: 640px)").matches;
    isTablet.value = window.matchMedia(
      "(min-width: 641px) and (max-width: 1024px)"
    ).matches;
    isDesktop.value = window.matchMedia("(min-width: 1025px)").matches;
  };

  onMounted(() => {
    updateBreakpoints();
    window.addEventListener("resize", updateBreakpoints);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateBreakpoints);
  });

  return { isMobile, isTablet, isDesktop };
}
