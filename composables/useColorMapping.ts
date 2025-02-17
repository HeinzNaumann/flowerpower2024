import { computed } from "vue";
import { useI18n } from "vue-i18n";

const colorMapping: Record<string, Record<string, string>> = {
  es: {
    rojo: "bg-red-500",
    rosa: "bg-pink-500",
    blanco: "bg-white border border-gray-300",
    amarillo: "bg-yellow-500",
    naranja: "bg-orange-500",
    azul: "bg-blue-500",
    negro: "bg-black",
    violeta: "bg-purple-500",
    verde: "bg-green-500",
    gris: "bg-gray-500",
  },
  en: {
    red: "bg-red-500",
    pink: "bg-pink-500",
    white: "bg-white border border-gray-300",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    black: "bg-black",
    purple: "bg-purple-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
  },
  de: {
    rot: "bg-red-500",
    rosa: "bg-pink-500",
    weiß: "bg-white border border-gray-300",
    gelb: "bg-yellow-500",
    orange: "bg-orange-500",
    blau: "bg-blue-500",
    schwarz: "bg-black",
    violett: "bg-purple-500",
    grün: "bg-green-500",
    grau: "bg-gray-500",
  },
};

export function useColorMapping(colors: string[]) {
  const { locale } = useI18n();

  console.log("colors", colors);

  const mappedColors = computed(() => {
    const currentLang = locale.value || "es";
    const mapping = colorMapping[currentLang] || {};
    const classMap = new Map<string, string>();

    colors.forEach((color) => {
      const normalizedColor = color.toLowerCase();
      const className = mapping[normalizedColor] || "bg-gray-300";
      if (className !== "bg-gray-300" && !classMap.has(className)) {
        classMap.set(className, normalizedColor);
      }
    });

    return Array.from(classMap.entries()).map(([className, colorName]) => ({
      name: colorName,
      class: className,
    }));
  });

  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return {
    mappedColors,
    capitalize,
  };
}
