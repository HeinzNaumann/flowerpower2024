import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

const PRIORITY_COUNTRIES: CountryCode[] = ["ES", "DE", "GB"];

export function getPhoneCountries(): {
  value: CountryCode;
  label: string;
  prefix: string;
  flag: string;
}[] {
  const all = getCountries();

  const sorted = [
    ...PRIORITY_COUNTRIES,
    ...all.filter((code) => !PRIORITY_COUNTRIES.includes(code)),
  ];

  return sorted.map((code) => {
    const prefix = "+" + getCountryCallingCode(code);
    const flag = getFlagEmoji(code);
    return {
      value: code,
      label: `${prefix}`,
      prefix,
      flag,
    };
  });
}

function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
