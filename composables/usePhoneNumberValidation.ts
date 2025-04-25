import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

export function usePhoneNumberValidation() {
  const isValidPhone = (phone: string, countryCode: CountryCode): boolean => {
    const number = parsePhoneNumberFromString(phone, countryCode);
    return number?.isValid() ?? false;
  };

  return { isValidPhone };
}
