import { computed, ref } from 'vue';
import type { Product } from '~/types/types';

// Tipos para los filtros
export type FilterTypes = 'search' | 'flowers' | 'moments' | 'occasions' | 'colors' | 'tags';

// Mapeo bidireccional para traducción de filtros
// Esto permite que las URL funcionen correctamente en todos los idiomas
export const filterMappings = {
  // Valores en inglés (clave interna)
  flowers: {
    internal: 'flowers',
    es: 'flores',
    en: 'flowers',
    de: 'blumen'
  },
  moments: {
    internal: 'moments',
    es: 'momentos',
    en: 'moments',
    de: 'momente'
  },
  occasions: {
    internal: 'occasions',
    es: 'ocasiones',
    en: 'occasions',
    de: 'anlässe'
  },
  colors: {
    internal: 'colors',
    es: 'colores',
    en: 'colors',
    de: 'farben'
  }
};

export function useProductFilters() {
  const route = useRoute();
  const router = useRouter();
  
  // Estado global para los filtros
  const activeFilters = computed(() => {
    // Procesar colores como array cuando hay múltiples seleccionados
    let colors = route.query.colors;
    if (typeof colors === 'string') {
      // Si es un solo valor, lo mantenemos como string
      colors = colors;
    } else if (Array.isArray(colors)) {
      // Si es un array, lo dejamos como está
      colors = colors;
    } else {
      // Si no hay valor, es un string vacío
      colors = '';
    }

    return {
      search: route.query.search as string || '',
      flowers: route.query.flowers as string || '',
      moments: route.query.moments as string || '',
      occasions: route.query.occasions as string || '',
      colors, // Puede ser string o string[]
      tags: route.query.tags as string || '',
    };
  });

  // Determina si hay algún filtro activo
  const hasActiveFilters = computed(() => 
    Object.values(activeFilters.value).some(value => value)
  );

  // Aplicar un filtro multilinguie a un array
  const applyMultilingualFilter = (array: string[] | undefined, filterValue: string): boolean => {
    if (!array || array.length === 0 || !filterValue) return true;
    
    // Normalizar el valor del filtro
    const normalizedFilter = normalizeFilterValue(filterValue);
    
    // Comprobar si algún elemento del array coincide con el filtro
    return array.some(item => normalizeFilterValue(item).includes(normalizedFilter));
  };
  
  // Función para aplicar todos los filtros a un array de productos
  const applyFilters = (products: Product[]) => {
    if (!products || products.length === 0) return [];
    if (!hasActiveFilters.value) return products;

    return products.filter(product => {
      // Combinar todos los filtros con AND lógico
      let matchesSearch = true;
      let matchesFlowers = true;
      let matchesMoments = true;
      let matchesOccasions = true;
      let matchesColors = true;
      let matchesTags = true;

      // Filtro de búsqueda
      if (activeFilters.value.search) {
        const searchLower = activeFilters.value.search.toLowerCase();
        matchesSearch = (
          (product.title?.toLowerCase() || '').includes(searchLower) ||
          (product.shortDescription?.toLowerCase() || '').includes(searchLower) ||
          (product.description?.toLowerCase() || '').includes(searchLower) ||
          (product.flowers || []).some(item => (item.toLowerCase() || '').includes(searchLower)) ||
          (product.moments || []).some(item => (item.toLowerCase() || '').includes(searchLower)) ||
          (product.occasions || []).some(item => (item.toLowerCase() || '').includes(searchLower))
        );
      }

      // Aplicar filtros de categorías usando la función común
      if (activeFilters.value.flowers) {
        matchesFlowers = applyMultilingualFilter(product.flowers, activeFilters.value.flowers);
      }

      // Filtro de momentos
      if (activeFilters.value.moments) {
        matchesMoments = applyMultilingualFilter(product.moments, activeFilters.value.moments);
      }

      // Filtro de ocasiones
      if (activeFilters.value.occasions) {
        matchesOccasions = applyMultilingualFilter(product.occasions, activeFilters.value.occasions);
      }

      // Filtro de colores (puede ser múltiple)
      if (activeFilters.value.colors) {
        if (Array.isArray(activeFilters.value.colors)) {
          // Si hay múltiples colores seleccionados, el producto debe tener al menos uno de ellos
          matchesColors = activeFilters.value.colors.some(colorFilter => 
            applyMultilingualFilter(product.colors, colorFilter as string)
          );
        } else {
          // Un solo color seleccionado
          matchesColors = applyMultilingualFilter(product.colors, activeFilters.value.colors as string);
        }
      }

      // Filtro de tags (general)
      if (activeFilters.value.tags) {
        const filterValue = activeFilters.value.tags.toLowerCase();
        // Buscar en todas las categorías posibles
        matchesTags = (
          (product.flowers || []).some(item => normalizeFilterValue(item).includes(normalizeFilterValue(filterValue))) ||
          (product.moments || []).some(item => normalizeFilterValue(item).includes(normalizeFilterValue(filterValue))) ||
          (product.occasions || []).some(item => normalizeFilterValue(item).includes(normalizeFilterValue(filterValue)))
        );
      }

      // Combinar todos los filtros (AND lógico)
      return matchesSearch && matchesFlowers && matchesMoments && 
             matchesOccasions && matchesColors && matchesTags;
    });
  };

  // Mapeo de valores externos a valores internos
  const mapExternalToInternal = (key: string, value: string): { key: string, value: string } => {
    // Normalizar la clave y el valor
    const normalizedKey = key.toLowerCase();
    const normalizedValue = normalizeFilterValue(value);
    
    // Verificar si la clave existe en el mapeo
    let internalKey = normalizedKey;
    
    // Mapear claves de idioma a claves internas
    Object.keys(filterMappings).forEach(internal => {
      const mappings = filterMappings[internal as keyof typeof filterMappings];
      
      // Si la clave normalizada coincide con alguna de las traducciones, usar la clave interna
      if (Object.values(mappings).some(translation => normalizedKey === translation.toLowerCase())) {
        internalKey = internal;
      }
    });
    
    // Normalizar el valor para la comparación
    return { key: internalKey, value: normalizedValue };
  };
  
  // Normaliza un valor para comparación en filtros
  const normalizeFilterValue = (value: string): string => {
    if (!value) return '';
    return value.toLowerCase().replace(/\s+/g, '');
  };

  // Aplicar un filtro
  const applyFilter = (filterType: string, value: string) => {
    const query = { ...route.query };
    
    // Mapear el filterType y value si es necesario para soporte multilinguïe
    const { key, value: mappedValue } = mapExternalToInternal(filterType, value);
    
    // Caso especial para colores que pueden ser múltiples
    if (key === 'colors') {
      // Si el valor está vacío, eliminar el filtro
      if (!mappedValue) {
        delete query[key];
      } else {
        const currentColors = query[key];
        
        // Convertir el valor actual a un formato utilizable
        let currentColorsArray: string[] = [];
        
        if (Array.isArray(currentColors)) {
          // Si ya es un array, lo usamos directamente
          currentColorsArray = currentColors as string[];
        } else if (currentColors) {
          // Si es un solo valor (string), lo convertimos a array
          currentColorsArray = [currentColors as string];
        }
        
        // Verificar si el color ya está seleccionado
        const colorIndex = currentColorsArray.indexOf(value);
        
        if (colorIndex >= 0) {
          // Si ya está seleccionado, lo quitamos (toggle)
          currentColorsArray.splice(colorIndex, 1);
          
          // Si queda algún color, actualizamos la query
          if (currentColorsArray.length > 0) {
            // Si solo queda un color, lo guardamos como string simple
            if (currentColorsArray.length === 1) {
              query[key] = currentColorsArray[0];
            } else {
              // Si hay múltiples colores, guardamos el array
              query[key] = currentColorsArray;
            }
          } else {
            // Si no queda ninguno, eliminamos el filtro
            delete query[key];
          }
        } else {
          // Si no está seleccionado, lo añadimos
          currentColorsArray.push(value);
          
          // Si solo hay un color, lo guardamos como string simple
          if (currentColorsArray.length === 1) {
            query[key] = value;
          } else {
            // Si hay múltiples colores, guardamos el array
            query[key] = currentColorsArray;
          }
        }
      }
    } 
    // Para el resto de filtros, comportamiento normal
    else {
      // Si el valor está vacío, eliminar el filtro
      if (!mappedValue) {
        delete query[key];
      } else {
        // Usar el valor original para mantener la legibilidad en la URL
        query[key] = value;
      }
    }
    
    router.push({
      path: route.path,
      query
    });
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    router.push({
      path: route.path
    });
  };

  // Limpiar un filtro específico
  const clearFilter = (filterType: string) => {
    const query = { ...route.query };
    delete query[filterType];
    
    router.push({
      path: route.path,
      query
    });
  };

  return {
    activeFilters,
    hasActiveFilters,
    applyFilters,
    applyFilter,
    clearFilter,
    clearAllFilters,
    normalizeFilterValue,
    mapExternalToInternal
  };
}
