export interface ShippingRate {
  postalCode: string;   // 5-dígitos
  distanceKm: number;   // aprox. desde 07560
  shipping: number;     // € IVA incl.
}

export const mallorcaShippingRates: ShippingRate[] = [
  // Zona A (0-10 km)
  { postalCode: '07560', distanceKm: 0,  shipping: 4   }, // Cala Millor (Son Servera)
  { postalCode: '07550', distanceKm: 2,  shipping: 4   }, // Son Servera
  { postalCode: '07530', distanceKm: 9,  shipping: 4   }, // Sant Llorenç des Cardassar
  { postalCode: '07580', distanceKm: 13, shipping: 5.5 }, // Capdepera
  { postalCode: '07570', distanceKm: 14, shipping: 5.5 }, // Artà

  // Zona B (10-20 km)
  { postalCode: '07500', distanceKm: 19, shipping: 5.5 }, // Manacor
  { postalCode: '07520', distanceKm: 22, shipping: 8   }, // Petra
  { postalCode: '07529', distanceKm: 24, shipping: 8   }, // Ariany
  { postalCode: '07519', distanceKm: 27, shipping: 8   }, // Maria de la Salut
  { postalCode: '07200', distanceKm: 32, shipping: 10  }, // Felanitx

  // Zona C (20-30 km)
  { postalCode: '07450', distanceKm: 34, shipping: 10  }, // Santa Margalida
  { postalCode: '07510', distanceKm: 30, shipping: 8   }, // Sineu
  { postalCode: '07360', distanceKm: 42, shipping: 10  }, // Lloseta

  // Zona D (30-45 km)
  { postalCode: '07300', distanceKm: 48, shipping: 12.5}, // Inca
  { postalCode: '07420', distanceKm: 46, shipping: 12.5}, // Sa Pobla
  { postalCode: '07440', distanceKm: 48, shipping: 12.5}, // Muro
  { postalCode: '07400', distanceKm: 52, shipping: 12.5}, // Alcúdia
  { postalCode: '07460', distanceKm: 60, shipping: 14  }, // Pollença

  // Zona E (45-60 km)
  { postalCode: '07320', distanceKm: 55, shipping: 12.5}, // Santa Maria del Camí
  { postalCode: '07620', distanceKm: 45, shipping: 12.5}, // Llucmajor
  { postalCode: '07230', distanceKm: 46, shipping: 12.5}, // Montuïri
  { postalCode: '07240', distanceKm: 43, shipping: 10  }, // Sant Joan
  { postalCode: '07310', distanceKm: 37, shipping: 10  }, // Campanet

  // Zona F (60-75 km – Palma y alrededores)
  // Todos los barrios 07001-07015 a excepción de los industriales 07198, 07199
  ...Array.from({ length: 15 }, (_, i) => {
    const cp = (i + 1).toString().padStart(2, '0'); // '01'...'15'
    return {
      postalCode: `070${cp}`,
      distanceKm: 70 + (i >= 10 ? 5 : 0), // barrios oeste un poco más lejos
      shipping: i >= 10 ? 15 : 14        // 07198-07199 igual a 15 €
    };
  }),

  // Zona G (75-90 km)
  { postalCode: '07181', distanceKm: 82, shipping: 16  }, // Calvià (Magaluf / Palmanova)
  { postalCode: '07150', distanceKm: 95, shipping: 17  }, // Andratx
  { postalCode: '07100', distanceKm: 75, shipping: 14  }, // Sóller

  // ...añade aquí cualquier CP extra que necesites, siguiendo la misma lógica
];

/**
 * Obtiene el coste de envío según el código postal.
 * @param code Código postal (5 dígitos)
 * @returns Coste de envío en euros o null si el código postal no está en la lista
 */
export function getShippingByPostal(code: string): number | null {
  const rate = mallorcaShippingRates.find(r => r.postalCode === code);
  return rate ? rate.shipping : null; // null => fuera de zona
}
