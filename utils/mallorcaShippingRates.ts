export interface ShippingRate {
  postalCode: string; // 5-dígitos
  distanceKm: number; // aprox. desde 07560
  shipping: number; // € IVA incl.
}

export const mallorcaShippingRates: ShippingRate[] = [
  // Zona A (0-10 km)
  { postalCode: "07560", distanceKm: 0, shipping: 3 }, // Cala Millor (Son Servera)
  { postalCode: "07550", distanceKm: 2, shipping: 5 }, // Son Servera
  { postalCode: "07559", distanceKm: 2, shipping: 7 }, // Cala Bona - Costa de los pinos
  { postalCode: "07687", distanceKm: 2, shipping: 8 }, // Cala Morlanda
  { postalCode: "07530", distanceKm: 9, shipping: 10 }, // Sant Llorenç des Cardassar
  { postalCode: "07540", distanceKm: 9, shipping: 9 }, // son carrio
  { postalCode: "07680", distanceKm: 13, shipping: 12 }, // Porto cristo
  { postalCode: "07580", distanceKm: 13, shipping: 18 }, // Capdepera
  { postalCode: "07570", distanceKm: 14, shipping: 19 }, // Artà
  { postalCode: "07560", distanceKm: 14, shipping: 19 }, // Cala Ratjada
  { postalCode: "07589", distanceKm: 14, shipping: 11 }, // canyamel

  // Zona B (10-20 km)
  { postalCode: "07500", distanceKm: 19, shipping: 20 }, // Manacor
  { postalCode: "07520", distanceKm: 22, shipping: 25 }, // Petra
  { postalCode: "07529", distanceKm: 24, shipping: 43 }, // Ariany
  { postalCode: "07519", distanceKm: 27, shipping: 43 }, // Maria de la Salut
  { postalCode: "07200", distanceKm: 32, shipping: 43 }, // Felanitx

  // Zona C (20-30 km)
  { postalCode: "07450", distanceKm: 34, shipping: 43 }, // Santa Margalida
  { postalCode: "07510", distanceKm: 30, shipping: 43 }, // Sineu
  { postalCode: "07360", distanceKm: 42, shipping: 47 }, // Lloseta

  // Zona D (30-45 km)
  { postalCode: "07300", distanceKm: 48, shipping: 43 }, // Inca
  { postalCode: "07420", distanceKm: 46, shipping: 43 }, // Sa Pobla
  { postalCode: "07440", distanceKm: 48, shipping: 43 }, // Muro
  { postalCode: "07400", distanceKm: 52, shipping: 43 }, // Alcúdia
  { postalCode: "07460", distanceKm: 60, shipping: 43 }, // Pollença

  // Zona E (45-60 km)
  { postalCode: "07320", distanceKm: 55, shipping: 49 }, // Santa Maria del Camí
  { postalCode: "07620", distanceKm: 45, shipping: 49 }, // Llucmajor
  { postalCode: "07230", distanceKm: 46, shipping: 49 }, // Montuïri
  { postalCode: "07240", distanceKm: 43, shipping: 49 }, // Sant Joan
  { postalCode: "07310", distanceKm: 37, shipping: 49 }, // Campanet

  // --- Zona Sur / Sud-este ---
{ postalCode: '07660', distanceKm: 36, shipping: 39 }, // Cala d’Or
{ postalCode: '07689', distanceKm: 25, shipping: 28 }, // Calas de Mallorca
{ postalCode: '07688', distanceKm: 27, shipping: 30 }, // Cala Murada
{ postalCode: '07691', distanceKm: 39, shipping: 42 }, // Portopetro
{ postalCode: '07659', distanceKm: 46, shipping: 49 }, // Cala Figuera / Cala Santanyí

  // Zona F (> 30 km, ya fuera de tu tabla original)
  { postalCode: "07001", distanceKm: 70, shipping: 73 }, // Palma de Mallorca (centro)
  { postalCode: "07184", distanceKm: 89, shipping: 92 }, // Calvià
  { postalCode: "07150", distanceKm: 98, shipping: 101 }, // Andratx
  { postalCode: "07160", distanceKm: 92, shipping: 95 }, // Peguera
  { postalCode: "07100", distanceKm: 81, shipping: 84 }, // Sóller
  { postalCode: "07110", distanceKm: 76, shipping: 79 }, // Bunyola
  { postalCode: "07170", distanceKm: 84, shipping: 87 }, // Valldemossa
  { postalCode: "07179", distanceKm: 91, shipping: 94 }, // Deià
  { postalCode: "07190", distanceKm: 81, shipping: 84 }, // Esporles
  { postalCode: "07141", distanceKm: 71, shipping: 74 }, // Marratxí (Pont d’Inca, Pòrtol…)
  { postalCode: "07350", distanceKm: 60, shipping: 63 }, // Binissalem
  { postalCode: "07330", distanceKm: 59, shipping: 62 }, // Consell
  { postalCode: "07260", distanceKm: 38, shipping: 41 }, // Porreres
  { postalCode: "07630", distanceKm: 45, shipping: 48 }, // Campos
  { postalCode: "07639", distanceKm: 58, shipping: 61 }, // Sa Ràpita
  { postalCode: "07640", distanceKm: 49, shipping: 52 }, // Ses Salines / Colònia St Jordi
  { postalCode: "07650", distanceKm: 42, shipping: 45 }, // Santanyí
  { postalCode: "07458", distanceKm: 34, shipping: 37 }, // Can Picafort / Platja de Muro
  { postalCode: "07470", distanceKm: 52, shipping: 55 }, // Port de Pollença

  // Zona F (60-75 km – Palma y alrededores)
  // Todos los barrios 07001-07015 a excepción de los industriales 07198, 07199
  ...Array.from({ length: 15 }, (_, i) => {
    const cp = (i + 1).toString().padStart(2, "0"); // '01'...'15'
    return {
      postalCode: `070${cp}`,
      distanceKm: 70 + (i >= 10 ? 5 : 0), // barrios oeste un poco más lejos
      shipping: i >= 10 ? 70 : 69, // 07198-07199 igual a 15 €
    };
  }),

  // Zona G (75-90 km)
  { postalCode: "07181", distanceKm: 82, shipping: 75 }, // Calvià (Magaluf / Palmanova)
  { postalCode: "07150", distanceKm: 95, shipping: 75 }, // Andratx
  { postalCode: "07100", distanceKm: 75, shipping: 75 }, // Sóller

  // ...añade aquí cualquier CP extra que necesites, siguiendo la misma lógica
];

/**
 * Obtiene el coste de envío según el código postal.
 * @param code Código postal (5 dígitos)
 * @returns Coste de envío en euros o null si el código postal no está en la lista
 */
export function getShippingByPostal(code: string): number | null {
  const rate = mallorcaShippingRates.find((r) => r.postalCode === code);
  return rate ? rate.shipping : null; // null => fuera de zona
}
