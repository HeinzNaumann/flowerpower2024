// ui.config.ts
export default {
  icons: {
    // Configuración para incluir iconos específicos en el bundle
    // Esto evita problemas de carga de iconos en producción
    collections: {
      lucide: [
        'check',
        'x', 
        'chevron-down',
        'chevron-up',
        'eye',
        'eye-off',
        'calendar',
        'clock',
        'user',
        'mail',
        'phone',
        'lock',
        'shopping-cart',
        'heart',
        'star',
        'search',
        'menu',
        'plus',
        'minus'
      ]
    },
    // Configuración para precargar iconos críticos
    preload: [
      'lucide:check',
      'lucide:x',
      'lucide:chevron-down',
      'lucide:eye',
      'lucide:eye-off'
    ]
  }
}
