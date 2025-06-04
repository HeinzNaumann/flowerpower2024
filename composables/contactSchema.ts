import { z } from 'zod';
import { useI18n } from 'vue-i18n';

/**
 * Composable que devuelve el esquema de validación Zod para el formulario de contacto,
 * usando los mensajes localizados de i18n.
 */
export function useContactSchema() {
  const { t } = useI18n();
  return z.object({
    firstName: z.string().min(1, t('validation.required')),
    lastName: z.string().min(1, t('validation.required')),
    email: z.string().min(1, t('validation.required')).email(t('validation.email')),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/.test(val),
        { message: t('validation.phone') }
      ),
    subject: z.string().min(1, t('validation.required')),
    message: z.string().min(10, t('validation.minLength', { min: 10 })),
    privacy: z.literal(true, { errorMap: () => ({ message: t('validation.required') }) })
  });
}
