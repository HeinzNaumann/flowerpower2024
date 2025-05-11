// Configuración de transiciones de página para FlowerPower

/**
 * Proporciona clases de transición para las páginas
 * @returns Objeto con clases CSS para transiciones
 */
export function useCustomPageTransition() {
  // Definimos las clases CSS para las transiciones
  const pageTransitionClasses = {
    'enter-active-class': 'transition-opacity duration-300 ease-in-out',
    'enter-from-class': 'opacity-0',
    'enter-to-class': 'opacity-100',
    'leave-active-class': 'transition-opacity duration-200 ease-in-out',
    'leave-from-class': 'opacity-100',
    'leave-to-class': 'opacity-0',
  }
  
  // Retornamos las clases para usarlas en las páginas
  return pageTransitionClasses
}
