import { defineStore } from 'pinia';
import type { Product } from '~/types/types';

// Tiempo de caché en milisegundos (1 hora)
const CACHE_DURATION = 60 * 60 * 1000;

interface ProductCache {
  data: Product[];
  timestamp: number;
  key: string;
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    cache: {} as Record<string, ProductCache>,
  }),
  
  actions: {
    /**
     * Guarda productos en caché con una clave única
     */
    cacheProducts(key: string, products: Product[]) {
      this.cache[key] = {
        data: products,
        timestamp: Date.now(),
        key,
      };
    },
    
    /**
     * Obtiene productos de la caché si están disponibles y no han expirado
     */
    getCachedProducts(key: string): Product[] | null {
      const cached = this.cache[key];
      
      // Si no hay caché o ha expirado, retornar null
      if (!cached || Date.now() - cached.timestamp > CACHE_DURATION) {
        return null;
      }
      
      return cached.data;
    },
    
    /**
     * Verifica si la caché para una clave específica ha expirado
     */
    isCacheExpired(key: string): boolean {
      const cached = this.cache[key];
      if (!cached) return true;
      
      return Date.now() - cached.timestamp > CACHE_DURATION;
    },
    
    /**
     * Limpia toda la caché o una entrada específica
     */
    clearCache(key?: string) {
      if (key) {
        delete this.cache[key];
      } else {
        this.cache = {};
      }
    }
  },
  
  // Persistir la caché entre recargas de página
  persist: true,
});
