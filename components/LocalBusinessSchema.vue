<template>
  <!-- Componente para Schema.org LocalBusiness -->
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Floristería Flower Power",
        "description": "Floristería en Cala Millor desde 1995. Especialistas en ramos de flores, plantas, centros de mesa y decoración floral. Entrega a domicilio en toda Mallorca.",
        "image": "https://flowerpower.com/images/floristeria-flower-power-logo.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Calle Fetget, 3",
          "addressLocality": "Cala Millor",
          "addressRegion": "Illes Balears",
          "postalCode": "07560",
          "addressCountry": "ES"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 39.603386,
          "longitude": 3.381246
        },
        "telephone": "+34 971 58 74 97",
        "email": "info@flowerpower.com",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Saturday",
              "Sunday"
            ],
            "opens": "09:00",
            "closes": "14:00"
          }
        ],
        "url": "https://flowerpower.com",
        "sameAs": [
          "https://www.facebook.com/FlowerPower.es",
          "https://www.instagram.com/floristeriaflowerpower",
          "https://www.youtube.com/@flowerpower4999"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Florales",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Ramos de flores",
                "description": "Ramos personalizados para cualquier ocasión"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Plantas y jardinería",
                "description": "Plantas de interior y exterior"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Centros de mesa",
                "description": "Decoración floral para eventos"
              }
            }
          ]
        }
      })
    }
  ]
})
</script>
